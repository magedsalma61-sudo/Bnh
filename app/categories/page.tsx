'use client'

import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../src/lib/firebase'

type CategoryItem = {
  id?: string
  name: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([])

  useEffect(() => {
    const firestore = db()
    if (!firestore) return

    const unsubscribe = onSnapshot(query(collection(firestore, 'categories'), orderBy('createdAt', 'desc')), (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as CategoryItem) })))
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900">الفئات</h1>
        <p className="mt-3 text-lg text-gray-600">اكتشف الفئات الصحية المتاحة في المتجر.</p>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{category.name}</div>
            <p className="mt-3 text-sm leading-7 text-gray-600">فئة صحية مختارة ومناسبة لاحتياجاتك اليومية.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
