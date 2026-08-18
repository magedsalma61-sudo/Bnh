'use client'

import { useState } from 'react'

const WHATSAPP_NUMBER = '201281441562'

export default function MedicationsPage() {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)

  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [healthCondition, setHealthCondition] = useState('')
  const [diabetesOrInsulin, setDiabetesOrInsulin] = useState('')

  const [submitted, setSubmitted] = useState(false)

  // =========================
  // العميل الجديد
  // =========================

  const handleNewCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !age.trim() ||
      !weight.trim() ||
      !healthCondition.trim() ||
      !diabetesOrInsulin
    ) {
      alert('من فضلك أكمل جميع البيانات')
      return
    }

    const message = `
طلب تسجيل عميل جديد - الأدوية

السن: ${age}

الوزن: ${weight} كجم

الحالة الصحية:
${healthCondition}

هل يوجد سكر أو مقاومة إنسولين:
${diabetesOrInsulin}

--------------------------------
تم التسجيل من موقع د. محمد رحيم
`

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    setSubmitted(true)

    window.open(whatsappUrl, '_blank')
  }

  // =========================
  // العميل الحالي
  // =========================

  const handleExistingCustomer = () => {
    window.location.href = '/products'
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FBFD] px-4 py-12 text-[#183B56]"
    >
      <div className="mx-auto max-w-2xl">

        <div className="rounded-[32px] border border-[#DCEAF3] bg-white p-8 shadow-lg sm:p-12">

          {/* =========================
              HEADER
          ========================= */}

          <div className="text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EAF6FC] text-4xl">
              💊
            </div>

            <div className="mb-3 inline-block rounded-full bg-[#EAF6FC] px-5 py-2 text-sm font-bold text-[#2F80B7]">
              خدمات الأدوية
            </div>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              هل سبق لك واستخدمت منتجاتنا؟
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-8 text-[#60798A]">
              اختار الإجابة المناسبة عشان نوجّهك للخطوة الصحيحة.
            </p>

          </div>

          {/* =========================
              السؤال الأول
          ========================= */}

          {!answer && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              {/* نعم */}

              <button
                type="button"
                onClick={() => setAnswer('yes')}
                className="rounded-2xl bg-[#2F80B7] px-6 py-5 text-lg font-black text-white shadow-md transition hover:bg-[#23658F] hover:shadow-lg"
              >
                نعم
              </button>

              {/* لا */}

              <button
                type="button"
                onClick={() => setAnswer('no')}
                className="rounded-2xl border-2 border-[#2F80B7] bg-white px-6 py-5 text-lg font-black text-[#2F80B7] transition hover:bg-[#EAF6FC]"
              >
                لا
              </button>

            </div>
          )}

          {/* =========================
              العميل الحالي - نعم
          ========================= */}

          {answer === 'yes' && (
            <div className="mt-10 rounded-3xl bg-[#F4FAFD] p-8 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6FC] text-3xl">
                🛍️
              </div>

              <h2 className="text-2xl font-black">
                متجر المنتجات والكورسات
              </h2>

              <p className="mt-4 leading-8 text-[#60798A]">
                أهلاً بيك ❤️
                <br />
                تقدر دلوقتي تدخل المتجر وتشوف المنتجات والكورسات
                وتضيف اللي يناسبك للسلة وتكمل عملية الشراء والدفع.
              </p>

              {/* دخول المتجر */}

              <button
                type="button"
                onClick={handleExistingCustomer}
                className="mt-7 w-full rounded-2xl bg-[#2F80B7] px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#23658F] hover:shadow-xl"
              >
                دخول المتجر 🛍️
              </button>

              {/* الرجوع */}

              <button
                type="button"
                onClick={() => setAnswer(null)}
                className="mt-5 font-bold text-[#2F80B7]"
              >
                ← الرجوع
              </button>

            </div>
          )}

          {/* =========================
              العميل الجديد
          ========================= */}

          {answer === 'no' && !submitted && (
            <div className="mt-10">

              <div className="mb-8 text-center">

                <h2 className="text-2xl font-black">
                  تسجيل بياناتك
                </h2>

                <p className="mt-3 leading-7 text-[#60798A]">
                  برجاء تسجيل البيانات التالية حتى يتمكن فريقنا الطبي
                  من التواصل مع حضرتك.
                </p>

              </div>

              <form
                onSubmit={handleNewCustomerSubmit}
                className="space-y-6"
              >

                {/* =========================
                    السن
                ========================= */}

                <div>

                  <label className="mb-2 block font-bold">
                    السن
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="اكتب السن"
                    required
                    className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 outline-none transition focus:border-[#2F80B7] focus:ring-2 focus:ring-[#2F80B7]/10"
                  />

                </div>

                {/* =========================
                    الوزن
                ========================= */}

                <div>

                  <label className="mb-2 block font-bold">
                    الوزن
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="اكتب الوزن بالكيلو"
                    required
                    className="w-full rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 outline-none transition focus:border-[#2F80B7] focus:ring-2 focus:ring-[#2F80B7]/10"
                  />

                </div>

                {/* =========================
                    الحالة الصحية
                ========================= */}

                <div>

                  <label className="mb-2 block font-bold">
                    الحالة الصحية
                  </label>

                  <textarea
                    value={healthCondition}
                    onChange={(e) =>
                      setHealthCondition(e.target.value)
                    }
                    placeholder="اكتب الحالة الصحية بالتفصيل"
                    required
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-[#D6E5EE] bg-[#FAFCFD] px-5 py-4 outline-none transition focus:border-[#2F80B7] focus:ring-2 focus:ring-[#2F80B7]/10"
                  />

                </div>

                {/* =========================
                    السكر أو مقاومة الإنسولين
                ========================= */}

                <div>

                  <label className="mb-3 block font-bold">
                    هل يوجد سكر أو مقاومة إنسولين؟
                  </label>

                  <div className="grid gap-3 sm:grid-cols-3">

                    {/* يوجد سكر */}

                    <label className="cursor-pointer">

                      <input
                        type="radio"
                        name="diabetesOrInsulin"
                        value="يوجد سكر"
                        checked={
                          diabetesOrInsulin === 'يوجد سكر'
                        }
                        onChange={(e) =>
                          setDiabetesOrInsulin(e.target.value)
                        }
                        className="sr-only"
                      />

                      <div
                        className={`rounded-2xl border-2 px-4 py-4 text-center font-bold transition ${
                          diabetesOrInsulin === 'يوجد سكر'
                            ? 'border-[#2F80B7] bg-[#EAF6FC] text-[#2F80B7]'
                            : 'border-[#D6E5EE] bg-white'
                        }`}
                      >
                        يوجد سكر
                      </div>

                    </label>

                    {/* مقاومة إنسولين */}

                    <label className="cursor-pointer">

                      <input
                        type="radio"
                        name="diabetesOrInsulin"
                        value="مقاومة إنسولين"
                        checked={
                          diabetesOrInsulin === 'مقاومة إنسولين'
                        }
                        onChange={(e) =>
                          setDiabetesOrInsulin(e.target.value)
                        }
                        className="sr-only"
                      />

                      <div
                        className={`rounded-2xl border-2 px-4 py-4 text-center font-bold transition ${
                          diabetesOrInsulin === 'مقاومة إنسولين'
                            ? 'border-[#2F80B7] bg-[#EAF6FC] text-[#2F80B7]'
                            : 'border-[#D6E5EE] bg-white'
                        }`}
                      >
                        مقاومة إنسولين
                      </div>

                    </label>

                    {/* لا يوجد */}

                    <label className="cursor-pointer">

                      <input
                        type="radio"
                        name="diabetesOrInsulin"
                        value="لا يوجد"
                        checked={
                          diabetesOrInsulin === 'لا يوجد'
                        }
                        onChange={(e) =>
                          setDiabetesOrInsulin(e.target.value)
                        }
                        className="sr-only"
                      />

                      <div
                        className={`rounded-2xl border-2 px-4 py-4 text-center font-bold transition ${
                          diabetesOrInsulin === 'لا يوجد'
                            ? 'border-[#2F80B7] bg-[#EAF6FC] text-[#2F80B7]'
                            : 'border-[#D6E5EE] bg-white'
                        }`}
                      >
                        لا يوجد
                      </div>

                    </label>

                  </div>

                </div>

                {/* =========================
                    إرسال البيانات
                ========================= */}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#2F80B7] px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#23658F]"
                >
                  إرسال البيانات
                </button>

              </form>

              {/* الرجوع */}

              <button
                type="button"
                onClick={() => setAnswer(null)}
                className="mt-5 w-full font-bold text-[#2F80B7]"
              >
                ← الرجوع
              </button>

            </div>
          )}

          {/* =========================
              رسالة النجاح للعميل الجديد
          ========================= */}

          {answer === 'no' && submitted && (
            <div className="mt-10 rounded-3xl bg-[#F4FAFD] p-8 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6FC] text-3xl">
                ✓
              </div>

              <h2 className="text-2xl font-black">
                تم التسجيل بنجاح
              </h2>

              <p className="mt-4 leading-8 text-[#60798A]">
                وسيتم التواصل مع حضرتك في أقرب وقت ممكن
                من خلال فريقنا الطبي.
              </p>

              <p className="mt-3 font-bold text-[#2F80B7]">
                سعداء بتواجدك معانا ❤️
              </p>

              {/* الرجوع */}

              <button
                type="button"
                onClick={() => {
                  setAnswer(null)
                  setSubmitted(false)
                  setAge('')
                  setWeight('')
                  setHealthCondition('')
                  setDiabetesOrInsulin('')
                }}
                className="mt-6 font-bold text-[#2F80B7]"
              >
                ← الرجوع
              </button>

            </div>
          )}

        </div>

      </div>
    </main>
  )
}