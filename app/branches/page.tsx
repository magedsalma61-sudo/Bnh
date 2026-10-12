
'use client'

import React from 'react'

const HOTLINE = '01203333249'
const CALL_CENTER = '01111763330'

const BRANCHES = [
  {
    name: 'حلمية الزيتون',
    phone: '01128282303',
    address: 'ميدان حلمية الزيتون أعلى عصير أفوكادو وبجوار بنزينة التعاون.',
    map: 'https://bit.ly/3Fwsw5F',
    examPrice: 500,
    followUpPrice: 120,
    doctorDay: 'السبت',
    poweredBy: false,
  },
  {
    name: 'مدينة نصر',
    phone: '01143668863',
    address: '46 شارع محمد النادي مصطفى النحاس محطة الهيثم بجوار ماركت بيم.',
    map: 'https://bit.ly/3wfo32Z',
    examPrice: 650,
    followUpPrice: 150,
    doctorDay: 'الأحد',
    poweredBy: false,
  },
  {
    name: 'العبور',
    phone: '01000225449',
    address: 'العبور الحي السادس قطعة 52 الدور الثاني أعلى ميديكال هاوس.',
    map: 'https://goo.gl/maps/QWJj7f1dmQVQp3cH9',
    examPrice: 650,
    followUpPrice: 150,
    doctorDay: 'الاثنين',
    poweredBy: false,
  },
  {
    name: 'الهرم',
    phone: '01226129577',
    address: '236 ش الهرم بجوار سنترال الهرم الدور الثالث شقة 6.',
    map: 'https://maps.app.goo.gl/AWumxoRCiRcfJaoq6?g_st=aw',
    examPrice: 650,
    followUpPrice: 150,
    doctorDay: 'الثلاثاء',
    poweredBy: false,
  },
  {
    name: 'شبرا مصر',
    phone: '01142973037',
    address: 'تقاطع خلوصي مع الترعة البولاقية أمام مدرسة رمسيس. شبرا 3 دقائق من مترو روض الفرج.',
    map: 'https://maps.app.goo.gl/FNrmpeFMkCua4jjn7',
    examPrice: 500,
    followUpPrice: 120,
    doctorDay: 'الأربعاء — مرة كل 15 يوم',
    poweredBy: false,
  },
  {
    name: '6 أكتوبر',
    phone: '01281007762',
    address: 'ميدان الحصري عمارة 3 المحور المركزي أعلى راية ستور الدور الثالث ميدان الحصري.',
    map: 'https://maps.app.goo.gl/4dN6EwYtuespmcTw8',
    examPrice: 650,
    followUpPrice: 150,
    doctorDay: 'الخميس',
    poweredBy: false,
  },
  {
    name: 'المعادي',
    phone: '01115504662',
    address: '101 ش 9 المعادي أمام البنك الأهلي وبجوار مترو المعادي.',
    map: 'https://bit.ly/3RPH9X6',
    examPrice: 300,
    followUpPrice: 75,
    doctorDay: '',
    poweredBy: true,
  },
  {
    name: 'الفيوم',
    phone: '01553394429',
    address: 'أمام المستشفى العام باب الشؤون الصحية بالمستشفى برج الأطباء مدخل الإداري الثاني الدور الثالث.',
    map: 'https://maps.app.goo.gl/M6GGZbRPNjLa2qyk7',
    examPrice: 300,
    followUpPrice: 70,
    doctorDay: '',
    poweredBy: true,
  },
]

function normalizePhone(phone: string) {
  return phone.startsWith('0')
    ? `2${phone}`
    : phone
}

export default function BranchesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FBFD] px-4 py-10 text-[#183B56]"
    >
      <div className="mx-auto max-w-7xl">

        {/* صورة الفروع */}
        <div className="mb-10 overflow-hidden rounded-[32px] bg-white shadow-xl">
          <img
            src="/images/branches.png"
            alt="مراكز دكتور محمد رحيم"
            className="block h-auto max-h-[520px] w-full object-contain"
          />
        </div>

        {/* عنوان الصفحة */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full bg-[#EAF6FC] px-5 py-2 text-sm font-bold text-[#2F80B7]">
            مراكز دكتور محمد رحيم
          </div>

          <h1 className="text-3xl font-black sm:text-5xl">
            فروعنا
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#60798A]">
            تعرف على فروع مراكزنا وعناوينها وأسعار الكشف والمتابعة
            ومواعيد تواجد الدكتور، وتواصل مباشرة مع الفرع المناسب ليك.
          </p>
        </div>

        {/* الخط الساخن وخدمة العملاء */}
        <section className="mb-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] border border-[#DCEAF3] bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF6FC] text-2xl">
                🎧
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-[#60798A]">
                  تواصل معنا على
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#183B56]">
                  Hotline
                </h2>
                <p className="mt-1 text-sm text-[#60798A]">
                  الخط الساخن
                </p>
              </div>
            </div>

            <a
              href={`tel:${HOTLINE}`}
              dir="ltr"
              className="mt-5 block text-center text-2xl font-black tracking-wide text-[#2F80B7] hover:text-[#23658F]"
            >
              {HOTLINE}
            </a>

            <a
              href={`https://wa.me/${normalizePhone(HOTLINE)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 font-black text-white transition hover:bg-[#1DA851]"
            >
              <span>◉</span>
              تواصل واتساب
            </a>
          </div>

          <div className="rounded-[28px] border border-[#DCEAF3] bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF6FC] text-2xl">
                ☎️
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-[#60798A]">
                  للاستفسارات والحجز
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#183B56]">
                  Call Center
                </h2>
                <p className="mt-1 text-sm text-[#60798A]">
                  خدمة العملاء
                </p>
              </div>
            </div>

            <a
              href={`tel:${CALL_CENTER}`}
              dir="ltr"
              className="mt-5 block text-center text-2xl font-black tracking-wide text-[#2F80B7] hover:text-[#23658F]"
            >
              {CALL_CENTER}
            </a>

            <a
              href={`https://wa.me/${normalizePhone(CALL_CENTER)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 font-black text-white transition hover:bg-[#1DA851]"
            >
              <span>◉</span>
              تواصل واتساب
            </a>
          </div>
        </section>

        {/* كروت الفروع */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((branch) => (
            <article
              key={branch.name}
              className="flex flex-col rounded-[28px] border border-[#DCEAF3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-7"
            >
              <div className="mb-5">
                <div className="mb-3 inline-flex rounded-full bg-[#EAF6FC] px-4 py-2 text-sm font-bold text-[#2F80B7]">
                  فرع
                </div>

                <h2 className="text-2xl font-black">
                  {branch.name}
                </h2>
              </div>

              {/* العنوان */}
              <div className="mb-5">
                <div className="mb-2 font-bold text-[#60798A]">
                  📍 العنوان
                </div>

                <p className="leading-7">
                  {branch.address}
                </p>
              </div>

              {/* رقم الفرع */}
              <div className="mb-5 rounded-2xl border border-[#DCEAF3] bg-[#F4FAFD] p-4">
                <div className="text-sm font-bold text-[#60798A]">
                  ☎️ رقم تليفون الفرع
                </div>

                <a
                  href={`tel:${branch.phone}`}
                  dir="ltr"
                  className="mt-2 block text-center text-xl font-black tracking-wide text-[#2F80B7] hover:text-[#23658F]"
                >
                  {branch.phone}
                </a>

                <a
                  href={`https://wa.me/${normalizePhone(branch.phone)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white transition hover:bg-[#1DA851]"
                >
                  <span>◉</span>
                  واتساب الفرع
                </a>
              </div>

              {/* موعد التواجد */}
              <div className="mb-5 rounded-2xl bg-[#F4FAFD] p-5 text-center">
                {branch.poweredBy ? (
                  <div className="text-xl font-black text-black sm:text-2xl">
                    Powered by Rahim
                  </div>
                ) : (
                  <>
                    <div className="text-sm font-bold text-[#60798A]">
                      📅 موعد التواجد
                    </div>

                    <div className="mt-2 text-lg font-black text-black">
                      {branch.doctorDay}
                    </div>
                  </>
                )}
              </div>

              {/* الأسعار */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#DCEAF3] p-4 text-center">
                  <div className="text-sm font-bold text-[#60798A]">
                    سعر الكشف
                  </div>

                  <div className="mt-2 text-xl font-black text-black">
                    {branch.examPrice} جنيه
                  </div>
                </div>

                <div className="rounded-2xl border border-[#DCEAF3] p-4 text-center">
                  <div className="text-sm font-bold text-[#60798A]">
                    المتابعة الأسبوعية
                  </div>

                  <div className="mt-2 text-xl font-black text-black">
                    {branch.followUpPrice} جنيه
                  </div>
                </div>
              </div>

              {/* الموقع على الخريطة */}
              <a
                href={branch.map}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center rounded-2xl bg-[#2F80B7] px-6 py-4 font-black text-white shadow-md transition hover:bg-[#23658F]"
              >
                📍 عرض لوكيشن الفرع
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
