'use client'

import React, { useState } from 'react'

export default function AboutPage() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')

  const ar = language === 'ar'

  return (
    <main
      dir={ar ? 'rtl' : 'ltr'}
      className="min-h-screen bg-white text-[#183B56]"
    >
      {/* ================= ABOUT HERO ================= */}

      <section className="bg-white py-12 sm:py-16 lg:py-20">

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

          {/* ================= DOCTOR IMAGE ================= */}

          <div
            className={`flex ${
              ar
                ? 'justify-center lg:justify-start'
                : 'justify-center lg:justify-end'
            }`}
          >
            <div className="w-full max-w-[500px] overflow-hidden rounded-[32px] bg-[#F4FAFD] shadow-xl">

              <img
                src="/images/doctor-about.jpg"
                alt="Dr. Mohamed Rohayem"
                className="h-[500px] w-full object-cover object-center sm:h-[600px]"
              />

            </div>
          </div>


          {/* ================= ABOUT TEXT ================= */}

          <div
            className={`${
              ar ? 'text-right' : 'text-left'
            }`}
          >

            <div className="mb-5 inline-block rounded-full bg-[#2F80B7] px-5 py-2 text-sm font-bold text-white shadow-md">
              {ar ? 'عن د. محمد رحيم' : 'About Dr. Mohamed Rohayem'}
            </div>

            <h1 className="text-4xl font-black leading-tight text-[#183B56] sm:text-5xl">
              {ar
                ? 'د. محمد رحيم'
                : 'Dr. Mohamed Rohayem'}
            </h1>

            <p className="mt-5 text-xl font-bold leading-9 text-[#285875]">
              {ar
                ? 'متخصص في أمراض السمنة والتغذية العلاجية وعلاج السمنة الموضعية دون تدخلات جراحية.'
                : 'Specialized in obesity treatment, therapeutic nutrition, and non-surgical treatment of localized obesity.'}
            </p>

            <p className="mt-5 text-lg leading-9 text-[#49687C]">
              {ar
                ? 'يعتمد د. محمد رحيم في مراكزه على نظام الرامد (RAMD) كمنهج أساسي في علاج السمنة، وهو نظام علاجي متكامل يرتكز على التغذية العلاجية، مع تحديد الجلسات أو الأدوية، أو الجمع بينهما، وفقًا لاحتياجات كل حالة وتقييمها الطبي.'
                : 'Dr. Mohamed Rohayem centers use the RAMD system as a core approach to obesity treatment. It is an integrated treatment system based on therapeutic nutrition, with sessions, medications, or both selected according to each case and its medical assessment.'}
            </p>


            {/* ================= RAMD ================= */}

            <div className="mt-8">

              <h2 className="text-2xl font-black text-[#183B56] sm:text-3xl">
                {ar ? 'منهج الرامد' : 'The RAMD Approach'}
              </h2>

              <div
                className={`mt-3 h-1 w-16 rounded-full bg-[#2F80B7] ${
                  ar ? 'mr-0' : 'ml-0'
                }`}
              />

              <p className="mt-5 text-lg leading-9 text-[#49687C]">
                {ar
                  ? 'يقوم نظام الرامد (RAMD) على بناء خطة علاجية متكاملة تبدأ بنظام غذائي مناسب للحالة، ثم يتم دعم الخطة بما تحتاجه الحالة من جلسات أو أدوية، مع المتابعة الطبية المستمرة.'
                  : 'The RAMD system builds an integrated treatment plan that starts with a diet suited to each case, followed by the sessions or medications needed, together with continuous medical follow-up.'}
              </p>

              <p className="mt-4 text-lg leading-9 text-[#49687C]">
                {ar
                  ? 'ويتم التعامل مع كل حالة بشكل فردي، لأن الخطة العلاجية ليست واحدة للجميع، وإنما تُحدد وفق احتياجات المريض وطبيعة حالته.'
                  : 'Each case is treated individually because there is no single treatment plan for everyone. The plan is determined according to the patient’s needs and condition.'}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= OUR GOAL ================= */}

      <section className="bg-[#F4FAFD] py-14 sm:py-16">

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

          <div className="mx-auto h-1 w-20 rounded-full bg-[#2F80B7]" />

          <h2 className="mt-6 text-3xl font-black text-[#183B56] sm:text-4xl">
            {ar ? 'هدفنا' : 'Our Goal'}
          </h2>

          <p className="mt-5 text-lg leading-9 text-[#557184]">
            {ar
              ? 'لا نهدف فقط إلى فقدان الوزن، بل إلى الوصول إلى نتيجة صحية ومستقرة من خلال خطة علاجية متكاملة، واضحة، ومصممة خصيصًا لكل حالة.'
              : 'Our goal is not simply weight loss, but achieving healthy and sustainable results through a clear, integrated treatment plan designed specifically for each case.'}
          </p>

        </div>

      </section>


      {/* ================= LANGUAGE BUTTON ================= */}

      <div className="fixed bottom-5 left-5 z-50">

        <button
          type="button"
          onClick={() =>
            setLanguage(ar ? 'en' : 'ar')
          }
          className="rounded-full border-2 border-[#2F80B7] bg-white px-5 py-2.5 text-sm font-bold text-[#2F80B7] shadow-lg transition hover:bg-[#2F80B7] hover:text-white"
        >
          {ar ? 'English' : 'العربية'}
        </button>

      </div>

    </main>
  )
}