'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../src/lib/firebase'
import { useCart } from '../../components/shop/CartContext'

type ProductItem = {
  id?: string
  name: string
  price: string
  category: string
  description?: string
  imageUrl?: string
  badge?: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    const firestore = db()
    if (!firestore) return

    const unsubscribe = onSnapshot(query(collection(firestore, 'products'), orderBy('createdAt', 'desc')), (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ProductItem) })))
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">المتجر</div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">تسوق منتجات صحية</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">اكتشف مجموعة من المكملات الغذائية والمنتجات الصحية المختارة بعناية.</p>
          </div>
          <div className="rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">المنتجات المتاحة: {products.length}</div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-red-50 to-white text-5xl">🛍️</div>
            <div className="p-5">
              {product.badge ? <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{product.badge}</div> : null}
              <div className="text-sm text-gray-500">{product.category}</div>
              <h2 className="mt-2 text-lg font-semibold text-gray-900">{product.name}</h2>
              <p className="mt-2 text-sm leading-7 text-gray-600">{product.description || 'منتج صحي عالي الجودة.'}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                <div className="flex gap-2">
                  <Link href={`/products/${product.id}`} className="rounded-full border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700">تفاصيل</Link>
                  <button onClick={() => addToCart({ id: product.id || product.name, name: product.name, price: product.price, category: product.category, imageUrl: product.imageUrl, quantity: 1 })} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">إضافة</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
