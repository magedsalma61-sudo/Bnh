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
  price: string | number
  category: string
  description?: string
  imageUrl?: string
  badge?: string
}

export default function ProductDetailsPage() {
  const params = useParams()

  const [product, setProduct] =
    useState<ProductItem | null>(null)

  const { addToCart } = useCart()

  useEffect(() => {
    const firestore = db()

    if (!firestore || !params?.id) {
      return
    }

    const fetchProduct = async () => {
      try {
        const snapshot = await getDoc(
          doc(
            firestore,
            'products',
            params.id as string
          )
        )

        if (snapshot.exists()) {
          setProduct({
            id: snapshot.id,
            ...(snapshot.data() as ProductItem),
          })
        }
      } catch (error) {
        console.error(
          'حدث خطأ أثناء تحميل المنتج:',
          error
        )
      }
    }

    fetchProduct()
  }, [params?.id])

  if (!product) {
    return (
      <div className="rounded-[24px] border border-gray-200 bg-white p-8 text-center text-gray-600">
        جاري تحميل المنتج...
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* العودة إلى المتجر */}

      <Link
        href="/shop"
        className="text-sm font-semibold text-primary"
      >
        ← العودة إلى المتجر
      </Link>

      {/* تفاصيل المنتج */}

      <section className="grid gap-8 rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">

        {/* صورة المنتج */}

        <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-br from-red-50 to-white">

          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={
                product.name ||
                'صورة المنتج'
              }
              className="h-full min-h-[280px] w-full object-cover"
            />
          ) : (
            <div className="text-6xl">
              🛍️
            </div>
          )}

        </div>

        {/* بيانات المنتج */}

        <div>

          {/* التصنيف */}

          <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {product.badge ||
              'منتج صحي'}
          </div>

          {/* الاسم */}

          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* الفئة */}

          <p className="mt-3 text-sm text-gray-500">
            {product.category}
          </p>

          {/* الوصف */}

          <p className="mt-5 text-lg leading-8 text-gray-700">
            {product.description ||
              'وصف المنتج سيظهر هنا عند إضافة البيانات.'}
          </p>

          {/* السعر */}

          <div className="mt-6 text-2xl font-bold text-gray-900">
            {product.price} جنيه
          </div>

          {/* إضافة للسلة */}

          <button
            type="button"
            onClick={() =>
              addToCart({
                id:
                  product.id ||
                  product.name,

                name: product.name,

                // تحويل السعر إلى رقم
                // لحل مشكلة TypeScript
                price: Number(
                  product.price
                ),

                category:
                  product.category,

                imageUrl:
                  product.imageUrl,

                quantity: 1,
              })
            }
            className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            إضافة إلى السلة
          </button>

        </div>

      </section>

    </div>
  )
}