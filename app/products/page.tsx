'use client'

import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import ProductCard from '../../components/ProductCard'
import CategoryChip from '../../components/CategoryChip'
import { db } from '../../src/lib/firebase'

type ProductItem = {
  id?: string
  name: string
  price: string
  category: string
  imageUrl?: string
  badge?: string
}

type CategoryItem = {
  id?: string
  name: string
}

const defaultCategories = [
  'الكل',
  'المكملات الغذائية',
  'الفيتامينات والمعادن',
  'الأعشاب الطبيعية',
  'المنتجات الرياضية',
  'العناية بالصحة'
]

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([])

  useEffect(() => {
    const firestore = db()
    if (!firestore) {
      return
    }

    const productsQueryRef = query(collection(firestore, 'products'), orderBy('createdAt', 'desc'))
    const categoriesQueryRef = query(collection(firestore, 'categories'), orderBy('createdAt', 'desc'))

    const unsubscribeProducts = onSnapshot(productsQueryRef, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ProductItem) })))
    })

    const unsubscribeCategories = onSnapshot(categoriesQueryRef, (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as CategoryItem) })))
    })

    return () => {
      unsubscribeProducts()
      unsubscribeCategories()
    }
  }, [])

  const displayCategories = ['الكل', ...categories.map((item) => item.name)]

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              الصفحة الرئيسية / المنتجات
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">المنتجات</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              استعرض مجموعة من المنتجات الصحية والعناية بالذات، مع بيانات مباشرة من Firebase عند توفر الإعدادات.
            </p>
          </div>

          <div className="flex w-full max-w-md items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-3">
            <span className="ml-3 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="ابحث عن منتج"
              className="w-full border-none bg-transparent text-right outline-none"
            />
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-3">
          {displayCategories.map((category, index) => (
            <CategoryChip key={category} name={category} active={index === 0} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">المنتجات المتاحة</h2>
          <span className="text-sm text-gray-500">{products.length} عناصر</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id || product.name}
              title={product.name}
              price={product.price}
              category={product.category}
              image={product.imageUrl ? '🧴' : '🛍️'}
              badge={product.badge}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
