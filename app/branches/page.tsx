'use client'

import React from 'react'

const BRANCHES = [
  {
    name: 'حلمية الزيتون',
    address: 'ميدان حلمية الزيتون أعلى عصير أفوكادو وبجوار بنزينة التعاون.',
    map: 'https://bit.ly/3Fwsw5F',
    examPrice: 500,
    followUpPrice: 120,
    doctorDay: 'السبت',
    poweredBy: false,
  },
  {
    name: 'مدينة نصر',
    address: '46 شارع محمد النادي مصطفى النحاس محطة الهيثم بجوار ماركت بيم.',
    map: 'https://bit.ly/3wfo32Z',
    examPrice: 650,
    followUpPrice: 150,
    doctorDay: 'الأحد',
    poweredBy: false,
  },
  {
    name: 'العبور',
    address: 'العبور الحي السادس قطعة 52 الدور الثاني أعلى ميديكال هاوس.',
    map: 'https://goo.gl/maps/QWJj7f1dmQVQp3cH9',
    examPrice: 650,
    followUpPrice: 150,
    doctorDay: 'الاثنين',
    poweredBy: false,
  },
  {
    name: 'الهرم',
    address: '236 ش الهرم بجوار سنترال الهرم الدور الثالث شقة 6.',
    map: 'https://maps.app.goo.gl/AWumxoRCiRcfJaoq6?g_st=aw',
    examPrice: 650,
    followUpPrice: 150,
    doctorDay: 'الثلاثاء',
    poweredBy: false,
  },
  {
    name: 'شبرا مصر',
    address: 'تقاطع خلوصي مع الترعة البولاقية أمام مدرسة رمسيس. شبرا 3 دقائق من مترو روض الفرج.',
    map: 'https://maps.app.goo.gl/FNrmpeFMkCua4jjn7',
    examPrice: 500,
    followUpPrice: 120,
    doctorDay: 'الأربعاء — مرة كل 15 يوم',
    poweredBy: false,
  },
  {
    name: '6 أكتوبر',
    address: 'ميدان الحصري عمارة 3 المحور المركزي أعلى راية ستور الدور الثالث ميدان الحصري.',
    map: 'https://maps.app.goo.gl/4dN6EwYtuespmcTw8',
    examPrice: 650,
    followUpPrice: 150,
    doctorDay: 'الخميس',
    poweredBy: false,
  },
  {
    name: 'المعادي',
    address: '101 ش 9 المعادي أمام البنك الأهلي وبجوار مترو المعادي.',
    map: 'https://bit.ly/3RPH9X6',
    examPrice: 300,
    followUpPrice: 75,
    doctorDay: '',
    poweredBy: true,
  },
  {
    name: 'إمبابة',
    address: 'شارع الوحدة أمام كوك دور وكنتاكي.',
    map: 'https://maps.google.com/maps?q=30.0863294%2C31.2213284&z=17&hl=ar',
    examPrice: 300,
    followUpPrice: 60,
    doctorDay: '',
    poweredBy: true,
  },
  {
    name: 'الفيوم',
    address: 'أمام المستشفى العام باب الشؤون الصحية بالمستشفى برج الأطباء مدخل الإداري الثاني الدور الثالث.',
    map: 'https://maps.app.goo.gl/M6GGZbRPNjLa2qyk7',
    examPrice: 300,
    followUpPrice: 70,
    doctorDay: '',
    poweredBy: true,
  },
]

export default function BranchesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FBFD] px-4 py-10 text-[#183B56]"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 overflow-hidden rounded-[32px] bg-white shadow-xl">
          <img
            src="/images/branches.png"
            alt="مراكز دكتور محمد رحيم"
            className="block h-auto max-h-[520px] w-full object-contain"
          />
        </div>

        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-full bg-[#EAF6FC] px-5 py-2 text-sm font-bold text-[#2F80B7]">
            مراكز دكتور محمد رحيم
          </div>

          <h1 className="text-3xl font-black sm:text-5xl">
            فروعنا
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#60798A]">
            تعرف على فروع مراكزنا وعناوينها وأسعار الكشف والمتابعة ومواعيد تواجد الدكتور.
          </p>
        </div>

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

              <div className="mb-5">
                <div className="mb-2 font-bold text-[#60798A]">
                  📍 العنوان
                </div>

                <p className="leading-7">
                  {branch.address}
                </p>
              </div>

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
