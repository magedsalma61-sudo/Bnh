'use client'

import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../src/lib/firebase'

type ProductItem = {
  id?: string
  name: string
  price: string
  category: string
  imageUrl?: string
  badge?: string
  description?: string
}

type CategoryItem = {
  id?: string
  name: string
}

const categories = [
  { name: 'المكملات الغذائية', icon: '🥗' },
  { name: 'الفيتامينات والمعادن', icon: '💊' },
  { name: 'الأعشاب الطبيعية', icon: '🌿' },
  { name: 'المنتجات الرياضية', icon: '🏃' },
  { name: 'العناية بالصحة', icon: '🧴' },
  { name: 'العروض', icon: '🎁' }
]

const benefits = [
  { title: '١٠٠٪ منتجات أصلية', text: 'نحرص على جودة كل منتج قبل عرضه.' },
  { title: 'شحن سريع', text: 'توصيل فعال خلال أسرع وقت ممكن.' },
  { title: 'دفع آمن', text: 'طرق دفع موثوقة ومحمية.' },
  { title: 'دعم فني', text: 'فريق دعم جاهز لمساعدتك عند الحاجة.' }
]

export default function Home() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [categoriesData, setCategoriesData] = useState<CategoryItem[]>([])

  useEffect(() => {
    const firestore = db()
    if (!firestore) {
      return
    }

    const productsQuery = query(collection(firestore, 'products'), orderBy('createdAt', 'desc'))
    const categoriesQueryRef = query(collection(firestore, 'categories'), orderBy('createdAt', 'desc'))

    const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ProductItem) })))
    })

    const unsubscribeCategories = onSnapshot(categoriesQueryRef, (snapshot) => {
      setCategoriesData(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as CategoryItem) })))
    })

    return () => {
      unsubscribeProducts()
      unsubscribeCategories()
    }
  }, [])

  const featuredProducts = products.slice(0, 3)

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-gray-200 bg-gradient-to-br from-white via-[#fff8f8] to-[#fef2f2] shadow-[0_25px_80px_-20px_rgba(214,40,40,0.35)]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-sm font-semibold text-primary">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              متجر موثوق ومجرب
            </div>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              BNH Egypt
            </h2>

            <p className="mt-5 text-xl leading-8 text-gray-700 sm:text-2xl">
              كل ما تحتاجه لصحة أفضل في مكان واحد
            </p>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
              اختَر منتجات عالية الجودة مع تجربة تسوق مريحة وسريعة ومصممة لتناسب عائلتك اليومية.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#" className="rounded-full bg-primary px-6 py-3 text-center font-semibold text-white transition hover:bg-red-700">
                تسوق الآن
              </a>
              <a href="#" className="rounded-full border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:border-primary hover:text-primary">
                اكتشف المزيد
              </a>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-primary to-[#a61a1a] p-8 sm:p-10 lg:p-14">
            <div className="rounded-[24px] border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <div className="rounded-2xl bg-white p-5 shadow-xl">
                <div className="text-sm font-semibold text-primary">أفضل العروض</div>
                <div className="mt-3 text-2xl font-bold text-gray-900">مزيج من الجودة والراحة</div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700">منتجات مختارة بعناية</div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700">تجربة تسوق سهلة ومميزة</div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700">دعم سريع على مدار اليوم</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">الفئات المميزة</h3>
          <a href="#" className="text-sm font-semibold text-primary">عرض الكل</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(categoriesData.length ? categoriesData : categories).map((category) => (
            <div key={category.name} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-3xl">{categories.find((item) => item.name === category.name)?.icon || '🧾'}</div>
              <div className="mt-3 font-semibold text-gray-900">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">المنتجات المميزة</h3>
          <a href="#" className="text-sm font-semibold text-primary">عرض الكل</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id || product.name} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="rounded-xl bg-gray-100 p-8 text-center text-4xl">🛍️</div>
              <div className="mt-4 text-sm font-semibold text-primary">{product.badge || 'مميز'}</div>
              <div className="mt-2 font-semibold text-gray-900">{product.name}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">إضافة</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900">لماذا تختارنا؟</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-right">
              <div className="mb-2 text-lg font-semibold text-gray-900">{benefit.title}</div>
              <p className="text-sm leading-7 text-gray-600">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
