'use client'

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react'

/* =========================================================
   إعدادات الفروع - جميع الفروع
========================================================= */

const BRANCH_CONFIG = {
  shobra: {
    name: 'شبرا مصر',

    scriptUrl:
      'https://script.google.com/macros/s/AKfycbxru7xRZbmWRkhfhcIRz_28eV_x8cu30zHlJkYhYJQnV4VEQ1f6DN-JHrisUn2zXW1WYg/exec',

    address:
      'تقاطع خلوصي مع الترعة البولاقية أمام مدرسة رمسيس. شبرا، 3 دقائق من مترو روض الفرج.',

    mapUrl:
      'https://maps.app.goo.gl/FNrmpeFMkCua4jjn7',

    whatsapp:
      '201281441562',
  },

  'nasr-city': {
    name: 'مدينة نصر',

    scriptUrl:
      'https://script.google.com/macros/s/AKfycbwwneqrWrSY0YpjkvSYXsYJHuEzz-6N2AsbOhKcymzsDZilhF7VcGsvc3CJq5-TrSkCNg/exec',

    address:
      '46 شارع محمد النادي، مصطفى النحاس، محطة الهيثم، بجوار ماركت بيم.',

    mapUrl:
      'https://bit.ly/3wfo32Z',

    whatsapp:
      '201281441562',
  },

  helmeya: {
    name: 'حلمية الزيتون',

    scriptUrl: '',

    address:
      'ميدان حلمية الزيتون، أعلى عصير أفوكادو وبجوار بنزينة التعاون.',

    mapUrl:
      'https://bit.ly/3Fwsw5F',

    whatsapp:
      '201281441562',
  },

  maadi: {
    name: 'المعادي',

    scriptUrl: '',

    address:
      '101 شارع 9 المعادي، أمام البنك الأهلي وبجوار مترو المعادي.',

    mapUrl:
      'https://bit.ly/3RPH9X6',

    whatsapp:
      '201281441562',
  },

  'el-obour': {
    name: 'العبور',

    scriptUrl:
      'https://script.google.com/macros/s/AKfycbyNakFF8xI0hOkWv3pVnSQ1TdtSB3FVBKCPGQvfGgeLK4s1td1juxWRY6ao-mLq6H4DHA/exec',

    address:
      'العبور، الحي السادس، قطعة 52، الدور الثاني، أعلى ميديكال هاوس.',

    mapUrl:
      'https://goo.gl/maps/QWJj7f1dmQVQp3cH9',

    whatsapp:
      '201281441562',
  },

  imbaba: {
    name: 'إمبابة',

    scriptUrl: '',

    address:
      'شارع الوحدة أمام كوك دور وكنتاكي.',

    mapUrl:
      'https://maps.google.com/maps?q=30.0863294%2C31.2213284&z=17&hl=ar',

    whatsapp:
      '201281441562',
  },

  october: {
    name: '6 أكتوبر',

    scriptUrl:
      'https://script.google.com/macros/s/AKfycbxTYJNyRCd-v1GpziWQa8JZbT0T5YWCbU09fFntU9PvLQBmwD5f2l7UPA9C_pw3mTuHvg/exec',

    address:
      'ميدان الحصري، عمارة 3، المحور المركزي، أعلى راية ستور، الدور الثالث، ميدان الحصري.',

    mapUrl:
      'https://maps.app.goo.gl/4dN6EwYtuespmcTw8',

    whatsapp:
      '201281441562',
  },

  fayoum: {
    name: 'الفيوم',

    scriptUrl: '',

    address:
      'أمام المستشفى العام، باب الشؤون الصحية بالمستشفى، برج الأطباء، مدخل الإداري الثاني، الدور الثالث.',

    mapUrl:
      'https://maps.app.goo.gl/M6GGZbRPNjLa2qyk7',

    whatsapp:
      '201281441562',
  },

  haram: {
    name: 'الهرم',

    scriptUrl:
      'https://script.google.com/macros/s/AKfycbyVKJ6R_A5DcJK-4viJzBBJF_QYI-_goIRGbeOlyKR7KIVCDLbALyceeS31zag3WjI8/exec',

    address:
      '236 شارع الهرم، بجوار سنترال الهرم، الدور الثالث، شقة 6.',

    mapUrl:
      'https://maps.app.goo.gl/AWumxoRCiRcfJaoq6?g_st=aw',

    whatsapp:
      '201281441562',
  },
} as const

type BranchId = keyof typeof BRANCH_CONFIG

/* =========================================================
   نوع الموعد
========================================================= */

type Slot = {
  sheetName: string
  row: number
  date: string
  day: string
  time: string
  booked: boolean
}

/* =========================================================
   الفروع التسعة
========================================================= */

const BRANCHES: {
  id: BranchId
  name: string
}[] = [
  {
    id: 'shobra',
    name: 'شبرا مصر',
  },

  {
    id: 'nasr-city',
    name: 'مدينة نصر',
  },

  {
    id: 'helmeya',
    name: 'حلمية الزيتون',
  },

  {
    id: 'maadi',
    name: 'المعادي',
  },

  {
    id: 'el-obour',
    name: 'العبور',
  },

  {
    id: 'imbaba',
    name: 'إمبابة',
  },

  {
    id: 'october',
    name: '6 أكتوبر',
  },

  {
    id: 'fayoum',
    name: 'الفيوم',
  },

  {
    id: 'haram',
    name: 'الهرم',
  },
]

/* =========================================================
   الصفحة
========================================================= */

export default function BookingPage() {

  /* =======================================================
     المواعيد
  ======================================================= */

  const [slots, setSlots] =
    useState<Slot[]>([])

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  /* =======================================================
     بيانات العميل
  ======================================================= */

  const [name, setName] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [whatsapp, setWhatsapp] =
    useState('')

  const [branch, setBranch] =
    useState<BranchId | ''>('')

  /* =======================================================
     البيانات الاختيارية
  ======================================================= */

  const [health, setHealth] =
    useState('')

  const [medicines, setMedicines] =
    useState('')

  const [notes, setNotes] =
    useState('')

  /* =======================================================
     الموعد المختار
  ======================================================= */

  const [selectedSlot, setSelectedSlot] =
    useState<Slot | null>(null)

  /* =======================================================
     حالة الحجز
  ======================================================= */

  const [booking, setBooking] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  /* =======================================================
     قراءة البيانات من الرابط
  ======================================================= */

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      )

    setName(
      params.get('name') || ''
    )

    setPhone(
      params.get('phone') || ''
    )

    setWhatsapp(
      params.get('whatsapp') || ''
    )

    const urlBranch =
      params.get('branch') || ''

    if (
      urlBranch in BRANCH_CONFIG
    ) {
      setBranch(
        urlBranch as BranchId
      )
    }

    setHealth(
      params.get('health') || ''
    )

    setMedicines(
      params.get('medicines') || ''
    )

    setNotes(
      params.get('notes') || ''
    )

  }, [])

  /* =======================================================
     الفرع الحالي
  ======================================================= */

  const currentBranch =
    useMemo(() => {

      if (!branch) {
        return null
      }

      return BRANCH_CONFIG[branch]

    }, [branch])

  /* =======================================================
     تحميل المواعيد
  ======================================================= */

  useEffect(() => {

    if (!branch) {

      setSlots([])

      setLoading(false)

      setError('')

      setSelectedSlot(null)

      return
    }

    const branchConfig =
      BRANCH_CONFIG[branch]

    async function loadSlots() {

      try {

        setLoading(true)

        setError('')

        setSlots([])

        setSelectedSlot(null)

        /* =================================================
           التأكد من وجود رابط الفرع
        ================================================= */

        if (!branchConfig.scriptUrl) {

          throw new Error(
            `فرع ${branchConfig.name} موجود، لكن لم يتم ربط نظام المواعيد الخاص به بعد.`
          )

        }

        /* =================================================
           الاتصال بـ Google Apps Script
        ================================================= */

        const response =
          await fetch(
            branchConfig.scriptUrl,
            {
              method: 'GET',
              cache: 'no-store',
            }
          )

        if (!response.ok) {

          throw new Error(
            `تعذر الاتصال بنظام مواعيد فرع ${branchConfig.name}.`
          )

        }

        const data =
          await response.json()

        if (!data.success) {

          throw new Error(
            data.error ||
              'حدث خطأ أثناء تحميل المواعيد.'
          )

        }

        setSlots(
          Array.isArray(data.slots)
            ? data.slots
            : []
        )

      } catch (err) {

        console.error(err)

        setSlots([])

        setError(
          err instanceof Error
            ? err.message
            : 'لم نتمكن من تحميل المواعيد حاليًا.'
        )

      } finally {

        setLoading(false)

      }

    }

    loadSlots()

  }, [branch])

  /* =======================================================
     المواعيد المتاحة
  ======================================================= */

  const availableSlots =
    useMemo(() => {

      return slots.filter(
        (slot) => !slot.booked
      )

    }, [slots])

  /* =======================================================
     استخراج الساعة الأساسية
     
     مثال:
     2:00 PM
     2:15 PM
     2:30 PM
     2:45 PM

     كلهم يظهروا كـ 2:00 PM فقط
  ======================================================= */

  const getHourKey = (
    time: string
  ) => {

    const value =
      String(time || '')
        .trim()
        .toUpperCase()

    const match =
      value.match(
        /^(\d{1,2})\s*:/
      )

    if (!match) {
      return value
    }

    let hour =
      Number(match[1])

    if (
      value.includes('PM') &&
      hour !== 12
    ) {

      hour += 12

    }

    if (
      value.includes('AM') &&
      hour === 12
    ) {

      hour = 0

    }

    return String(hour)

  }

  /* =======================================================
     تجميع المواعيد حسب اليوم
     
     المهم:
     نعرض أول موعد فقط من كل ساعة.
  ======================================================= */

  const groupedSlots =
    useMemo(() => {

      const groups: Record<
        string,
        {
          date: string
          day: string
          slots: Slot[]
        }
      > = {}

      availableSlots.forEach(
        (slot) => {

          const key =
            `${slot.date}-${slot.day}`

          if (!groups[key]) {

            groups[key] = {

              date:
                slot.date,

              day:
                slot.day,

              slots:
                [],
            }

          }

          const hour =
            getHourKey(
              slot.time
            )

          const alreadyShown =
            groups[key].slots.some(
              (existingSlot) =>
                getHourKey(
                  existingSlot.time
                ) === hour
            )

          if (!alreadyShown) {

            groups[key].slots.push(
              slot
            )

          }

        }
      )

      Object.values(groups).forEach(
        (group) => {

          group.slots.sort(
            (a, b) =>
              a.time.localeCompare(
                b.time
              )
          )

        }
      )

      return Object.values(
        groups
      ).sort(
        (a, b) =>
          a.date.localeCompare(
            b.date
          )
      )

    }, [availableSlots])

  /* =======================================================
     تنسيق التاريخ
  ======================================================= */

  const formatDate = (
    date: string
  ) => {

    if (!date) {
      return ''
    }

    const parsed =
      new Date(
        `${date}T00:00:00`
      )

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {

      return date

    }

    return parsed.toLocaleDateString(
      'ar-EG',
      {
        day:
          'numeric',

        month:
          'long',

        year:
          'numeric',
      }
    )

  }

  /* =======================================================
     التحقق من البيانات
  ======================================================= */

  const validateForm =
    () => {

      if (!name.trim()) {

        return (
          'من فضلك اكتب الاسم بالكامل.'
        )

      }

      if (!phone.trim()) {

        return (
          'من فضلك اكتب رقم التليفون.'
        )

      }

      if (!whatsapp.trim()) {

        return (
          'من فضلك اكتب رقم الواتساب.'
        )

      }

      if (!branch) {

        return (
          'من فضلك اختر الفرع.'
        )

      }

      if (!selectedSlot) {

        return (
          'من فضلك اختر موعد الكشف.'
        )

      }

      return ''

    }

  /* =======================================================
     تأكيد الحجز
  ======================================================= */

  const handleBooking =
    async () => {

      setError('')

      const validationError =
        validateForm()

      if (validationError) {

        setError(
          validationError
        )

        return

      }

      if (
        !selectedSlot ||
        !branch
      ) {

        return

      }

      const branchConfig =
        BRANCH_CONFIG[branch]

      if (!branchConfig.scriptUrl) {

        setError(
          `فرع ${branchConfig.name} لم يتم ربط نظام الحجز الخاص به بعد.`
        )

        return

      }

      try {

        setBooking(true)

        /* =================================================
           إرسال الحجز
        ================================================= */

        const response =
          await fetch(
            branchConfig.scriptUrl,
            {

              method:
                'POST',

              headers: {
                'Content-Type':
                  'text/plain;charset=utf-8',
              },

              body:
                JSON.stringify({

                  sheetName:
                    selectedSlot.sheetName,

                  row:
                    selectedSlot.row,

                  name:
                    name.trim(),

                  phone:
                    phone.trim(),

                  whatsapp:
                    whatsapp.trim(),

                  health:
                    health.trim(),

                  medicines:
                    medicines.trim(),

                  notes:
                    notes.trim(),

                  branch:
                    branch,

                }),

            }
          )

        if (!response.ok) {

          throw new Error(
            'تعذر الاتصال بنظام الحجز.'
          )

        }

        const data =
          await response.json()

        if (!data.success) {

          throw new Error(
            data.error ||
              'تعذر تأكيد الحجز.'
          )

        }

        /* =================================================
           نجاح
        ================================================= */

        setSuccess(true)

        /* =================================================
           رسالة واتساب
        ================================================= */

        const whatsappMessage =
          `
أهلاً بحضرتك يا فندم 🌹

تم تسجيل حجز الكشف بنجاح.

👨‍⚕️ د. محمد رحيم

📍 الفرع:
${branchConfig.name}

📌 عنوان الفرع:
${branchConfig.address}

📍 لوكيشن الفرع:
${branchConfig.mapUrl || 'سيتم إرسال الموقع من المركز'}

📅 التاريخ:
${formatDate(
  selectedSlot.date
)}

🕐 الساعة:
${selectedSlot.time}

👤 الاسم:
${name}

📞 رقم التليفون:
${phone}

📱 رقم الواتساب:
${whatsapp}

نتمنى لحضرتك الشفاء والسلامة 🌷
          `.trim()

        const whatsappUrl =
          'https://wa.me/' +
          branchConfig.whatsapp +
          '?text=' +
          encodeURIComponent(
            whatsappMessage
          )

        setTimeout(() => {

          window.location.href =
            whatsappUrl

        }, 700)

      } catch (err) {

        console.error(err)

        setError(
          err instanceof Error
            ? err.message
            : 'حدث خطأ أثناء تأكيد الحجز.'
        )

      } finally {

        setBooking(false)

      }

    }

  /* =======================================================
     شاشة النجاح
  ======================================================= */

  if (success) {

    return (

      <main
        dir="rtl"
        className="min-h-screen bg-[#F8FBFD] px-4 py-12 text-[#183B56]"
      >

        <div className="mx-auto max-w-xl">

          <div className="rounded-[32px] bg-white p-8 text-center shadow-xl sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF9F0] text-4xl">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-black">
              تم تسجيل الحجز بنجاح
            </h1>

            <p className="mt-4 text-lg leading-8 text-[#60798A]">
              سيتم تحويلك الآن إلى
              واتساب لإرسال تفاصيل
              الحجز وتأكيد الموعد
              وموقع الفرع.
            </p>

          </div>

        </div>

      </main>

    )

  }

  /* =======================================================
     الصفحة الرئيسية
  ======================================================= */

  return (

    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FBFD] px-4 py-10 text-[#183B56]"
    >

      <div className="mx-auto max-w-6xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 text-center">

          <div className="mb-4 inline-flex rounded-full bg-[#EAF6FC] px-5 py-2 text-sm font-bold text-[#2F80B7]">
            الكشف العادي
          </div>

          <h1 className="text-3xl font-black sm:text-5xl">
            احجز موعد الكشف
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#60798A]">
            أدخل بياناتك واختار الفرع
            والموعد المناسب لإتمام الحجز.
          </p>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <section className="mx-auto mb-8 max-w-4xl rounded-[32px] border border-[#DCEAF3] bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-8">

            <h2 className="text-2xl font-black">
              👤 بيانات الحجز
            </h2>

            <p className="mt-2 leading-7 text-[#60798A]">
              البيانات الأساسية مطلوبة
              لإتمام الحجز، والمعلومات
              الطبية اختيارية.
            </p>

          </div>

          <div className="space-y-6">

            {/* الاسم */}

            <div>

              <label className="mb-2 block font-bold">

                الاسم بالكامل

                <span className="mr-1 text-[#E35D6A]">
                  *
                </span>

              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="اكتب الاسم بالكامل"
                required
                className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 outline-none transition focus:border-[#2F80B7] focus:bg-white"
              />

            </div>

            {/* التليفون */}

            <div>

              <label className="mb-2 block font-bold">

                رقم التليفون

                <span className="mr-1 text-[#E35D6A]">
                  *
                </span>

              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="01xxxxxxxxx"
                required
                dir="ltr"
                inputMode="tel"
                className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 text-left outline-none transition focus:border-[#2F80B7] focus:bg-white"
              />

            </div>

            {/* الواتساب */}

            <div>

              <label className="mb-2 block font-bold">

                رقم الواتساب

                <span className="mr-1 text-[#E35D6A]">
                  *
                </span>

              </label>

              <input
                type="tel"
                value={whatsapp}
                onChange={(e) =>
                  setWhatsapp(
                    e.target.value
                  )
                }
                placeholder="01xxxxxxxxx"
                required
                dir="ltr"
                inputMode="tel"
                className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 text-left outline-none transition focus:border-[#2F80B7] focus:bg-white"
              />

              <p className="mt-2 text-xs text-[#60798A]">
                رقم الواتساب مطلوب لإرسال
                تفاصيل الحجز.
              </p>

            </div>

            {/* الفرع */}

            <div>

              <label className="mb-2 block font-bold">

                اختر الفرع

                <span className="mr-1 text-[#E35D6A]">
                  *
                </span>

              </label>

              <select
                value={branch}
                required
                onChange={(e) => {

                  const value =
                    e.target.value as
                      | BranchId
                      | ''

                  setBranch(value)

                  setSelectedSlot(null)

                  setSlots([])

                  setError('')

                }}
                className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 outline-none transition focus:border-[#2F80B7] focus:bg-white"
              >

                <option value="">
                  اختر الفرع
                </option>

                {BRANCHES.map(
                  (item) => (

                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* الحالة الصحية */}

            <div>

              <label className="mb-2 block font-bold">

                الحالة الصحية

                <span className="mr-2 text-sm font-normal text-[#60798A]">
                  اختياري
                </span>

              </label>

              <textarea
                value={health}
                onChange={(e) =>
                  setHealth(
                    e.target.value
                  )
                }
                placeholder="اكتب أي معلومات صحية تحب الطبيب يعرفها..."
                rows={4}
                className="w-full resize-none rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 leading-7 outline-none transition focus:border-[#2F80B7] focus:bg-white"
              />

            </div>

            {/* الأدوية */}

            <div>

              <label className="mb-2 block font-bold">

                الأدوية المستخدمة حاليًا

                <span className="mr-2 text-sm font-normal text-[#60798A]">
                  اختياري
                </span>

              </label>

              <textarea
                value={medicines}
                onChange={(e) =>
                  setMedicines(
                    e.target.value
                  )
                }
                placeholder="اكتب أسماء الأدوية التي تستخدمها حاليًا إن وجدت..."
                rows={4}
                className="w-full resize-none rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 leading-7 outline-none transition focus:border-[#2F80B7] focus:bg-white"
              />

            </div>

            {/* الملاحظات */}

            <div>

              <label className="mb-2 block font-bold">

                ملاحظات إضافية

                <span className="mr-2 text-sm font-normal text-[#60798A]">
                  اختياري
                </span>

              </label>

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                placeholder="أي ملاحظات أخرى..."
                rows={3}
                className="w-full resize-none rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 leading-7 outline-none transition focus:border-[#2F80B7] focus:bg-white"
              />

            </div>

          </div>

        </section>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="mx-auto mb-8 max-w-4xl rounded-2xl border border-[#F3C2C8] bg-[#FFF5F6] p-4 font-bold text-[#C83D4B]">

            ⚠️ {error}

          </div>

        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading &&
          currentBranch && (

            <div className="rounded-[28px] bg-white p-10 text-center shadow-sm">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#DCEAF3] border-t-[#2F80B7]" />

              <p className="mt-5 font-bold text-[#60798A]">

                جاري تحميل مواعيد{' '}

                {currentBranch.name}

                ...

              </p>

            </div>

          )}

        {/* =================================================
            بدون فرع
        ================================================= */}

        {!branch && (

          <div className="rounded-[28px] bg-white p-10 text-center shadow-sm">

            <div className="text-4xl">
              📍
            </div>

            <h2 className="mt-5 text-2xl font-black">
              اختر الفرع أولًا
            </h2>

            <p className="mt-3 text-[#60798A]">
              بعد اختيار الفرع ستظهر
              المواعيد المتاحة الخاصة به.
            </p>

          </div>

        )}

        {/* =================================================
            لا توجد مواعيد
        ================================================= */}

        {!loading &&
          !error &&
          currentBranch &&
          groupedSlots.length === 0 && (

            <div className="rounded-[28px] bg-white p-10 text-center shadow-sm">

              <div className="text-4xl">
                📅
              </div>

              <h2 className="mt-5 text-2xl font-black">
                لا توجد مواعيد متاحة حاليًا
              </h2>

              <p className="mt-3 text-[#60798A]">
                يرجى المحاولة مرة أخرى لاحقًا.
              </p>

            </div>

          )}

        {/* =================================================
            المواعيد
        ================================================= */}

        {!loading &&
          !error &&
          currentBranch &&
          groupedSlots.length > 0 && (

            <div className="mx-auto max-w-5xl">

              <div className="mb-6 text-center">

                <h2 className="text-2xl font-black">

                  📅 اختر موعد الكشف

                  <span className="mr-1 text-[#E35D6A]">
                    *
                  </span>

                </h2>

                <p className="mt-2 text-[#60798A]">

                  المواعيد المتاحة في فرع{' '}

                  <strong>
                    {currentBranch.name}
                  </strong>

                </p>

              </div>

              <div className="space-y-8">

                {groupedSlots.map(
                  (group) => (

                    <section
                      key={`${group.date}-${group.day}`}
                      className="rounded-[28px] border border-[#DCEAF3] bg-white p-6 shadow-sm sm:p-8"
                    >

                      <div className="mb-6">

                        <h3 className="text-2xl font-black">
                          {group.day}
                        </h3>

                        <p className="mt-1 text-[#60798A]">
                          {formatDate(
                            group.date
                          )}
                        </p>

                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                        {group.slots.map(
                          (slot) => (

                            <button
                              key={`${slot.sheetName}-${slot.row}`}
                              type="button"
                              onClick={() => {

                                setSelectedSlot(
                                  slot
                                )

                                setError('')

                              }}
                              className={`rounded-2xl border-2 px-4 py-4 text-center font-black transition ${
                                selectedSlot?.row ===
                                  slot.row &&
                                selectedSlot?.sheetName ===
                                  slot.sheetName

                                  ? 'border-[#2F80B7] bg-[#EAF6FC] text-[#2F80B7]'

                                  : 'border-[#DCEAF3] bg-white hover:border-[#2F80B7] hover:bg-[#F4FAFD]'
                              }`}
                            >

                              <div className="text-lg">
                                {slot.time}
                              </div>

                              <div className="mt-1 text-xs font-bold text-[#60798A]">
                                متاح
                              </div>

                            </button>

                          )
                        )}

                      </div>

                    </section>

                  )
                )}

              </div>

            </div>

          )}

        {/* =================================================
            تأكيد الحجز
        ================================================= */}

        {selectedSlot &&
          !success && (

            <div className="sticky bottom-4 z-20 mt-8">

              <div className="mx-auto max-w-3xl rounded-[28px] border border-[#DCEAF3] bg-white p-5 shadow-2xl sm:p-6">

                <div className="flex flex-col gap-5">

                  <div>

                    <div className="text-sm font-bold text-[#60798A]">
                      الموعد المختار
                    </div>

                    <div className="mt-1 text-xl font-black">
                      {formatDate(
                        selectedSlot.date
                      )}
                    </div>

                    <div className="mt-1 font-bold text-[#2F80B7]">

                      {selectedSlot.day}

                      {' — '}

                      {selectedSlot.time}

                    </div>

                  </div>

                  <div className="grid gap-3 rounded-2xl bg-[#F8FBFD] p-4 sm:grid-cols-3">

                    <div>

                      <div className="text-xs font-bold text-[#60798A]">
                        الاسم
                      </div>

                      <div className="mt-1 font-black">
                        {name ||
                          'غير مكتمل'}
                      </div>

                    </div>

                    <div>

                      <div className="text-xs font-bold text-[#60798A]">
                        التليفون
                      </div>

                      <div
                        dir="ltr"
                        className="mt-1 text-right font-black"
                      >
                        {phone ||
                          'غير مكتمل'}
                      </div>

                    </div>

                    <div>

                      <div className="text-xs font-bold text-[#60798A]">
                        الواتساب
                      </div>

                      <div
                        dir="ltr"
                        className="mt-1 text-right font-black"
                      >
                        {whatsapp ||
                          'غير مكتمل'}
                      </div>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={
                      handleBooking
                    }
                    disabled={
                      booking
                    }
                    className="w-full rounded-2xl bg-[#25D366] px-7 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#1DA851] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {booking
                      ? 'جاري تأكيد الحجز...'
                      : 'تأكيد الحجز عبر واتساب 💬'}

                  </button>

                </div>

              </div>

            </div>

          )}

      </div>

    </main>

  )
}