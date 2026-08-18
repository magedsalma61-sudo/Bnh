'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../src/lib/firebase'

type Service = {
  id: string
  name: string
  description: string
  price: string
  type: string
  active: boolean
}

const defaultServices = [
  {
    name: 'الكشف العادي',
    description: 'حجز موعد للكشف داخل أحد فروع الدكتور.',
    price: '',
    type: 'كشف عادي',
    active: true,
  },
  {
    name: 'الكشف أونلاين',
    description: 'حجز موعد للكشف والمتابعة أونلاين.',
    price: '',
    type: 'كشف أونلاين',
    active: true,
  },
  {
    name: 'الأدوية',
    description: 'المنتجات والأدوية المتاحة للطلب.',
    price: '',
    type: 'أدوية',
    active: true,
  },
]

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const [editingId, setEditingId] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('كشف عادي')
  const [active, setActive] = useState(true)

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const firestore = db()

    if (!firestore) {
      setError('Firebase غير جاهز.')
      setLoading(false)
      return
    }

    const unsubscribe = onSnapshot(
      collection(firestore, 'services'),
      (snapshot) => {
        const data: Service[] = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<Service, 'id'>),
        }))

        setServices(data)
        setLoading(false)
      },
      (firebaseError) => {
        console.error(firebaseError)
        setError('تعذر تحميل الخدمات من Firebase.')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setName('')
    setDescription('')
    setPrice('')
    setType('كشف عادي')
    setActive(true)
    setError('')
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')
    setMessage('')

    if (!name.trim()) {
      setError('من فضلك اكتب اسم الخدمة.')
      return
    }

    const firestore = db()

    if (!firestore) {
      setError('Firebase غير جاهز.')
      return
    }

    try {
      setSaving(true)

      const serviceData = {
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        type,
        active,
      }

      if (editingId) {
        await updateDoc(
          doc(firestore, 'services', editingId),
          serviceData
        )

        setMessage('تم تعديل الخدمة بنجاح ✅')
      } else {
        await addDoc(
          collection(firestore, 'services'),
          serviceData
        )

        setMessage('تمت إضافة الخدمة بنجاح ✅')
      }

      resetForm()
    } catch (firebaseError) {
      console.error(firebaseError)
      setError(
        'حدث خطأ أثناء حفظ الخدمة. تأكدي أنكِ مسجلة دخول كأدمن.'
      )
    } finally {
      setSaving(false)
    }
  }

  const editService = (service: Service) => {
    setEditingId(service.id)
    setName(service.name || '')
    setDescription(service.description || '')
    setPrice(service.price || '')
    setType(service.type || 'كشف عادي')
    setActive(service.active !== false)

    setMessage('')
    setError('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const deleteService = async (id: string) => {
    const firestore = db()

    if (!firestore) {
      setError('Firebase غير جاهز.')
      return
    }

    const service = services.find(
      (item) => item.id === id
    )

    const confirmed = window.confirm(
      `هل أنتِ متأكدة من حذف خدمة "${service?.name || ''}"؟`
    )

    if (!confirmed) return

    try {
      await deleteDoc(
        doc(firestore, 'services', id)
      )

      setMessage('تم حذف الخدمة بنجاح 🗑️')

      if (editingId === id) {
        resetForm()
      }
    } catch (firebaseError) {
      console.error(firebaseError)
      setError('حدث خطأ أثناء حذف الخدمة.')
    }
  }

  const addDefaultServices = async () => {
    const firestore = db()

    if (!firestore) {
      setError('Firebase غير جاهز.')
      return
    }

    try {
      setSaving(true)
      setError('')
      setMessage('')

      for (const service of defaultServices) {
        const alreadyExists = services.some(
          (item) =>
            item.name.trim() === service.name
        )

        if (!alreadyExists) {
          await addDoc(
            collection(firestore, 'services'),
            service
          )
        }
      }

      setMessage(
        'تم التأكد من إضافة الخدمات الأساسية الثلاثة ✅'
      )
    } catch (firebaseError) {
      console.error(firebaseError)
      setError(
        'حدث خطأ أثناء إضافة الخدمات الأساسية.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8F6F8] px-4 py-8 text-gray-900 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-sm font-bold text-[#A62B73]">
            لوحة الإدارة
          </p>

          <h1 className="mt-2 text-3xl font-black text-gray-900">
            إدارة الخدمات
          </h1>

          <p className="mt-2 text-gray-500">
            أضيفي أو عدلي أو احذفي الخدمات التي تظهر للعملاء على الموقع.
          </p>
        </div>

        {/* MESSAGES */}

        {message && (
          <div className="mb-5 rounded-2xl bg-green-50 px-5 py-4 font-bold text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-2xl bg-red-50 px-5 py-4 font-bold text-red-600">
            {error}
          </div>
        )}

        {/* FORM */}

        <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-black">
                {editingId
                  ? 'تعديل الخدمة'
                  : 'إضافة خدمة جديدة'}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                البيانات التي تكتبيها هنا سيتم حفظها في Firebase.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-200"
              >
                إلغاء التعديل
              </button>
            )}

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5"
          >

            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                اسم الخدمة
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="مثال: الكشف العادي"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#A62B73] focus:bg-white focus:ring-2 focus:ring-[#A62B73]/20"
              />
            </div>

            {/* TYPE + PRICE */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  نوع الخدمة
                </label>

                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#A62B73] focus:bg-white"
                >
                  <option value="كشف عادي">
                    كشف عادي
                  </option>

                  <option value="كشف أونلاين">
                    كشف أونلاين
                  </option>

                  <option value="أدوية">
                    أدوية
                  </option>

                  <option value="خدمة أخرى">
                    خدمة أخرى
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  السعر
                </label>

                <input
                  type="text"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="مثال: 500 جنيه"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#A62B73] focus:bg-white focus:ring-2 focus:ring-[#A62B73]/20"
                />
              </div>

            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                وصف الخدمة
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={4}
                placeholder="اكتب وصفًا مختصرًا للخدمة..."
                className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#A62B73] focus:bg-white focus:ring-2 focus:ring-[#A62B73]/20"
              />
            </div>

            {/* ACTIVE */}

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-gray-50 p-4">

              <input
                type="checkbox"
                checked={active}
                onChange={(event) =>
                  setActive(event.target.checked)
                }
                className="h-5 w-5 accent-[#A62B73]"
              />

              <div>
                <div className="font-bold">
                  الخدمة مفعلة
                </div>

                <div className="text-sm text-gray-500">
                  لو أغلقتِ التفعيل لن تظهر الخدمة للعملاء.
                </div>
              </div>

            </label>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-[#A62B73] px-5 py-4 font-black text-white shadow-md transition hover:bg-[#8E235F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? 'جاري الحفظ...'
                : editingId
                  ? 'حفظ تعديل الخدمة'
                  : 'إضافة الخدمة'}
            </button>

          </form>
        </section>

        {/* DEFAULT SERVICES */}

        <section className="mb-8 rounded-3xl border border-[#E8D1DE] bg-[#FFF8FC] p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-black text-[#A62B73]">
                الخدمات الأساسية
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                الكشف العادي — الكشف أونلاين — الأدوية
              </p>
            </div>

            <button
              type="button"
              onClick={addDefaultServices}
              disabled={saving}
              className="rounded-xl bg-[#A62B73] px-5 py-3 text-sm font-black text-white hover:bg-[#8E235F] disabled:opacity-60"
            >
              إضافة الخدمات الثلاثة
            </button>

          </div>

        </section>

        {/* SERVICES LIST */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-black">
                الخدمات الحالية
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                إجمالي الخدمات: {services.length}
              </p>
            </div>

          </div>

          {loading ? (
            <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">
              جاري تحميل الخدمات...
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

              <div className="text-5xl">
                🩺
              </div>

              <h3 className="mt-4 text-xl font-black">
                لا توجد خدمات حتى الآن
              </h3>

              <p className="mt-2 text-gray-500">
                اضغطي على "إضافة الخدمات الثلاثة" لبدء إعداد الخدمات.
              </p>

            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {services.map((service) => (
                <article
                  key={service.id}
                  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E7EF] text-2xl">
                      {service.type === 'أدوية'
                        ? '💊'
                        : service.type === 'كشف أونلاين'
                          ? '💻'
                          : '🩺'}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        service.active !== false
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {service.active !== false
                        ? 'مفعلة'
                        : 'موقوفة'}
                    </span>

                  </div>

                  <h3 className="mt-5 text-xl font-black text-gray-900">
                    {service.name}
                  </h3>

                  <div className="mt-2 text-sm font-bold text-[#A62B73]">
                    {service.type}
                  </div>

                  <p className="mt-3 min-h-[56px] text-sm leading-7 text-gray-500">
                    {service.description ||
                      'لا يوجد وصف للخدمة.'}
                  </p>

                  {service.price && (
                    <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm font-black">
                      السعر: {service.price}
                    </div>
                  )}

                  <div className="mt-5 grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        editService(service)
                      }
                      className="rounded-xl bg-[#F5E7EF] px-4 py-3 text-sm font-black text-[#A62B73] hover:bg-[#ECD5E2]"
                    >
                      ✏️ تعديل
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteService(service.id)
                      }
                      className="rounded-xl bg-red-50 px-4 py-3 text-sm font-black text-red-600 hover:bg-red-100"
                    >
                      🗑️ حذف
                    </button>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  )
}