'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  BOOKING_BRANCHES,
  isDateBasedBranch,
  isDirectWhatsAppBranch,
  type BranchId,
} from '../../../lib/booking-config'

type Slot = {
  sheetName: string
  row: number
  date: string
  day: string
  startTime: string
  slotId?: string
  status?: string
}

type BranchConfig = {
  name: string
  address: string
  mapUrl: string
  whatsapp: string
}

const BRANCH_CONFIG: Record<BranchId, BranchConfig> = {
  helmiya: {
    name: 'الحلمية',
    address: 'الحلمية الزيتون، بجوار بنك مصر، شارع محمد فوزي.',
    mapUrl: 'https://maps.google.com',
    whatsapp: '201281441562',
  },
  nasr: {
    name: 'مدينة نصر',
    address: 'مدينة نصر، شارع الشهيد، بجوار مدخل المنطقة السكنية.',
    mapUrl: 'https://maps.google.com',
    whatsapp: '201281441562',
  },
  obour: {
    name: 'العبور',
    address: 'العبور، شارع المركز الطبي، أعلى كشك الصيدلية.',
    mapUrl: 'https://maps.google.com',
    whatsapp: '201281441562',
  },
  haram: {
    name: 'الهرم',
    address: 'الهرم، شارع الهرم، بجوار سنترال الهرم.',
    mapUrl: 'https://maps.google.com',
    whatsapp: '201281441562',
  },
  maadi: {
    name: 'المعادي',
    address: 'المعادي، شارع 9، أمام البنك الأهلي.',
    mapUrl: 'https://bit.ly/3RPH9X6',
    whatsapp: '201115504662',
  },
  fayoum: {
    name: 'الفيوم',
    address: 'الفيوم، أمام المستشفى العام، المدخل الثاني.',
    mapUrl: 'https://maps.app.goo.gl/M6GGZbRPNjLa2qyk7',
    whatsapp: '201553394429',
  },
  shobra: {
    name: 'شبرا مصر',
    address: 'تقاطع خلوصي مع الترعة البولاقية أمام مدرسة رمسيس. شبرا 3 دقائق من مترو روض الفرج.',
    mapUrl: 'https://maps.app.goo.gl/FNrmpeFMkCua4jjn7',
    whatsapp: '201281441562',
  },
  october: {
    name: '6 أكتوبر',
    address: 'ميدان الحصري عمارة 3 المحور المركزي أعلى راية ستور الدور الثالث ميدان الحصري.',
    mapUrl: 'https://maps.app.goo.gl/4dN6EwYtuespmcTw8',
    whatsapp: '201281441562',
  },
}

const BRANCHES: Array<{ id: BranchId; name: string }> = [
  { id: 'helmiya', name: 'الحلمية' },
  { id: 'nasr', name: 'مدينة نصر' },
  { id: 'obour', name: 'العبور' },
  { id: 'haram', name: 'الهرم' },
  { id: 'maadi', name: 'المعادي' },
  { id: 'fayoum', name: 'الفيوم' },
  { id: 'shobra', name: 'شبرا مصر' },
  { id: 'october', name: '6 أكتوبر' },
]

function formatDate(date: string): string {
  if (!date) return ''

  const parsed = new Date(`${dateSortKey(date)}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString('ar-EG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatWeekday(date: string): string {
  const parsed = new Date(`${dateSortKey(date)}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('ar-EG', { weekday: 'long' })
}

function dateSortKey(date: string): string {
  const dayFirstDate = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)

  if (!dayFirstDate) return date

  const [, day, month, year] = dayFirstDate
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addCalendarMonths(date: Date, months: number): Date {
  const result = new Date(date)
  const day = result.getDate()
  result.setDate(1)
  result.setMonth(result.getMonth() + months)
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate()
  result.setDate(Math.min(day, lastDay))
  return result
}

function buildUpcomingDates(startFrom: Date, throughDate: Date, weekday: number): string[] {
  const dates: string[] = []
  const base = new Date(startFrom)

  const daysUntil = (weekday - base.getDay() + 7) % 7
  base.setDate(base.getDate() + daysUntil)

  while (base <= throughDate) {
    dates.push(toLocalDateKey(base))
    base.setDate(base.getDate() + 7)
  }

  return dates
}

function timeSortKey(time: string): number {
  const match = time.trim().match(/^(?<hour>\d{1,2}):(?<minute>\d{2})(?:\s*(?<period>AM|PM))?$/i)
  if (!match?.groups) return Number.MAX_SAFE_INTEGER

  let hour = Number(match.groups.hour)
  const minute = Number(match.groups.minute)
  const period = match.groups.period?.toUpperCase()

  if (period === 'PM' && hour !== 12) hour += 12
  if (period === 'AM' && hour === 12) hour = 0
  return hour * 60 + minute
}

function formatPhone(value: string): string {
  return value.replace(/\s+/g, '').trim()
}

export default function BookingPage() {
  const [branch, setBranch] = useState<BranchId | ''>('')
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [health, setHealth] = useState('')
  const [medicines, setMedicines] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const currentBranch = useMemo(() => {
    if (!branch) return null
    return BRANCH_CONFIG[branch]
  }, [branch])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const loadName = params.get('name') ?? ''
    const loadPhone = params.get('phone') ?? ''
    const loadWhatsapp = params.get('whatsapp') ?? ''
    const loadHealth = params.get('health') ?? ''
    const loadMedicines = params.get('medicines') ?? ''
    const loadNotes = params.get('notes') ?? ''
    const selectedBranch = params.get('branch') ?? ''

    setName(loadName)
    setPhone(loadPhone)
    setWhatsapp(loadWhatsapp)
    setHealth(loadHealth)
    setMedicines(loadMedicines)
    setNotes(loadNotes)

    if (selectedBranch && Object.prototype.hasOwnProperty.call(BRANCH_CONFIG, selectedBranch)) {
      setBranch(selectedBranch as BranchId)
    }
  }, [])

  useEffect(() => {
    if (!branch) {
      setSlots([])
      setSelectedSlot(null)
      setError('')
      return
    }

    if (isDirectWhatsAppBranch(branch)) {
      setSlots([])
      setSelectedSlot(null)
      setError('')
      return
    }

    const activeBranch = branch
    let cancelled = false

    async function loadSlots() {
      setLoading(true)
      setError('')
      setSlots([])
      setSelectedSlot(null)

      try {
        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)
        const endDate = addCalendarMonths(startDate, 2)
        const rangeStart = toLocalDateKey(startDate)
        const rangeEnd = toLocalDateKey(endDate)
        const isDateBranch = isDateBasedBranch(activeBranch)
        const branchConfig = BOOKING_BRANCHES[activeBranch]
        const weekday = 'scheduleWeekday' in branchConfig
          ? branchConfig.scheduleWeekday
          : undefined

        if (isDateBranch && weekday === undefined) {
          throw new Error('لم يتم تحديد يوم مواعيد هذا الفرع.')
        }

        const dates = isDateBranch
          ? buildUpcomingDates(startDate, endDate, weekday as number)
          : [undefined]
        const slotResponses = await Promise.allSettled(
          dates.map(async (date) => {
            const params = new URLSearchParams({ branch: activeBranch })
            if (date) params.set('date', date)

            const response = await fetch(`/api/booking/slots?${params.toString()}`, {
              cache: 'no-store',
            })
            const data: {
              success?: boolean
              message?: string
              slots?: Array<Record<string, unknown>>
            } = await response.json()

            if (!response.ok || !data.success) {
              throw new Error(data.message ?? 'تعذر تحميل المواعيد.')
            }

            return data.slots ?? []
          }),
        )

        const successfulResponses = slotResponses.filter(
          (result): result is PromiseFulfilledResult<Array<Record<string, unknown>>> =>
            result.status === 'fulfilled',
        )
        const failedResponses = slotResponses.filter(
          (result): result is PromiseRejectedResult => result.status === 'rejected',
        )

        if (successfulResponses.length === 0 && failedResponses.length > 0) {
          throw failedResponses[0].reason
        }

        const rawSlots = successfulResponses.flatMap((result) => result.value)
        const mappedSlots: Slot[] = rawSlots
          .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
          .map((item, index) => {
            const slotDate = String(item.date ?? '').trim()
            const slotTime = String(item.startTime ?? item.time ?? '').trim()
            const day = String(item.day ?? '').trim()
            const sheetName = String(item.sheetName ?? '').trim()
            const row = Number(item.row ?? index + 2)
            const slotId = item.slotId ? String(item.slotId) : undefined
            const status = String(item.status ?? '').trim()

            return {
              sheetName,
              row: Number.isFinite(row) ? row : index + 2,
              date: slotDate,
              day,
              startTime: slotTime,
              slotId,
              status,
            }
          })
          .filter((slot) => {
            const dateKey = dateSortKey(slot.date)
            return slot.date &&
              slot.startTime &&
              slot.status === 'متاح' &&
              dateKey >= rangeStart &&
              dateKey <= rangeEnd
          })

        if (!cancelled) {
          setSlots(mappedSlots)
          if (failedResponses.length > 0) {
            setError('تعذر تحميل بعض تواريخ المواعيد. المواعيد التي تم تحميلها معروضة أدناه.')
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل المواعيد.')
          setSlots([])
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

  const groupedSlots = useMemo(() => {
    const groups: Record<string, { date: string; day: string; slots: Slot[] }> = {}

    slots.forEach((slot) => {
      const key = `${slot.date}-${slot.day || 'غير محدد'}`

      if (!groups[key]) {
        groups[key] = { date: slot.date, day: slot.day || formatWeekday(slot.date), slots: [] }
      }

      const alreadyExists = groups[key].slots.some(
        (existing) => existing.startTime === slot.startTime
      )

      if (!alreadyExists) {
        groups[key].slots.push(slot)
      }
    })

    const sortedGroups = Object.values(groups)
    sortedGroups.forEach((group) => {
      group.slots.sort((first, second) => timeSortKey(first.startTime) - timeSortKey(second.startTime))
    })

    return sortedGroups.sort((a, b) =>
      dateSortKey(a.date).localeCompare(dateSortKey(b.date))
    )
  }, [slots])

  const selectedGroup = groupedSlots.find((group) => group.date === selectedDate)

  const validateForm = (): string => {
    if (!name.trim()) return 'من فضلك اكتب الاسم بالكامل.'

    if (!phone.trim()) return 'من فضلك اكتب رقم الهاتف.'
    if (!/^\+?[0-9\s-]{8,15}$/.test(formatPhone(phone))) {
      return 'رقم الهاتف غير صحيح. استخدم أرقام فقط.'
    }

    if (!whatsapp.trim()) return 'من فضلك اكتب رقم واتساب.'
    if (!/^\+?[0-9\s-]{8,15}$/.test(formatPhone(whatsapp))) {
      return 'رقم واتساب غير صحيح. استخدم أرقام فقط.'
    }

    if (!branch) return 'من فضلك اختر الفرع.'

    if (!isDirectWhatsAppBranch(branch) && !selectedSlot) {
      return 'من فضلك اختر موعد الكشف أولًا.'
    }

    return ''
  }

  const openWhatsAppBranch = (branchId: BranchId) => {
    const config = BRANCH_CONFIG[branchId]
    const message = [
      'السلام عليكم ورحمة الله وبركاته 🌷',
      '',
      'أرغب في حجز كشف مع د. محمد رحيم.',
      '',
      `الفرع: ${config.name}`,
      `الاسم: ${name.trim()}`,
      `رقم الهاتف: ${phone.trim()}`,
      `رقم الواتساب: ${whatsapp.trim()}`,
      '',
      `الحالة الصحية: ${health.trim() || 'غير محددة'}`,
      `الأدوية: ${medicines.trim() || 'غير محددة'}`,
      `ملاحظات: ${notes.trim() || 'لا يوجد'}`,
      '',
      `عنوان الفرع: ${config.address}`,
      `الموقع: ${config.mapUrl}`,
      '',
      'أرغب في معرفة الموعد المتاح والتأكيد عليه.',
    ].join('\n')

    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`
    window.location.href = url
  }

  const handleBooking = async () => {
    const validationMessage = validateForm()

    if (validationMessage) {
      setError(validationMessage)
      return
    }

    if (!branch) return

    if (isDirectWhatsAppBranch(branch)) {
      openWhatsAppBranch(branch)
      return
    }

    if (!selectedSlot) {
      setError('من فضلك اختر موعد الكشف أولًا.')
      return
    }

    setBooking(true)
    setError('')

    try {
      const payload = {
        branch,
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        sheetName: selectedSlot.sheetName,
        row: selectedSlot.row,
        slotId: selectedSlot.slotId ?? '',
        customerName: name.trim(),
        phone: formatPhone(phone),
        whatsapp: formatPhone(whatsapp),
        health: health.trim(),
        medicines: medicines.trim(),
        notes: notes.trim(),
      }

      const response = await fetch('/api/booking/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
      })

      const result: { success?: boolean; message?: string } = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? 'تعذر تأكيد الحجز.')
      }

      setSuccess(true)

      const successMessage = [
        'أهلًا بك 🌷',
        '',
        'تم حجز الكشف بنجاح مع د. محمد رحيم.',
        '',
        `الفرع: ${currentBranch?.name ?? branch}`,
        `التاريخ: ${formatDate(selectedSlot.date)}`,
        `الموعد: ${selectedSlot.startTime}`,
        `الاسم: ${name.trim()}`,
        `رقم الهاتف: ${formatPhone(phone)}`,
        `رقم واتساب: ${formatPhone(whatsapp)}`,
        '',
        `العنوان: ${currentBranch?.address ?? ''}`,
        `الموقع: ${currentBranch?.mapUrl ?? ''}`,
      ].join('\n')

      const whatsappUrl = `https://wa.me/${currentBranch?.whatsapp ?? '201281441562'}?text=${encodeURIComponent(successMessage)}`
      window.setTimeout(() => {
        window.location.href = whatsappUrl
      }, 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تأكيد الحجز.')
    } finally {
      setBooking(false)
    }
  }

  if (success) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#F7FAFC] px-4 py-12 text-slate-800">
        <div className="mx-auto max-w-xl">
          <div className="rounded-[32px] bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-4xl">
              ✓
            </div>
            <h1 className="mt-6 text-3xl font-black text-slate-800">تم حجز الكشف بنجاح</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              تم تسجيل الطلب بنجاح، وسيتم تحويلك إلى واتساب لإرسال تفاصيل الموعد والفرع.
            </p>

            {selectedSlot && currentBranch && (
              <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-right">
                <p className="font-bold text-slate-700">{currentBranch.name}</p>
                <p className="mt-2 text-slate-600">{formatDate(selectedSlot.date)}</p>
                <p className="mt-1 font-black text-sky-700">{selectedSlot.startTime}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#F7FAFC] px-4 py-8 text-slate-800 md:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
            حجز الكشف
          </div>
          <h1 className="text-3xl font-black text-slate-800 md:text-5xl">احجز موعدك بسهولة</h1>
          <p className='mt-4 text-base text-slate-600 md:text-lg'>اختر فرعك، ثم أدخل بياناتك لتأكيد الحجز.</p>
        </header>

        <section className="mx-auto max-w-4xl rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">اسم المريض</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="اكتب الاسم بالكامل"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">رقم الهاتف</label>
              <input
                dir="ltr"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="01xxxxxxxxx"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">رقم واتساب</label>
              <input
                dir="ltr"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                placeholder="01xxxxxxxxx"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">اختر الفرع</label>
              <select
                value={branch}
                onChange={(event) => {
                  const nextBranch = event.target.value as BranchId
                  setBranch(nextBranch)
                  setSelectedSlot(null)
                  setError('')
                  setSuccess(false)
                  setSelectedDate('')
                }}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
              >
                <option value="">اختر الفرع</option>
                {BRANCHES.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">الحالة الصحية</label>
              <textarea
                value={health}
                onChange={(event) => setHealth(event.target.value)}
                rows={3}
                placeholder="اكتب أي ملاحظات صحية إن وجدت"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">الأدوية المستخدمة</label>
              <textarea
                value={medicines}
                onChange={(event) => setMedicines(event.target.value)}
                rows={3}
                placeholder="اكتب أسماء الأدوية إن وجدت"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">ملاحظات إضافية</label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                placeholder="أي ملاحظات أخرى"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {error && (
          <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            ⚠️ {error}
          </div>
        )}

        {branch && !isDirectWhatsAppBranch(branch) && groupedSlots.length > 0 && (
          <section className="mx-auto mt-8 max-w-4xl rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-8">
            <h2 className="mb-4 text-2xl font-black text-slate-800">اختر التاريخ</h2>

            <div className="flex flex-wrap gap-3">
              {groupedSlots.map((group) => (
                <button
                  key={`${group.date}-${group.day}`}
                  type="button"
                  onClick={() => {
                    setSelectedDate(group.date)
                    setSelectedSlot(null)
                    setError('')
                  }}
                  aria-pressed={selectedDate === group.date}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    selectedDate === group.date
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {formatDate(group.date)}
                </button>
              ))}
            </div>
          </section>
        )}

        {branch && isDirectWhatsAppBranch(branch) && (
          <section className="mx-auto mt-8 max-w-4xl rounded-[28px] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              💬
            </div>
            <h2 className="mt-5 text-2xl font-black text-slate-800">فرع {currentBranch?.name}</h2>
            <p className="mt-3 text-slate-600">
              قم بإرسال بياناتك مباشرة إلى واتساب الفرع، وسيتم تأكيد الموعد من الإدارة.
            </p>
            <button
              type="button"
              onClick={() => openWhatsAppBranch(branch)}
              className="mt-6 rounded-2xl bg-emerald-500 px-6 py-3 text-base font-black text-white shadow-lg transition hover:bg-emerald-600"
            >
              التواصل مع فرع {currentBranch?.name} على واتساب
            </button>
          </section>
        )}

        {loading && branch && !isDirectWhatsAppBranch(branch) && (
          <div className="mx-auto mt-8 max-w-4xl rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
            <p className="mt-4 text-lg font-bold text-slate-600">جاري تحميل المواعيد...</p>
          </div>
        )}

        {!loading && branch && !isDirectWhatsAppBranch(branch) && groupedSlots.length === 0 && !error && (
          <div className="mx-auto mt-8 max-w-4xl rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <div className="text-4xl">📅</div>
            <h2 className="mt-4 text-2xl font-black text-slate-800">لا توجد مواعيد متاحة</h2>
            <p className="mt-2 text-slate-600">يرجى المحاولة لاحقًا أو اختيار تاريخ آخر.</p>
          </div>
        )}

        {!loading && branch && !isDirectWhatsAppBranch(branch) && selectedGroup && (
          <section className="mx-auto mt-8 max-w-5xl space-y-6">
            <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-8">
              <div className="mb-5">
                <h3 className="text-2xl font-black text-slate-800">{selectedGroup.day || 'اليوم'}</h3>
                <p className="mt-1 text-slate-600">{formatDate(selectedGroup.date)}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {selectedGroup.slots.map((slot) => (
                  <button
                    key={`${slot.sheetName}-${slot.row}-${slot.startTime}`}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(slot)
                      setError('')
                    }}
                    className={`rounded-2xl border-2 px-4 py-4 text-center transition ${
                      selectedSlot &&
                      selectedSlot.sheetName === slot.sheetName &&
                      selectedSlot.row === slot.row
                        ? 'border-sky-600 bg-sky-50 text-sky-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-sky-500 hover:bg-sky-50'
                    }`}
                  >
                    <div className="text-lg font-black">{slot.startTime}</div>
                    <div className="mt-1 text-xs font-bold text-slate-500">متاح</div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {!loading && branch && !isDirectWhatsAppBranch(branch) && selectedSlot && (
          <div className="sticky bottom-4 z-20 mt-8 mx-auto max-w-4xl rounded-[28px] bg-white p-5 shadow-2xl ring-1 ring-slate-200">
            <div className="mb-4">
              <p className="text-sm font-bold text-slate-500">الموعد المختار</p>
              <p className="mt-1 text-xl font-black text-slate-800">{formatDate(selectedSlot.date)}</p>
              <p className="mt-1 text-sky-700">{selectedSlot.startTime}</p>
            </div>

            <button
              type="button"
              onClick={handleBooking}
              disabled={booking}
              className="w-full rounded-2xl bg-emerald-500 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {booking ? 'جاري تأكيد الحجز...' : 'تأكيد الحجز عبر واتساب'}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
