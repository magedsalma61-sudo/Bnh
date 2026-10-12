
'use client'

import React, { useState } from 'react'

const PAYMENT_METHODS = [
  {
    value: 'instapay',
    label: 'InstaPay',
    arabicLabel: 'إنستاباي',
    number: '01141336908',
    icon: '💳',
  },
  {
    value: 'vodafone-cash',
    label: 'Vodafone Cash',
    arabicLabel: 'فودافون كاش',
    number: '01000225449',
    icon: '📱',
  },
] as const

export default function OnlineBookingPage() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    whatsapp: '',
    healthCondition: '',
    medications: '',
    notes: '',
    paymentMethod: '',
  })

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (loading) return

    const payment = PAYMENT_METHODS.find(
      (method) => method.value === form.paymentMethod
    )

    if (!payment) return

    setLoading(true)

    const message = [
      'طلب حجز كشف أونلاين',
      '',
      `الاسم: ${form.name.trim()}`,
      `السن: ${form.age}`,
      `رقم الهاتف: ${form.phone.trim()}`,
      `رقم واتساب: ${form.whatsapp.trim()}`,
      `الحالة الصحية: ${form.healthCondition.trim()}`,
      `الأدوية الحالية: ${form.medications.trim() || 'لم يذكر'}`,
      `ملاحظات: ${form.notes.trim() || 'لا يوجد'}`,
      '',
      `طريقة الدفع: ${payment.arabicLabel}`,
      `رقم الدفع: ${payment.number}`,
      '',
      'يرجى مراجعة طلب الحجز وإرسال تعليمات الدفع.',
      'الطلب غير مؤكد حتى تتم مراجعته.',
    ].join('\n')

    window.location.href =
      `https://wa.me/201281441562?text=${encodeURIComponent(message)}`
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

        {/* Page heading */}
        <header className="mb-8 border-b border-[#DCEAF3] pb-6 text-center">
          <h1 className="text-3xl font-black text-[#063B56] sm:text-4xl">
            حجز الكشف أونلاين
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#607F91] sm:text-base">
            سجّل بياناتك واختار طريقة الدفع المناسبة ليك
            لإرسال طلب حجز الكشف ومراجعته.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-[#DCEAF3] bg-white shadow-sm"
        >
          {/* Form title */}
          <div className="border-b border-[#DCEAF3] bg-[#F4FAFD] px-5 py-5 sm:px-8">
            <h2 className="text-xl font-black text-[#063B56]">
              📋 بيانات المريض
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#607F91]">
              من فضلك املأ البيانات المطلوبة بدقة.
            </p>
          </div>

          <div className="space-y-6 p-5 sm:p-8">

            <div>
              <label className={labelClass}>
                الاسم بالكامل *
              </label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) =>
                  updateField('name', e.target.value)
                }
                autoComplete="name"
                placeholder="اكتب اسمك بالكامل"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  السن *
                </label>
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
                  رقم الهاتف *
                </label>
                <input
                  className={inputClass}
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) =>
                    updateField('phone', e.target.value)
                  }
                  placeholder="01xxxxxxxxx"
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                رقم واتساب *
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
                الحالة الصحية وسبب الاستشارة *
              </label>
              <textarea
                className={inputClass}
                rows={4}
                value={form.healthCondition}
                onChange={(e) =>
                  updateField('healthCondition', e.target.value)
                }
                placeholder="اكتب الحالة الصحية وسبب الاستشارة"
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
                placeholder="اكتب الأدوية التي تستخدمها إن وجدت"
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

          {/* Payment section */}
          <section className="mx-5 mb-6 rounded-3xl bg-[#FFF9E9] p-5 sm:mx-8 sm:p-6">
            <h2 className="mb-2 text-lg font-black text-[#063B56]">
              🧾 طريقة الدفع
            </h2>

            <p className="mb-5 text-sm leading-7 text-[#607F91]">
              اختار طريقة الدفع المناسبة ليك.
            </p>

            <fieldset className="space-y-3">
              <legend className="mb-3 text-sm font-bold text-[#183B56]">
                طرق الدفع المتاحة *
              </legend>

              {PAYMENT_METHODS.map((method) => {
                const selected =
                  form.paymentMethod === method.value

                return (
                  <label
                    key={method.value}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 bg-white p-4 transition ${
                      selected
                        ? 'border-[#0086B8] bg-[#F0F9FD]'
                        : 'border-[#DCEAF3] hover:border-[#8BCDE5]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={selected}
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
                      <span className="block font-black text-[#063B56]">
                        {method.label}
                      </span>

                      <span className="mt-1 block text-sm text-[#607F91]">
                        {method.arabicLabel}
                      </span>

                      <span
                        dir="ltr"
                        className="mt-2 block text-lg font-black tracking-wide text-[#0086B8]"
                      >
                        {method.number}
                      </span>
                    </span>

                    <span className="text-2xl" aria-hidden="true">
                      {method.icon}
                    </span>
                  </label>
                )
              })}
            </fieldset>

            <div className="mt-5 rounded-2xl border border-[#E7DDBF] bg-white p-4">
              <p className="text-sm font-bold text-[#183B56]">
                📌 ملحوظة مهمة
              </p>

              <p className="mt-2 text-sm leading-7 text-[#607F91]">
                إرسال الطلب لا يؤكد الحجز أو الدفع.
                سيتم التواصل معك لمراجعة الطلب وتوضيح
                خطوات إتمام الدفع.
              </p>
            </div>
          </section>

          {/* Submit button */}
          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#0086B8] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#0086B8]/15 transition hover:bg-[#006F99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'جاري تجهيز الطلب...'
                : 'تأكيد حجز الكشف ✓'}
            </button>

            <p className="mt-3 text-center text-xs leading-6 text-[#78909E]">
              سيتم إرسال بيانات طلبك إلى واتساب لمراجعته.
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
