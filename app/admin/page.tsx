'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import {
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { db, auth } from '../../src/lib/firebase'
import ServicesManager from './ServicesManager'

type Tab =
  | 'dashboard'
  | 'bookings'
  | 'branches'
  | 'services'
  | 'products'
  | 'customers'

type Booking = {
  id: string
  name?: string
  phone?: string
  branch?: string
  service?: string
  date?: string
  time?: string
  status?: string
  createdAt?: string
}

type Product = {
  id: string
  name?: string
  price?: string | number
  category?: string
  imageUrl?: string
  createdAt?: string
}

type Customer = {
  id: string
  name?: string
  email?: string
  phone?: string
  orders?: number
  createdAt?: string
}

const WHATSAPP = '201281441562'

const branches = [
  {
    name: 'شبرا مصر',
    address:
      'تقاطع خلوصي مع الترعة البولاقية أمام مدرسة رمسيس، شبرا',
    location:
      'https://maps.app.goo.gl/FNrmpeFMkCua4jjn7',
    followUp: 'غير محدد',
  },
  {
    name: 'مدينة نصر',
    address:
      '46 شارع محمد النادي، مصطفى النحاس، محطة الهيثم، بجوار ماركت بيم',
    location: 'https://bit.ly/3wfo32Z',
    followUp: 'غير محدد',
  },
  {
    name: 'حلمية الزيتون',
    address:
      'ميدان حلمية الزيتون، أعلى عصير أفوكادو وبجوار بنزينة التعاون',
    location: 'https://bit.ly/3Fwsw5F',
    followUp: 'غير محدد',
  },
  {
    name: 'المعادي',
    address:
      '١٠١ ش ٩ المعادي أمام البنك الأهلي وبجوار مترو المعادي',
    location: 'https://bit.ly/3RPH9X6',
    followUp: '75 جنيه',
  },
  {
    name: 'العبور',
    address:
      'العبور، الحي السادس، قطعة 52، الدور الثاني، أعلى ميديكال هاوس',
    location:
      'https://goo.gl/maps/QWJj7f1dmQVQp3cH9',
    followUp: 'غير محدد',
  },
  {
    name: 'إمبابة',
    address:
      'شارع الوحدة أمام كوك دور وكنتاكي',
    location:
      'https://maps.google.com/maps?q=30.0863294%2C31.2213284&z=17&hl=ar',
    followUp: '60 جنيه',
  },
  {
    name: '6 أكتوبر',
    address:
      'ميدان الحصري، عمارة ٣، المحور المركزي، أعلى راية ستور، الدور الثالث',
    location:
      'https://maps.app.goo.gl/4dN6EwYtuespmcTw8',
    followUp: 'غير محدد',
  },
  {
    name: 'الفيوم',
    address:
      'أمام المستشفى العام، باب الشؤون الصحية بالمستشفى، برج الأطباء، مدخل الإداري الثاني، الدور الثالث',
    location:
      'https://maps.app.goo.gl/M6GGZbRPNjLa2qyk7',
    followUp: '70 جنيه',
  },
  {
    name: 'الهرم',
    address:
      '٢٣٦ ش الهرم بجوار سنترال الهرم، الدور الثالث، شقة ٦',
    location:
      'https://maps.app.goo.gl/AWumxoRCiRcfJaoq6?g_st=aw',
    followUp: 'غير محدد',
  },
]

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
        active
          ? 'bg-[#A62B73] text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: string
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-black text-[#A62B73]">
            {value}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E7EF] text-2xl">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  const [activeTab, setActiveTab] =
    useState<Tab>('dashboard')

  const [bookings, setBookings] =
    useState<Booking[]>([])

  const [products, setProducts] =
    useState<Product[]>([])

  const [customers, setCustomers] =
    useState<Customer[]>([])

  const [search, setSearch] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  // ================= AUTH =================

  useEffect(() => {
    const firebaseAuth = auth()

    if (!firebaseAuth) {
      setAuthChecked(true)
      router.replace('/login')
      return
    }

    const unsubscribe =
      onAuthStateChanged(
        firebaseAuth,
        (currentUser) => {
          if (!currentUser) {
            setUser(null)
            setAuthChecked(true)
            router.replace('/login')
            return
          }

          setUser(currentUser)
          setAuthChecked(true)
        }
      )

    return () => unsubscribe()
  }, [router])

  // ================= FIRESTORE =================

  useEffect(() => {
    if (!authChecked || !user) {
      return
    }

    const firestore = db()

    if (!firestore) {
      setLoading(false)
      return
    }

    setLoading(true)

    const unsubscribeBookings = onSnapshot(
      collection(firestore, 'bookings'),
      (snapshot) => {
        const data: Booking[] =
          snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<
              Booking,
              'id'
            >),
          }))

        setBookings(data)
        setLoading(false)
      },
      (error) => {
        console.error(error)
        setLoading(false)
      }
    )

    const unsubscribeProducts = onSnapshot(
      collection(firestore, 'products'),
      (snapshot) => {
        const data: Product[] =
          snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<
              Product,
              'id'
            >),
          }))

        setProducts(data)
      },
      (error) => {
        console.error(error)
      }
    )

    const unsubscribeCustomers = onSnapshot(
      collection(firestore, 'customers'),
      (snapshot) => {
        const data: Customer[] =
          snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<
              Customer,
              'id'
            >),
          }))

        setCustomers(data)
      },
      (error) => {
        console.error(error)
      }
    )

    return () => {
      unsubscribeBookings()
      unsubscribeProducts()
      unsubscribeCustomers()
    }
  }, [authChecked, user])

  // ================= FILTERS =================

  const pendingBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        !booking.status ||
        booking.status === 'pending' ||
        booking.status === 'قيد الانتظار'
    )
  }, [bookings])

  const confirmedBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.status === 'confirmed' ||
        booking.status === 'مؤكد'
    )
  }, [bookings])

  const filteredBookings = useMemo(() => {
    const value =
      search.trim().toLowerCase()

    if (!value) {
      return bookings
    }

    return bookings.filter((booking) =>
      [
        booking.name,
        booking.phone,
        booking.branch,
        booking.service,
        booking.status,
        booking.date,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(value)
    )
  }, [bookings, search])

  const filteredProducts = useMemo(() => {
    const value =
      search.trim().toLowerCase()

    if (!value) {
      return products
    }

    return products.filter((product) =>
      [
        product.name,
        product.category,
        String(product.price ?? ''),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(value)
    )
  }, [products, search])

  const filteredCustomers = useMemo(() => {
    const value =
      search.trim().toLowerCase()

    if (!value) {
      return customers
    }

    return customers.filter((customer) =>
      [
        customer.name,
        customer.email,
        customer.phone,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(value)
    )
  }, [customers, search])

  // ================= BOOKINGS =================

  const confirmBooking = async (
    id: string
  ) => {
    const firestore = db()

    if (!firestore) return

    try {
      await updateDoc(
        doc(firestore, 'bookings', id),
        {
          status: 'مؤكد',
        }
      )
    } catch (error) {
      console.error(error)
      alert(
        'حدث خطأ أثناء تأكيد الحجز'
      )
    }
  }

  const cancelBooking = async (
    id: string
  ) => {
    const firestore = db()

    if (!firestore) return

    try {
      await updateDoc(
        doc(firestore, 'bookings', id),
        {
          status: 'ملغي',
        }
      )
    } catch (error) {
      console.error(error)
      alert(
        'حدث خطأ أثناء إلغاء الحجز'
      )
    }
  }

  const deleteBooking = async (
    id: string
  ) => {
    const firestore = db()

    if (!firestore) return

    const ok = window.confirm(
      'هل أنتِ متأكدة من حذف الحجز؟'
    )

    if (!ok) return

    try {
      await deleteDoc(
        doc(firestore, 'bookings', id)
      )
    } catch (error) {
      console.error(error)
      alert(
        'حدث خطأ أثناء حذف الحجز'
      )
    }
  }

  // ================= PRODUCTS =================

  const deleteProduct = async (
    id: string
  ) => {
    const firestore = db()

    if (!firestore) return

    const ok = window.confirm(
      'هل أنتِ متأكدة من حذف المنتج؟'
    )

    if (!ok) return

    try {
      await deleteDoc(
        doc(firestore, 'products', id)
      )
    } catch (error) {
      console.error(error)
      alert(
        'حدث خطأ أثناء حذف المنتج'
      )
    }
  }

  // ================= WHATSAPP =================

  const openWhatsApp = (
    text: string
  ) => {
    const url =
      `https://wa.me/${WHATSAPP}?text=` +
      encodeURIComponent(text)

    window.open(url, '_blank')
  }

  // ================= STATUS =================

  const getStatusClass = (
    status?: string
  ) => {
    if (
      status === 'مؤكد' ||
      status === 'confirmed'
    ) {
      return 'bg-green-100 text-green-700'
    }

    if (
      status === 'ملغي' ||
      status === 'cancelled'
    ) {
      return 'bg-red-100 text-red-700'
    }

    return 'bg-yellow-100 text-yellow-700'
  }

  // ================= LOGOUT =================

  const handleLogout = async () => {
    const firebaseAuth = auth()

    if (!firebaseAuth) {
      router.replace('/login')
      return
    }

    try {
      await signOut(firebaseAuth)
      setUser(null)
      router.replace('/login')
    } catch (error) {
      console.error(error)
      alert(
        'حدث خطأ أثناء تسجيل الخروج.'
      )
    }
  }

  // ================= AUTH LOADING =================

  if (!authChecked) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#F8F6F8]"
      >
        <div className="rounded-3xl bg-white px-8 py-7 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E7EF] text-2xl">
            🩺
          </div>

          <p className="mt-4 font-bold text-gray-700">
            جاري التحقق من تسجيل الدخول...
          </p>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8F6F8] text-gray-900"
    >
      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="text-2xl font-black text-[#A62B73]">
                Dr. Mohamed Rohayem
              </div>

              <div className="mt-1 text-sm text-gray-500">
                لوحة الإدارة
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">

              <TabButton
                active={
                  activeTab === 'dashboard'
                }
                onClick={() =>
                  setActiveTab('dashboard')
                }
              >
                📊 الرئيسية
              </TabButton>

              <TabButton
                active={
                  activeTab === 'bookings'
                }
                onClick={() =>
                  setActiveTab('bookings')
                }
              >
                🩺 الحجوزات
              </TabButton>

              <TabButton
                active={
                  activeTab === 'branches'
                }
                onClick={() =>
                  setActiveTab('branches')
                }
              >
                🏥 الفروع
              </TabButton>

              <TabButton
                active={
                  activeTab === 'services'
                }
                onClick={() =>
                  setActiveTab('services')
                }
              >
                🩹 الخدمات
              </TabButton>

              <TabButton
                active={
                  activeTab === 'products'
                }
                onClick={() =>
                  setActiveTab('products')
                }
              >
                💊 المنتجات
              </TabButton>

              <TabButton
                active={
                  activeTab === 'customers'
                }
                onClick={() =>
                  setActiveTab('customers')
                }
              >
                👥 العملاء
              </TabButton>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-200"
              >
                🚪 تسجيل الخروج
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* SEARCH */}

        {activeTab !== 'dashboard' &&
          activeTab !== 'branches' &&
          activeTab !== 'services' && (
            <div className="mb-6">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="ابحث هنا..."
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-[#A62B73] focus:ring-2 focus:ring-[#A62B73]/20"
              />
            </div>
          )}

        {/* LOADING */}

        {loading && (
          <div className="mb-6 rounded-2xl bg-white p-5 text-center text-gray-500 shadow-sm">
            جاري تحميل البيانات...
          </div>
        )}

        {/* ================= DASHBOARD ================= */}

        {activeTab === 'dashboard' && (
          <section>

            <div className="mb-8">
              <h1 className="text-3xl font-black">
                أهلاً بك في لوحة الإدارة 👋
              </h1>

              <p className="mt-2 text-gray-500">
                يمكنك متابعة الحجوزات والفروع
                والخدمات والمنتجات والعملاء من هنا.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <StatCard
                title="إجمالي الحجوزات"
                value={bookings.length}
                icon="🩺"
              />

              <StatCard
                title="الحجوزات المؤكدة"
                value={
                  confirmedBookings.length
                }
                icon="✅"
              />

              <StatCard
                title="الحجوزات المعلقة"
                value={
                  pendingBookings.length
                }
                icon="⏳"
              />

              <StatCard
                title="العملاء"
                value={customers.length}
                icon="👥"
              />

            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">

              <div className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-black">
                  آخر الحجوزات
                </h2>

                <div className="mt-5 space-y-3">

                  {bookings
                    .slice(0, 5)
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                      >

                        <div>
                          <div className="font-bold">
                            {booking.name ||
                              'بدون اسم'}
                          </div>

                          <div className="mt-1 text-sm text-gray-500">
                            {booking.service ||
                              'كشف أونلاين'}
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status ||
                            'قيد الانتظار'}
                        </span>

                      </div>
                    ))}

                  {bookings.length === 0 && (
                    <div className="rounded-2xl bg-gray-50 p-6 text-center text-gray-500">
                      لا توجد حجوزات حتى الآن.
                    </div>
                  )}

                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-black">
                  ملخص سريع
                </h2>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between rounded-2xl bg-[#F5E7EF] p-4">
                    <span className="font-bold">
                      عدد الفروع
                    </span>

                    <span className="font-black text-[#A62B73]">
                      {branches.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                    <span className="font-bold">
                      عدد المنتجات
                    </span>

                    <span className="font-black text-[#A62B73]">
                      {products.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                    <span className="font-bold">
                      عدد العملاء
                    </span>

                    <span className="font-black text-[#A62B73]">
                      {customers.length}
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </section>
        )}

        {/* ================= BOOKINGS ================= */}

        {activeTab === 'bookings' && (
          <section>

            <div className="mb-6">
              <h1 className="text-3xl font-black">
                الحجوزات
              </h1>

              <p className="mt-2 text-gray-500">
                إدارة جميع حجوزات المرضى.
              </p>
            </div>

            <div className="space-y-4">

              {filteredBookings.map(
                (booking) => (
                  <div
                    key={booking.id}
                    className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        <div>
                          <div className="text-xs text-gray-400">
                            الاسم
                          </div>

                          <div className="mt-1 font-black">
                            {booking.name ||
                              'غير محدد'}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">
                            الهاتف
                          </div>

                          <div className="mt-1 font-bold">
                            {booking.phone ||
                              'غير محدد'}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">
                            الفرع
                          </div>

                          <div className="mt-1 font-bold">
                            {booking.branch ||
                              'أونلاين'}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">
                            الخدمة
                          </div>

                          <div className="mt-1 font-bold">
                            {booking.service ||
                              'كشف'}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">
                            التاريخ
                          </div>

                          <div className="mt-1 font-bold">
                            {booking.date ||
                              'غير محدد'}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">
                            الوقت
                          </div>

                          <div className="mt-1 font-bold">
                            {booking.time ||
                              'غير محدد'}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">
                            الحالة
                          </div>

                          <span
                            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                              booking.status
                            )}`}
                          >
                            {booking.status ||
                              'قيد الانتظار'}
                          </span>
                        </div>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            confirmBooking(
                              booking.id
                            )
                          }
                          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                        >
                          تأكيد
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            cancelBooking(
                              booking.id
                            )
                          }
                          className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-bold text-white hover:bg-yellow-600"
                        >
                          إلغاء
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openWhatsApp(
                              `مرحبًا ${booking.name || ''}، بخصوص حجزك لدى د. محمد رحيم.`
                            )
                          }
                          className="rounded-xl bg-[#25D366] px-4 py-2 text-sm font-bold text-white hover:bg-[#1ebe5d]"
                        >
                          WhatsApp
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteBooking(
                              booking.id
                            )
                          }
                          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                        >
                          حذف
                        </button>

                      </div>

                    </div>
                  </div>
                )
              )}

              {filteredBookings.length === 0 && (
                <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">
                  لا توجد حجوزات مطابقة للبحث.
                </div>
              )}

            </div>
          </section>
        )}

        {/* ================= BRANCHES ================= */}

        {activeTab === 'branches' && (
          <section>

            <div className="mb-6">
              <h1 className="text-3xl font-black">
                الفروع
              </h1>

              <p className="mt-2 text-gray-500">
                جميع فروع د. محمد رحيم.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {branches.map(
                (branch) => (
                  <div
                    key={branch.name}
                    className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                  >

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E7EF] text-2xl">
                      🏥
                    </div>

                    <h2 className="mt-5 text-xl font-black text-[#A62B73]">
                      {branch.name}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {branch.address}
                    </p>

                    <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm">
                      <span className="font-bold">
                        المتابعة:
                      </span>{' '}
                      {branch.followUp}
                    </div>

                    <a
                      href={branch.location}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 block rounded-xl bg-[#A62B73] px-4 py-3 text-center font-bold text-white hover:bg-[#8E235F]"
                    >
                      📍 فتح الموقع
                    </a>

                  </div>
                )
              )}

            </div>
          </section>
        )}

        {/* ================= SERVICES ================= */}

        {activeTab === 'services' && (
          <section>
            <ServicesManager />
          </section>
        )}

        {/* ================= PRODUCTS ================= */}

        {activeTab === 'products' && (
          <section>

            <div className="mb-6">
              <h1 className="text-3xl font-black">
                المنتجات
              </h1>

              <p className="mt-2 text-gray-500">
                المنتجات الموجودة في قاعدة البيانات.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map(
                (product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
                  >

                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={
                          product.name ||
                          'Product'
                        }
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-[#F5E7EF] text-6xl">
                        💊
                      </div>
                    )}

                    <div className="p-5">

                      <h2 className="text-lg font-black">
                        {product.name ||
                          'منتج بدون اسم'}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        {product.category ||
                          'بدون تصنيف'}
                      </p>

                      <div className="mt-4 flex items-center justify-between">

                        <span className="font-black text-[#A62B73]">
                          {product.price ??
                            'غير محدد'}{' '}
                          جنيه
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            deleteProduct(
                              product.id
                            )
                          }
                          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                        >
                          حذف
                        </button>

                      </div>

                    </div>
                  </div>
                )
              )}

            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">
                لا توجد منتجات.
              </div>
            )}

          </section>
        )}

        {/* ================= CUSTOMERS ================= */}

        {activeTab === 'customers' && (
          <section>

            <div className="mb-6">
              <h1 className="text-3xl font-black">
                العملاء
              </h1>

              <p className="mt-2 text-gray-500">
                بيانات العملاء المسجلة.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] text-right">

                  <thead className="bg-[#F5E7EF]">
                    <tr>
                      <th className="px-5 py-4 font-black">
                        الاسم
                      </th>

                      <th className="px-5 py-4 font-black">
                        الهاتف
                      </th>

                      <th className="px-5 py-4 font-black">
                        البريد الإلكتروني
                      </th>

                      <th className="px-5 py-4 font-black">
                        الطلبات
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredCustomers.map(
                      (customer) => (
                        <tr
                          key={customer.id}
                          className="border-t border-gray-100"
                        >
                          <td className="px-5 py-4 font-bold">
                            {customer.name ||
                              'غير محدد'}
                          </td>

                          <td className="px-5 py-4">
                            {customer.phone ||
                              'غير محدد'}
                          </td>

                          <td className="px-5 py-4">
                            {customer.email ||
                              'غير محدد'}
                          </td>

                          <td className="px-5 py-4 font-bold text-[#A62B73]">
                            {customer.orders ??
                              0}
                          </td>
                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {filteredCustomers.length === 0 && (
              <div className="mt-5 rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">
                لا توجد بيانات عملاء.
              </div>
            )}

          </section>
        )}

      </div>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
        Dr. Mohamed Rohayem — لوحة الإدارة
      </footer>

    </main>
  )
}