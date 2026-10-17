
'use client'

import React, { useState } from 'react'

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyCHviUQT6FKATwAwUyYdKwhNRnzgkcaAl8mnW7eH-51KBrnbz1RoYSsZLZhoAfyQjw/exec'

const ADMIN_WHATSAPP = '201281441562'

const PAYMENT_METHODS = [
  {
    value: 'instapay',
    label: 'إنستاباي',
    number: '01141336908',
  },
  {
    value: 'vodafone-cash',
    label: 'فودافون كاش',
    number: '01000225449',
  },
]

export default function OnlineBookingPage() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    whatsapp: '',
    healthCondition: '',
    consultationReason: '',
    medications: '',
    notes: '',
    paymentMethod: '',
  })

  const [receipt, setReceipt] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    if (loading) return

    setError('')
    setSuccess(false)

    if (!form.paymentMethod) {
      setError('اختاري طريقة الدفع أولًا.')
      return
    }

    if (!receipt) {
      setError('إرفاق إيصال الدفع إجباري.')
      return
    }

    if (receipt.size > 5 * 1024 * 1024) {
      setError('حجم الإيصال يجب ألا يتجاوز 5 ميجابايت.')
      return
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ]

    if (!allowedTypes.includes(receipt.type)) {
      setError('ارفعي صورة JPG أو PNG أو WEBP أو ملف PDF.')
      return
    }

    setLoading(true)

    try {
      const receiptBase64 = await new Promise<string>(
        (resolve, reject) => {
          const reader = new FileReader()

          reader.onerror = () =>
            reject(new Error('تعذرت قراءة ملف الإيصال.'))

          reader.onload = () => {
            const result = String(reader.result || '')
            const comma = result.indexOf(',')

            if (comma < 0) {
              reject(new Error('تعذر تجهيز الإيصال.'))
            } else {
              resolve(result.slice(comma + 1))
            }
          }

          reader.readAsDataURL(receipt)
        }
      )

      const payload = {
        fullName: form.name.trim(),
        age: form.age,
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        healthCondition: form.healthCondition.trim(),
        consultationReason: form.consultationReason.trim(),
        currentMedications: form.medications.trim(),
        additionalNotes: form.notes.trim(),
        paymentMethod: form.paymentMethod,
        receiptBase64,
        receiptName: receipt.name,
        receiptMimeType: receipt.type,
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'تعذر تسجيل الحجز.'
        )
      }

      setSuccess(true)

      const payment = PAYMENT_METHODS.find(
        (method) => method.value === form.paymentMethod
      )

      const message = [
        'طلب حجز كشف أونلاين جديد',
        `رقم الطلب: ${result.bookingId || ''}`,
        `الاسم: ${form.name.trim()}`,
        `السن: ${form.age}`,
        `رقم الهاتف: ${form.phone.trim()}`,
        `رقم واتساب: ${form.whatsapp.trim()}`,
        `الحالة الصحية: ${form.healthCondition.trim()}`,
        `سبب الاستشارة: ${form.consultationReason.trim()}`,
        `الأدوية: ${form.medications.trim() || 'لم يذكر'}`,
        `الملاحظات: ${form.notes.trim() || 'لا يوجد'}`,
        `طريقة الدفع: ${payment?.label || ''}`,
        `رابط الإيصال: ${result.receiptUrl || ''}`,
        'يرجى مراجعة الطلب والإيصال.',
      ].join('\n')

      window.location.href =
        `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'حدث خطأ أثناء إرسال الطلب. حاولي مرة أخرى.'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[#DCEAF3] bg-white px-4 py-3 text-[#183B56] outline-none transition placeholder:text-[#8AA0AE] focus:border-[#0086B8] focus:ring-2 focus:ring-[#0086B8]/20'

  const labelClass =
    'mb-2 block text-sm font-bold text-[#183B56]'

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F7FAFC] px-4 py-8 text-[#063B56] sm:py-12"
    >
      <div className="mx-auto max-w-5xl">

        <header className="mb-8 border-b border-[#DCEAF3] pb-6 text-center">
          <h1 className="text-3xl font-black sm:text-4xl">
            حجز الكشف أونلاين
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#607F91] sm:text-base">
            سجّل بياناتك واختار طريقة الدفع وارفع إيصال الدفع
            لإرسال طلبك للمراجعة.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-[#DCEAF3] bg-white shadow-sm"
        >
          <div className="border-b border-[#DCEAF3] bg-[#F4FAFD] px-5 py-5 sm:px-8">
            <h2 className="text-xl font-black">
              📋 بيانات المريض
            </h2>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">

            <div className="sm:col-span-2">
              <label className={labelClass}>
                الاسم بالكامل *
              </label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) =>
                  updateField('name', e.target.value)
                }
                placeholder="اكتب اسمك بالكامل"
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label className={labelClass}>السن *</label>
              <input
                className={inputClass}
                type="number"
                min="1"
                max="120"
                value={form.age}
                onChange={(e) =>
                  updateField('age', e.target.value)
                }
                placeholder="السن بالسنوات"
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                رقم التليفون *
              </label>
              <input
                className={inputClass}
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  updateField('phone', e.target.value)
                }
                placeholder="01xxxxxxxxx"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>
                رقم الواتساب *
              </label>
              <input
                className={inputClass}
                type="tel"
                value={form.whatsapp}
                onChange={(e) =>
                  updateField('whatsapp', e.target.value)
                }
                placeholder="رقم واتساب للتواصل"
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                الحالة الصحية *
              </label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.healthCondition}
                onChange={(e) =>
                  updateField('healthCondition', e.target.value)
                }
                placeholder="اكتب الحالة الصحية"
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                سبب الاستشارة *
              </label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.consultationReason}
                onChange={(e) =>
                  updateField('consultationReason', e.target.value)
                }
                placeholder="ما سبب طلب الاستشارة؟"
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                الأدوية الحالية
              </label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.medications}
                onChange={(e) =>
                  updateField('medications', e.target.value)
                }
                placeholder="الأدوية الحالية إن وجدت"
              />
            </div>

            <div>
              <label className={labelClass}>
                ملاحظات إضافية
              </label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.notes}
                onChange={(e) =>
                  updateField('notes', e.target.value)
                }
                placeholder="أي معلومات إضافية"
              />
            </div>

          </div>

          <section className="mx-5 mb-6 rounded-3xl bg-[#FFF9E9] p-5 sm:mx-8 sm:p-6">
            <h2 className="mb-4 text-lg font-black">
              🧾 طريقة الدفع وإيصال الدفع
            </h2>

            <fieldset className="space-y-3">
              <legend className="mb-3 text-sm font-bold">
                اختار طريقة الدفع *
              </legend>

              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.value}
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 bg-white p-4 ${
                    form.paymentMethod === method.value
                      ? 'border-[#0086B8] bg-[#F0F9FD]'
                      : 'border-[#DCEAF3]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={
                      form.paymentMethod === method.value
                    }
                    onChange={(e) =>
                      updateField(
                        'paymentMethod',
                        e.target.value
                      )
                    }
                    required
                    className="h-5 w-5 accent-[#0086B8]"
                  />

                  <span className="flex-1">
                    <span className="block font-black">
                      {method.label}
                    </span>
                    <span
                      dir="ltr"
                      className="mt-1 block text-lg font-black text-[#0086B8]"
                    >
                      {method.number}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>

            <div className="mt-5">
              <label className={labelClass}>
                إرفاق إيصال الدفع (صورة أو PDF) *
              </label>

              <input
                className={inputClass}
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                required
                onChange={(e) =>
                  setReceipt(e.target.files?.[0] || null)
                }
              />

              <p className="mt-2 text-xs leading-6 text-[#607F91]">
                الإيصال إجباري، والحد الأقصى 5 ميجابايت.
              </p>
            </div>
          </section>

          {error && (
            <p
              role="alert"
              className="mx-5 mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:mx-8"
            >
              {error}
            </p>
          )}

          {success && (
            <p className="mx-5 mb-5 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700 sm:mx-8">
              تم تسجيل الطلب. ستُفتح واتساب لمراجعة بياناته.
            </p>
          )}

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#0086B8] px-5 py-4 font-black text-white shadow-lg transition hover:bg-[#006F99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'جاري إرسال الطلب والإيصال...'
                : 'إرسال طلب الحجز والإيصال ✓'}
            </button>

            <p className="mt-3 text-center text-xs leading-6 text-[#78909E]">
              لن يتم إرسال الطلب دون اختيار طريقة الدفع وإرفاق الإيصال.
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
