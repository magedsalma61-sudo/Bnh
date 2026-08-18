'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../src/lib/firebase'
import { useCart } from '../../components/shop/CartContext'

type ProductItem = {
  id?: string
  name: string
  price: string | number
  category: string
  description?: string
  imageUrl?: string
  badge?: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { addToCart } = useCart()

  useEffect(() => {
    const firestore = db()

    if (!firestore) {
      setError('تعذر الاتصال بقاعدة البيانات.')
      setLoading(false)
      return
    }

    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(
          collection(firestore, 'products')
        )

        const items = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as ProductItem),
        }))

        setProducts(items)
      } catch (err) {
        console.error(err)
        setError('تعذر تحميل المنتجات من Firebase.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[28px] border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="text-xl font-bold text-gray-800">
              جاري تحميل المنتجات...
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <section className="mb-10 text-center">

          <div className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            متجر دكتور محمد رحيم
          </div>

          <h1 className="text-4xl font-black text-gray-900">
            المنتجات
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            تعرف على المنتجات المتاحة في متجر مراكز دكتور محمد رحيم.
          </p>

        </section>

        {/* ERROR */}

        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-center font-semibold text-red-700">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!error && products.length === 0 && (
          <div className="rounded-[28px] border border-gray-200 bg-white p-10 text-center shadow-sm">

            <div className="text-5xl">
              🛍️
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              لا توجد منتجات حاليًا
            </h2>

            <p className="mt-2 text-gray-500">
              سيتم عرض المنتجات هنا عند إضافتها.
            </p>

          </div>
        )}

        {/* PRODUCTS */}

        {products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (

              <article
                key={product.id || product.name}
                className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* IMAGE */}

                <div className="flex h-64 items-center justify-center bg-gradient-to-br from-red-50 to-white">

                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-7xl">
                      🛍️
                    </div>
                  )}

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  {product.badge && (
                    <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {product.badge}
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-gray-500">
                    {product.category}
                  </p>

                  <p className="mt-4 min-h-[56px] text-sm leading-7 text-gray-600">
                    {product.description ||
                      'وصف المنتج سيظهر هنا عند إضافة البيانات.'}
                  </p>

                  {/* PRICE */}

                  <div className="mt-5 text-2xl font-black text-gray-900">
                    {product.price}
                  </div>

                  {/* BUTTONS */}

                  <div className="mt-5 flex gap-2">

                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      التفاصيل
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: product.id || product.name,
                          name: product.name,
                          price: Number(product.price),
                          category: product.category,
                          imageUrl: product.imageUrl,
                          quantity: 1,
                        })
                      }
                      className="flex-1 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      إضافة إلى السلة
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>
        )}

      </div>
    </main>
  )
}