'use client'

import React, { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../src/lib/firebase'

type Service = {
  id: string
  title: string
  description: string
  icon: string
  active: boolean
  order: number
}

const defaultServices: Omit<Service, 'id'>[] = [
  {
    title: 'الكشف العادي',
    description:
      'احجز موعدك للكشف في أحد فروع مراكز د. محمد رحيم.',
    icon: '🩺',
    active: true,
    order: 1,
  },
  {
    title: 'الكشف أونلاين',
    description:
      'احجز استشارتك أونلاين مع د. محمد رحيم من أي مكان.',
    icon: '💻',
    active: true,
    order: 2,
  },
  {
    title: 'الأدوية',
    description:
      'متابعة الأدوية والتعليمات العلاجية المناسبة لحالتك.',
    icon: '💊',
    active: true,
    order: 3,
  },
]

export default function ServicesManager() {
  const [services, setServices] =
    useState<Service[]>([])

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [editingId, setEditingId] =
    useState<string | null>(null)

  const [title, setTitle] =
    useState('')

  const [description, setDescription] =
    useState('')

  const [icon, setIcon] =
    useState('🩺')

  const [active, setActive] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {
    const firestore = db()

    if (!firestore) {
      setError(
        'Firebase غير جاهز. تأكدي من إعدادات المشروع.'
      )
      setLoading(false)
      return
    }

    const unsubscribe = onSnapshot(
      collection(firestore, 'services'),
      async (snapshot) => {
        const data: Service[] =
          snapshot.docs.map((item, index) => {
            const itemData =
              item.data()

            return {
              id: item.id,
              title:
                itemData.title ||
                '',
              description:
                itemData.description ||
                '',
              icon:
                itemData.icon ||
                '🩺',
              active:
                itemData.active !== false,
              order:
                typeof itemData.order ===
                'number'
                  ? itemData.order
                  : index + 1,
            }
          })

        if (
          snapshot.empty
        ) {
          try {
            for (
              const service of defaultServices
            ) {
              await addDoc(
                collection(
                  firestore,
                  'services'
                ),
                service
              )
            }

            return
          } catch (seedError) {
            console.error(
              seedError
            )
            setError(
              'حدث خطأ أثناء إنشاء الخدمات الأساسية.'
            )
          }
        }

        setServices(
          data.sort(
            (a, b) =>
              a.order - b.order
          )
        )

        setLoading(false)
      },
      (snapshotError) => {
        console.error(
          snapshotError
        )

        setError(
          'تعذر تحميل الخدمات من Firebase.'
        )

        setLoading(false)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setDescription('')
    setIcon('🩺')
    setActive(true)
    setError('')
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')

    if (!title.trim()) {
      setError(
        'من فضلك اكتبي اسم الخدمة.'
      )
      return
    }

    if (!description.trim()) {
      setError(
        'من فضلك اكتبي وصف الخدمة.'
      )
      return
    }

    const firestore = db()

    if (!firestore) {
      setError(
        'Firebase غير جاهز.'
      )
      return
    }

    try {
      setSaving(true)

      if (editingId) {
        await updateDoc(
          doc(
            firestore,
            'services',
            editingId
          ),
          {
            title: title.trim(),
            description:
              description.trim(),
            icon: icon.trim() || '🩺',
            active,
          }
        )
      } else {
        const nextOrder =
          services.length > 0
            ? Math.max(
                ...services.map(
                  (service) =>
                    service.order
                )
              ) + 1
            : 1

        await addDoc(
          collection(
            firestore,
            'services'
          ),
          {
            title: title.trim(),
            description:
              description.trim(),
            icon: icon.trim() || '🩺',
            active,
            order: nextOrder,
          }
        )
      }

      resetForm()
    } catch (saveError) {
      console.error(
        saveError
      )

      setError(
        'حدث خطأ أثناء حفظ الخدمة.'
      )
    } finally {
      setSaving(false)
    }
  }

  const startEditing = (
    service: Service
  ) => {
    setEditingId(service.id)
    setTitle(service.title)
    setDescription(
      service.description
    )
    setIcon(service.icon)
    setActive(service.active)
    setError('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const deleteService = async (
    id: string
  ) => {
    const firestore = db()

    if (!firestore) return

    const ok = window.confirm(
      'هل أنتِ متأكدة من حذف هذه الخدمة؟'
    )

    if (!ok) return

    try {
      await deleteDoc(
        doc(
          firestore,
          'services',
          id
        )
      )

      if (
        editingId === id
      ) {
        resetForm()
      }
    } catch (deleteError) {
      console.error(
        deleteError
      )

      setError(
        'حدث خطأ أثناء حذف الخدمة.'
      )
    }
  }

  const toggleService = async (
    service: Service
  ) => {
    const firestore = db()

    if (!firestore) return

    try {
      await updateDoc(
        doc(
          firestore,
          'services',
          service.id
        ),
        {
          active:
            !service.active,
        }
      )
    } catch (toggleError) {
      console.error(
        toggleError
      )

      setError(
        'حدث خطأ أثناء تغيير حالة الخدمة.'
      )
    }
  }

  if (loading) {
    return (
      <div
        dir="rtl"
        className="rounded-3xl bg-white p-8 text-center shadow-sm"
      >
        <div className="text-3xl">
          🩺
        </div>

        <p className="mt-3 font-bold text-gray-600">
          جاري تحميل الخدمات...
        </p>
      </div>
    )
  }

  return (
    <section
      dir="rtl"
      className="space-y-6"
    >
      {/* TITLE */}

      <div>
        <h1 className="text-3xl font-black text-gray-900">
          إدارة الخدمات
        </h1>

        <p className="mt-2 text-gray-500">
          أضيفي أو عدّلي أو احذفي الخدمات
          التي تظهر للعملاء على الموقع.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
          {error}
        </div>
      )}

      {/* FORM */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">
              {editingId
                ? '✏️ تعديل الخدمة'
                : '➕ إضافة خدمة جديدة'}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              البيانات التي تكتبيها هنا ستُحفظ في
              Firebase.
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
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              اسم الخدمة
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="مثال: الكشف العادي"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#A62B73] focus:bg-white focus:ring-2 focus:ring-[#A62B73]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              وصف الخدمة
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="اكتبي وصف الخدمة..."
              rows={4}
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#A62B73] focus:bg-white focus:ring-2 focus:ring-[#A62B73]/20"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                الأيقونة
              </label>

              <input
                type="text"
                value={icon}
                onChange={(event) =>
                  setIcon(
                    event.target.value
                  )
                }
                placeholder="🩺"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-2xl outline-none transition focus:border-[#A62B73] focus:bg-white focus:ring-2 focus:ring-[#A62B73]/20"
              />
            </div>

            <div className="flex items-end">
              <label className="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) =>
                    setActive(
                      event.target.checked
                    )
                  }
                  className="h-5 w-5 accent-[#A62B73]"
                />

                <span className="font-bold text-gray-700">
                  الخدمة ظاهرة على الموقع
                </span>
              </label>
            </div>

          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-[#A62B73] px-5 py-4 font-black text-white shadow-md transition hover:bg-[#8E235F] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? 'جاري الحفظ...'
              : editingId
              ? 'حفظ التعديل'
              : 'إضافة الخدمة'}
          </button>
        </form>
      </div>

      {/* SERVICES LIST */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black">
              الخدمات الحالية
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              إجمالي الخدمات: {services.length}
            </p>
          </div>
        </div>

        {services.length === 0 ? (
          <div className="rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
            لا توجد خدمات حاليًا.
          </div>
        ) : (
          <div className="space-y-4">
            {services.map(
              (service) => (
                <div
                  key={service.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex gap-4">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5E7EF] text-2xl">
                        {service.icon}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-lg font-black text-gray-900">
                            {service.title}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              service.active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {service.active
                              ? 'ظاهرة'
                              : 'مخفية'}
                          </span>

                        </div>

                        <p className="mt-2 text-sm leading-7 text-gray-500">
                          {service.description}
                        </p>
                      </div>

                    </div>

                    <div className="flex flex-wrap gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          startEditing(
                            service
                          )
                        }
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                      >
                        ✏️ تعديل
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleService(
                            service
                          )
                        }
                        className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-300"
                      >
                        {service.active
                          ? '👁️ إخفاء'
                          : '👁️ إظهار'}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteService(
                            service.id
                          )
                        }
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                      >
                        🗑️ حذف
                      </button>

                    </div>

                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  )
}