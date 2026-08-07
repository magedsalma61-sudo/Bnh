'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../components/shop/CartContext'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../src/lib/firebase'

type CheckoutForm = {
  name: string
  phone: string
  address: string
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutForm>({ name: '', phone: '', address: '' })
  const [message, setMessage] = useState('')

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price.replace(/[^0-9]/g, '')) * item.quantity, 0), [cart])

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault()
    const firestore = db()
    if (!firestore) return

    const order = {
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      items: cart,
      total: `${subtotal} جنيه`,
      status: 'New',
      createdAt: new Date().toISOString()
    }

    await addDoc(collection(firestore, 'orders'), order)
    setMessage('تم إنشاء الطلب بنجاح. سيتم عرض الطلب في لوحة الإدارة.')
    clearCart()
    setForm({ name: '', phone: '', address: '' })
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900">السلة</h1>
        <p className="mt-3 text-lg text-gray-600">راجع منتجاتك وأكمل الطلب بسهولة.</p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="rounded-[24px] border border-gray-200 bg-white p-8 text-center text-gray-600">السلة فارغة حاليًا.</div>
          ) : cart.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="mt-1 text-sm text-gray-500">{item.category}</div>
              </div>
              <div className="flex items-center gap-3">
                <input type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} className="w-20 rounded-full border border-gray-300 px-3 py-2 text-center" />
                <span className="font-semibold text-gray-900">{item.price}</span>
                <button onClick={() => removeFromCart(item.id)} className="rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">حذف</button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleCheckout} className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">إتمام الطلب</h2>
          <div className="mt-4 space-y-3">
            <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-full border border-gray-300 px-4 py-3 text-right" placeholder="الاسم بالكامل" />
            <input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="w-full rounded-full border border-gray-300 px-4 py-3 text-right" placeholder="رقم الهاتف" />
            <textarea required value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="w-full rounded-[20px] border border-gray-300 px-4 py-3 text-right" rows={4} placeholder="العنوان" />
          </div>
          <div className="mt-5 rounded-[20px] border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <div className="flex items-center justify-between">الإجمالي: <span className="font-bold text-gray-900">{subtotal} جنيه</span></div>
          </div>
          {message ? <div className="mt-4 rounded-2xl bg-green-50 p-3 text-sm text-green-700">{message}</div> : null}
          <button className="mt-5 w-full rounded-full bg-primary px-5 py-3 font-semibold text-white">إنشاء الطلب</button>
        </form>
      </div>
    </div>
  )
}
