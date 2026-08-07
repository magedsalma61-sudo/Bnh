'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../src/lib/firebase'
import { useCart } from '../../../components/shop/CartContext'

type ProductItem = {
  id?: string
  name: string
  price: string
  category: string
  description?: string
  imageUrl?: string
  badge?: string
}

export default function ProductDetailsPage() {
  const params = useParams()
  const [product, setProduct] = useState<ProductItem | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const firestore = db()
    if (!firestore || !params?.id) return

    const fetchProduct = async () => {
      const snapshot = await getDoc(doc(firestore, 'products', params.id as string))
      if (snapshot.exists()) {
        setProduct({ id: snapshot.id, ...(snapshot.data() as ProductItem) })
      }
    }

    fetchProduct()
  }, [params?.id])

  if (!product) {
    return <div className="rounded-[24px] border border-gray-200 bg-white p-8 text-center text-gray-600">جاري تحميل المنتج...</div>
  }

  return (
    <div className="space-y-8">
      <Link href="/shop" className="text-sm font-semibold text-primary">← العودة إلى المتجر</Link>
      <section className="grid gap-8 rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
        <div className="flex min-h-[280px] items-center justify-center rounded-[24px] bg-gradient-to-br from-red-50 to-white text-6xl">🛍️</div>
        <div>
          <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{product.badge || 'منتج صحي'}</div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-3 text-sm text-gray-500">{product.category}</p>
          <p className="mt-5 text-lg leading-8 text-gray-700">{product.description || 'وصف المنتج سيظهر هنا عند إضافة البيانات.'}</p>
          <div className="mt-6 text-2xl font-bold text-gray-900">{product.price}</div>
          <button onClick={() => addToCart({ id: product.id || product.name, name: product.name, price: product.price, category: product.category, imageUrl: product.imageUrl, quantity: 1 })} className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-white">إضافة إلى السلة</button>
        </div>
      </section>
    </div>
  )
}
