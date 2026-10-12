'use client'

import React, { useEffect, useMemo, useState } from 'react'

/* =========================================================
   إعدادات الفروع وروابط Google Apps Script
========================================================= */

const BRANCH_CONFIG = {
  shobra: {
    name: 'شبرا مصر',
    scriptUrl:
      'https://script.google.com/macros/s/AKfycbxRuRHJuWsXM70bLEcX218w08yvD7pKaKVSk2srUNjDZQ3yJ9liKEgTqg00_G2d9J3Q/exec',
    address:
      'تقاطع خلوصي مع الترعة البولاقية أمام مدرسة رمسيس. شبرا، 3 دقائق من مترو روض الفرج.',
    mapUrl: 'https://maps.app.goo.gl/FNrmpeFMkCua4jjn7',
    whatsapp: '201281441562',
  },

  'nasr-city': {
    name: 'مدينة نصر',
    scriptUrl:
      'https://script.google.com/macros/s/AKfycbxnvxSTY8R3zLczBUTVqcyejOIfTGDxiwuWjNC4KxGzlwhycB0owkdZuZvJ909Nl1rReg/exec',
    address:
      '46 شارع محمد النادي، مصطفى النحاس، محطة الهيثم، بجوار ماركت بيم.',
    mapUrl: 'https://bit.ly/3wfo32Z',
    whatsapp: '201281441562',
  },

  helmeya: {
    name: 'حلمية الزيتون',
    scriptUrl:
      'https://script.google.com/macros/s/AKfycbwj20x_nu82HB4ubowF0uXQ_gwAXSroY5IlZpp8T1JFUhv5dVc-FEze4OloKOZSAFjE/exec',
    address:
      'ميدان حلمية الزيتون، أعلى عصير أفوكادو وبجوار بنزينة التعاون.',
    mapUrl: 'https://bit.ly/3Fwsw5F',
    whatsapp: '201281441562',
  },

  maadi: {
    name: 'المعادي',
    scriptUrl: '',
    address:
      '101 شارع 9 المعادي، أمام البنك الأهلي وبجوار مترو المعادي.',
    mapUrl: 'https://bit.ly/3RPH9X6',
    whatsapp: '201115504662',
  },

  'el-obour': {
    name: 'العبور',
    scriptUrl:
      'https://script.google.com/macros/s/AKfycbwqXpH5ZryTDONnHsiJYzHEqzY_5VrhXlbByiU05tablYosyGb5dLcOAZggIXQ0ZW-CXQ/exec',
    address:
      'العبور، الحي السادس، قطعة 52، الدور الثاني، أعلى ميديكال هاوس.',
    mapUrl: 'https://goo.gl/maps/QWJj7f1dmQVQp3cH9',
    whatsapp: '201281441562',
  },

  october: {
    name: '6 أكتوبر',
    scriptUrl:
      'https://script.google.com/macros/s/AKfycbxTYJNyRCd-v1GpziWQa8JZbT0T5YWCbU09fFntU9PvLQBmwD5f2l7UPA9C_pw3mTuHvg/exec',
    address:
      'ميدان الحصري، عمارة 3، المحور المركزي، أعلى راية ستور، الدور الثالث.',
    mapUrl: 'https://maps.app.goo.gl/4dN6EwYtuespmcTw8',
    whatsapp: '201281441562',
  },

  fayoum: {
    name: 'الفيوم',
    scriptUrl: '',
    address:
      'أمام المستشفى العام، باب الشؤون الصحية بالمستشفى، برج الأطباء، مدخل الإداري الثاني، الدور الثالث.',
    mapUrl: 'https://maps.app.goo.gl/M6GGZbRPNjLa2qyk7',
    whatsapp: '201553394429',
  },

  haram: {
    name: 'الهرم',
    scriptUrl:
      'https://script.google.com/macros/s/AKfycbyzbQBnfSsdyvxN6UQ-N3udD_hHPH1OA7xvh6wGI3FG20tvJ64lp5QYhlI4kw1j4qKiKQ/exec',
    address:
      '236 شارع الهرم، بجوار سنترال الهرم، الدور الثالث، شقة 6.',
    mapUrl:
      'https://maps.app.goo.gl/AWumxoRCiRcfJaoq6?g_st=aw',
    whatsapp: '201281441562',
  },
} as const

type BranchId = keyof typeof BRANCH_CONFIG
type BranchChoice = BranchId | ''

type Slot = {
  sheetName: string
  row: number
  date: string
  day: string
  time: string
  booked: boolean
}

const BRANCHES: { id: BranchId; name: string }[] = [
  { id: 'shobra', name: 'شبرا مصر' },
  { id: 'nasr-city', name: 'مدينة نصر' },
  { id: 'helmeya', name: 'حلمية الزيتون' },
  { id: 'maadi', name: 'المعادي' },
  { id: 'el-obour', name: 'العبور' },
  { id: 'october', name: '6 أكتوبر' },
  { id: 'fayoum', name: 'الفيوم' },
  { id: 'haram', name: 'الهرم' },
]

function isDirectWhatsAppBranch(
  branchId: BranchChoice
): boolean {
  return branchId === 'maadi' || branchId === 'fayoum'
}

export default function BookingPage() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [branch, setBranch] = useState<BranchChoice>('')

  const [health, setHealth] = useState('')
  const [medicines, setMedicines] = useState('')
  const [notes, setNotes] = useState('')

  const [selectedSlot, setSelectedSlot] =
    useState<Slot | null>(null)

  const [booking, setBooking] = useState(false)
  const [success, setSuccess] = useState(false)

  const isWhatsAppBranch =
    isDirectWhatsAppBranch(branch)

  const currentBranch = useMemo(() => {
    if (!branch) return null
    return BRANCH_CONFIG[branch]
  }, [branch])

  /* قراءة البيانات من الرابط */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    )

    setName(params.get('name') || '')
    setPhone(params.get('phone') || '')
    setWhatsapp(params.get('whatsapp') || '')
    setHealth(params.get('health') || '')
    setMedicines(params.get('medicines') || '')
    setNotes(params.get('notes') || '')

    const urlBranch = params.get('branch') || ''

    if (
      Object.prototype.hasOwnProperty.call(
        BRANCH_CONFIG,
        urlBranch
      )
    ) {
      setBranch(urlBranch as BranchId)
    }
  }, [])

  /* تحميل المواعيد للفروع المرتبطة بالنظام */

  useEffect(() => {
    setSlots([])
    setSelectedSlot(null)
    setError('')

    if (!branch || isDirectWhatsAppBranch(branch)) {
      setLoading(false)
      return
    }

    const config = BRANCH_CONFIG[branch]
    let cancelled = false

    async function loadSlots() {
      try {
        setLoading(true)

        if (!config.scriptUrl) {
          throw new Error(
            `فرع ${config.name} غير مربوط بنظام المواعيد حاليًا.`
          )
        }

        const response = await fetch(
          config.scriptUrl,
          {
            method: 'GET',
            cache: 'no-store',
          }
        )

        if (!response.ok) {
          throw new Error(
            'تعذر الاتصال بنظام المواعيد.'
          )
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(
            data.error || 'تعذر تحميل المواعيد.'
          )
        }

        if (!cancelled) {
          setSlots(
            Array.isArray(data.slots)
              ? data.slots
              : []
          )
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'حدث خطأ أثناء تحميل المواعيد.'
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadSlots()

    return () => {
      cancelled = true
    }
  }, [branch])

  /* تنسيق التاريخ */

  const formatDate = (date: string) => {
    if (!date) return ''

    const parsed = new Date(
      `${date}T00:00:00`
    )

    if (Number.isNaN(parsed.getTime())) {
      return date
    }

    return parsed.toLocaleDateString(
      'ar-EG',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    )
  }

  /* المواعيد المتاحة */

  const availableSlots = useMemo(
    () => slots.filter((slot) => !slot.booked),
    [slots]
  )

  const groupedSlots = useMemo(() => {
    const groups: Record<
      string,
      {
        date: string
        day: string
        slots: Slot[]
      }
    > = {}

    const getHourKey = (time: string) => {
      const value = time.trim().toUpperCase()
      const match = value.match(/^(\d{1,2})\s*:/)

      if (!match) return value

      let hour = Number(match[1])

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

    availableSlots.forEach((slot) => {
      const key = `${slot.date}-${slot.day}`

      if (!groups[key]) {
        groups[key] = {
          date: slot.date,
          day: slot.day,
          slots: [],
        }
      }

      const alreadyShown =
        groups[key].slots.some(
          (existing) =>
            getHourKey(existing.time) ===
            getHourKey(slot.time)
        )

      if (!alreadyShown) {
        groups[key].slots.push(slot)
      }
    })

    Object.values(groups).forEach((group) => {
      group.slots.sort((a, b) =>
        a.time.localeCompare(b.time)
      )
    })

    return Object.values(groups).sort(
      (a, b) => a.date.localeCompare(b.date)
    )
  }, [availableSlots])

  /* التحقق من البيانات */

  const validateForm = () => {
    if (!name.trim()) {
      return 'من فضلك اكتب الاسم بالكامل.'
    }

    if (!phone.trim()) {
      return 'من فضلك اكتب رقم التليفون.'
    }

    if (!whatsapp.trim()) {
      return 'من فضلك اكتب رقم الواتساب.'
    }

    if (!branch) {
      return 'من فضلك اختر الفرع.'
    }

    if (
      !isDirectWhatsAppBranch(branch) &&
      !selectedSlot
    ) {
      return 'من فضلك اختر موعد الكشف.'
    }

    return ''
  }

  /* فتح واتساب لطلب حجز المعادي والفيوم */

  const openWhatsAppBookingRequest = (
    branchId: BranchId
  ) => {
    const config = BRANCH_CONFIG[branchId]

    const message = `
السلام عليكم ورحمة الله وبركاته 🌷

عايز/ة أحجز كشف مع د. محمد رحيم.

📍 الفرع: ${config.name}

👤 الاسم: ${name.trim()}
📞 رقم التليفون: ${phone.trim()}
📱 رقم الواتساب: ${whatsapp.trim()}

🩺 الحالة الصحية:
${health.trim() || 'لم يتم تحديدها'}

💊 الأدوية المستخدمة:
${medicines.trim() || 'لم يتم تحديدها'}

📝 ملاحظات:
${notes.trim() || 'لا توجد'}

📌 عنوان الفرع:
${config.address}

📍 لوكيشن الفرع:
${config.mapUrl}

من فضلكم، أريد معرفة أقرب موعد متاح وتأكيد الحجز.
    `.trim()

    window.location.href =
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`
  }

  /* تأكيد الحجز */

  const handleBooking = async () => {
    setError('')

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    if (!branch) return

    if (isDirectWhatsAppBranch(branch)) {
      openWhatsAppBookingRequest(branch)
      return
    }

    if (!selectedSlot) return

    const branchId: BranchId = branch
    const config = BRANCH_CONFIG[branchId]

    if (!config.scriptUrl) {
      setError(
        `فرع ${config.name} غير مربوط بنظام الحجز حاليًا.`
      )
      return
    }

    try {
      setBooking(true)

      const response = await fetch(
        config.scriptUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            sheetName: selectedSlot.sheetName,
            row: selectedSlot.row,
            name: name.trim(),
            phone: phone.trim(),
            whatsapp: whatsapp.trim(),
            health: health.trim(),
            medicines: medicines.trim(),
            notes: notes.trim(),
            branch: branchId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          'تعذر الاتصال بنظام الحجز.'
        )
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(
          data.error || 'تعذر تأكيد الحجز.'
        )
      }

      /* رسالة النجاح تظهر بعد تأكيد السيرفر */

      setSuccess(true)

      const message = `
أهلًا بحضرتك 🌷

تم حجز الكشف بنجاح مع د. محمد رحيم ❤️

📍 الفرع:
${config.name}

🗓️ يوم وتاريخ الكشف:
${formatDate(selectedSlot.date)}

🕐 الساعة:
${selectedSlot.time}

👤 الاسم:
${name.trim()}

📞 رقم التليفون:
${phone.trim()}

📱 رقم الواتساب:
${whatsapp.trim()}

📌 عنوان الفرع:
${config.address}

📍 لوكيشن الفرع:
${config.mapUrl}

نتمنى لحضرتك دوام الصحة والعافية 🌹
      `.trim()

      const whatsappUrl =
        `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`

      window.setTimeout(() => {
        window.location.href = whatsappUrl
      }, 1500)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'حدث خطأ أثناء تأكيد الحجز.'
      )
    } finally {
      setBooking(false)
    }
  }

  /* شاشة النجاح */

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
              تم حجز الكشف بنجاح
            </h1>

            <p className="mt-4 text-lg leading-8 text-[#60798A]">
              تم تسجيل حجزك بنجاح. سيتم تحويلك إلى واتساب
              لإرسال تفاصيل الموعد وعنوان الفرع واللوكيشن.
            </p>

            {selectedSlot && currentBranch && (
              <div className="mt-6 rounded-2xl bg-[#F8FBFD] p-5">
                <p className="font-bold">
                  {currentBranch.name}
                </p>

                <p className="mt-2">
                  {formatDate(selectedSlot.date)}
                </p>

                <p className="mt-1 font-black text-[#2F80B7]">
                  الساعة {selectedSlot.time}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    )
  }

  /* واجهة الحجز */

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FBFD] px-4 py-10 text-[#183B56]"
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <header className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full bg-[#EAF6FC] px-5 py-2 text-sm font-bold text-[#2F80B7]">
            الكشف العادي
          </div>

          <h1 className="text-3xl font-black sm:text-5xl">
            احجز موعد الكشف
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#60798A]">
            أدخل بياناتك واختار الفرع والموعد المناسب.
          </p>
        </header>

        {/* FORM */}

        <section className="mx-auto mb-8 max-w-4xl rounded-[32px] border border-[#DCEAF3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-2 text-2xl font-black">
            👤 بيانات الحجز
          </h2>

          <p className="mb-8 leading-7 text-[#60798A]">
            البيانات الأساسية مطلوبة، والمعلومات الطبية اختيارية.
          </p>

          <div className="space-y-6">

            {/* الاسم */}

            <div>
              <label className="mb-2 block font-bold">
                الاسم بالكامل *
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اكتب الاسم بالكامل"
                required
                className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 outline-none focus:border-[#2F80B7]"
              />
            </div>

            {/* التليفون */}

            <div>
              <label className="mb-2 block font-bold">
                رقم التليفون *
              </label>

              <input
                type="tel"
                dir="ltr"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                required
                className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 text-left outline-none focus:border-[#2F80B7]"
              />
            </div>

            {/* الواتساب */}

            <div>
              <label className="mb-2 block font-bold">
                رقم الواتساب *
              </label>

              <input
                type="tel"
                dir="ltr"
                inputMode="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="01xxxxxxxxx"
                required
                className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 text-left outline-none focus:border-[#2F80B7]"
              />
            </div>

            {/* الفرع */}

            <div>
              <label className="mb-2 block font-bold">
                اختر الفرع *
              </label>

              <select
                value={branch}
                required
                onChange={(e) => {
                  setBranch(e.target.value as BranchChoice)
                  setSelectedSlot(null)
                  setSlots([])
                  setError('')
                  setSuccess(false)
                }}
                className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 outline-none focus:border-[#2F80B7]"
              >
                <option value="">اختر الفرع</option>

                {BRANCHES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* الحالة الصحية */}

            <div>
              <label className="mb-2 block font-bold">
                الحالة الصحية (اختياري)
              </label>

              <textarea
                value={health}
                onChange={(e) => setHealth(e.target.value)}
                placeholder="أي معلومات صحية تحب الطبيب يعرفها..."
                rows={4}
                className="w-full resize-none rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 leading-7 outline-none focus:border-[#2F80B7]"
              />
            </div>

            {/* الأدوية */}

            <div>
              <label className="mb-2 block font-bold">
                الأدوية المستخدمة حاليًا (اختياري)
              </label>

              <textarea
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
                placeholder="أسماء الأدوية إن وجدت..."
                rows={3}
                className="w-full resize-none rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 leading-7 outline-none focus:border-[#2F80B7]"
              />
            </div>

            {/* الملاحظات */}

            <div>
              <label className="mb-2 block font-bold">
                ملاحظات إضافية (اختياري)
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أي ملاحظات أخرى..."
                rows={3}
                className="w-full resize-none rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 leading-7 outline-none focus:border-[#2F80B7]"
              />
            </div>
          </div>
        </section>

        {/* ERROR */}

        {error && (
          <div className="mx-auto mb-8 max-w-4xl rounded-2xl border border-[#F3C2C8] bg-[#FFF5F6] p-4 font-bold text-[#C83D4B]">
            ⚠️ {error}
          </div>
        )}

        {/* LOADING */}

        {loading && currentBranch && (
          <div className="rounded-[28px] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#DCEAF3] border-t-[#2F80B7]" />

            <p className="mt-5 font-bold text-[#60798A]">
              جاري تحميل مواعيد {currentBranch.name}...
            </p>
          </div>
        )}

        {/* بدون فرع */}

        {!branch && (
          <div className="rounded-[28px] bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">📍</div>

            <h2 className="mt-5 text-2xl font-black">
              اختر الفرع أولًا
            </h2>

            <p className="mt-3 text-[#60798A]">
              بعد اختيار الفرع ستظهر طريقة الحجز المناسبة له.
            </p>
          </div>
        )}

        {/* المعادي والفيوم: طلب حجز عبر واتساب */}

        {!loading &&
          currentBranch &&
          isWhatsAppBranch && (
            <section className="mx-auto max-w-4xl rounded-[28px] border border-[#BCE8CD] bg-white p-6 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F9EF] text-3xl">
                💬
              </div>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                احجز في فرع {currentBranch.name} عبر واتساب
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#60798A]">
                اضغط لإرسال بياناتك للفرع ومعرفة أقرب موعد متاح.
                سيتم تأكيد الموعد من الفرع نفسه.
              </p>

              <button
                type="button"
                onClick={handleBooking}
                className="mt-7 w-full rounded-2xl bg-[#25D366] px-7 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#1DA851] sm:w-auto"
              >
                التواصل مع فرع {currentBranch.name} على واتساب 💬
              </button>
            </section>
          )}

        {/* لا توجد مواعيد */}

        {!loading &&
          !error &&
          currentBranch &&
          !isWhatsAppBranch &&
          groupedSlots.length === 0 && (
            <div className="rounded-[28px] bg-white p-10 text-center shadow-sm">
              <div className="text-4xl">📅</div>

              <h2 className="mt-5 text-2xl font-black">
                لا توجد مواعيد متاحة حاليًا
              </h2>

              <p className="mt-3 text-[#60798A]">
                يرجى المحاولة مرة أخرى لاحقًا.
              </p>
            </div>
          )}

        {/* المواعيد */}

        {!loading &&
          !error &&
          currentBranch &&
          !isWhatsAppBranch &&
          groupedSlots.length > 0 && (
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-black">
                  📅 اختر موعد الكشف *
                </h2>

                <p className="mt-2 text-[#60798A]">
                  المواعيد المتاحة في فرع {currentBranch.name}
                </p>
              </div>

              <div className="space-y-8">
                {groupedSlots.map((group) => (
                  <section
                    key={`${group.date}-${group.day}`}
                    className="rounded-[28px] border border-[#DCEAF3] bg-white p-6 shadow-sm sm:p-8"
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-black">
                        {group.day}
                      </h3>

                      <p className="mt-1 text-[#60798A]">
                        {formatDate(group.date)}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {group.slots.map((slot) => (
                        <button
                          key={`${slot.sheetName}-${slot.row}`}
                          type="button"
                          onClick={() => {
                            setSelectedSlot(slot)
                            setError('')
                          }}
                          className={`rounded-2xl border-2 px-4 py-4 text-center font-black transition ${
                            selectedSlot?.row === slot.row &&
                            selectedSlot?.sheetName === slot.sheetName
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
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}

        {/* تأكيد الحجز */}

        {selectedSlot && !isWhatsAppBranch && (
          <div className="sticky bottom-4 z-20 mt-8">
            <div className="mx-auto max-w-3xl rounded-[28px] border border-[#DCEAF3] bg-white p-5 shadow-2xl sm:p-6">
              <div className="mb-5">
                <div className="text-sm font-bold text-[#60798A]">
                  الموعد المختار
                </div>

                <div className="mt-1 text-xl font-black">
                  {formatDate(selectedSlot.date)}
                </div>

                <div className="mt-1 font-bold text-[#2F80B7]">
                  {selectedSlot.day} — {selectedSlot.time}
                </div>
              </div>

              <div className="mb-5 grid gap-3 rounded-2xl bg-[#F8FBFD] p-4 sm:grid-cols-3">
                <div>
                  <div className="text-xs font-bold text-[#60798A]">
                    الاسم
                  </div>

                  <div className="mt-1 font-black">
                    {name || 'غير مكتمل'}
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
                    {phone || 'غير مكتمل'}
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
                    {whatsapp || 'غير مكتمل'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBooking}
                disabled={booking}
                className="w-full rounded-2xl bg-[#25D366] px-7 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#1DA851] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {booking
                  ? 'جاري تأكيد الحجز...'
                  : 'تأكيد الحجز عبر واتساب 💬'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}