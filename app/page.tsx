'use client'

import React, { useState } from 'react'

const WHATSAPP_MESSAGE = `اهلا بحضرتك يا فندم سعداء بتواجد معانا فى مراكز دكتور محمد رحيم 🌹

ممكن توضيح لاستفسار حضرتك بخصوص 🙏🏻
الكشف ام الجلسات ام الادويه ؟`

const whatsappUrl = `https://wa.me/201281441562?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`

const facebookUrl = 'https://www.facebook.com/share/191Rzi8oN2/'

const instagramUrl =
  'https://www.instagram.com/drmrohayem?igsh=OGVyZXdzbzU4cjdy'

const tiktokUrl =
  'https://www.tiktok.com/@dr.mrohayem?_r=1&_t=ZS-98qbclqtemg'

const youtubeUrl =
  'https://youtube.com/@dr.mohamedrohayem-.4314?si=LdGfkPcGTuKezezu'

const threadsUrl =
  'https://www.threads.com/@drmrohayem'

export default function Home() {
  const [language] = useState<'ar' | 'en'>('ar')

  const ar = language === 'ar'

  return (
    <main
      dir={ar ? 'rtl' : 'ltr'}
      className="min-h-screen bg-white text-[#183B56]"
    >

      {/* ================= HERO ================= */}

      <section className="bg-white py-10 sm:py-14 lg:py-20">

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

          {/* ================= TEXT ================= */}

          <div
            className={`order-2 max-w-2xl ${
              ar
                ? 'text-right lg:order-1'
                : 'text-left lg:order-2'
            }`}
          >

            <div className="mb-5 inline-block rounded-full bg-[#2F80B7] px-5 py-2 text-sm font-bold text-white shadow-md">
              Dr. Mohamed Rohayem
            </div>

            <h1 className="text-4xl font-black leading-tight text-[#183B56] sm:text-5xl lg:text-6xl">
              {ar
                ? 'أهلاً بكم في مراكز دكتور محمد رحيم'
                : 'Welcome to Dr. Mohamed Rohayem Centers'}
            </h1>

            <p className="mt-6 text-xl font-bold leading-9 text-[#285875]">
              {ar
                ? 'استشاري السمنة والتغذية العلاجية'
                : 'Consultant of Obesity and Therapeutic Nutrition'}
            </p>

            <p className="mt-4 text-lg leading-8 text-[#49687C]">
              {ar
                ? 'نقدم رعاية متخصصة وبرامج علاجية متكاملة تساعدك على الوصول إلى وزن صحي وحياة أفضل.'
                : 'Specialized care and comprehensive treatment programs designed to help you achieve a healthier weight and better life.'}
            </p>


            {/* ================= SOCIAL BUTTONS ================= */}

            <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">

              {/* WhatsApp */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-6 py-3.5 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1DA851] hover:shadow-xl"
              >
                💬{' '}
                {ar
                  ? 'تواصل معنا عبر واتساب'
                  : 'Contact us on WhatsApp'}
              </a>


              {/* Facebook */}

              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#1877F2] px-6 py-3.5 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-xl"
              >
                📘{' '}
                {ar
                  ? 'تابعنا على فيسبوك'
                  : 'Follow us on Facebook'}
              </a>


              {/* Instagram */}

              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#E4405F] px-6 py-3.5 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-xl"
              >
                📸{' '}
                {ar
                  ? 'تابعنا على إنستجرام'
                  : 'Follow us on Instagram'}
              </a>


              {/* TikTok */}

              <a
                href={tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#111111] px-6 py-3.5 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-black hover:shadow-xl"
              >
                🎵{' '}
                {ar
                  ? 'تابعنا على تيك توك'
                  : 'Follow us on TikTok'}
              </a>


              {/* YouTube */}

              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FF0000] px-6 py-3.5 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D90000] hover:shadow-xl"
              >
                ▶️{' '}
                {ar
                  ? 'تابعنا على يوتيوب'
                  : 'Follow us on YouTube'}
              </a>


              {/* Threads */}

              <a
                href={threadsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#000000] px-6 py-3.5 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#222222] hover:shadow-xl"
              >
                🧵{' '}
                {ar
                  ? 'تابعنا على Threads'
                  : 'Follow us on Threads'}
              </a>

            </div>


            {/* ================= NEW PAGES ================= */}

            <div className="mt-10">

              <div className="mb-4">
                <p className="text-sm font-bold text-[#2F80B7]">
                  اكتشف المزيد
                </p>

                <h2 className="mt-1 text-2xl font-black text-[#183B56]">
                  تجارب ومعلومات تهمك
                </h2>
              </div>


              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* قصص نجاح العملاء */}

                <a
                  href="/success-stories"
                  className="group rounded-3xl border border-[#DCEAF3] bg-[#F8FBFD] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF6FC] text-2xl transition group-hover:scale-105">
                    ✨
                  </div>

                  <h3 className="text-xl font-black text-[#183B56]">
                    قصص نجاح العملاء
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#60798A]">
                    شوف تجارب وقصص نجاح عملائنا والنتائج اللي وصلوا لها.
                  </p>

                  <div className="mt-4 font-bold text-[#2F80B7]">
                    اكتشف قصص النجاح ←
                  </div>

                </a>


                {/* معلومة في صورة */}

                <a
                  href="/info-in-picture"
                  className="group rounded-3xl border border-[#DCEAF3] bg-[#F8FBFD] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF6FC] text-2xl transition group-hover:scale-105">
                    💡
                  </div>

                  <h3 className="text-xl font-black text-[#183B56]">
                    معلومة في صورة
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#60798A]">
                    معلومات ونصائح صحية مبسطة تساعدك في رحلتك الصحية.
                  </p>

                  <div className="mt-4 font-bold text-[#2F80B7]">
                    شوف المعلومات ←
                  </div>

                </a>

              </div>

            </div>

          </div>


          {/* ================= DOCTOR IMAGE ================= */}

          <div
            className={`order-1 flex ${
              ar
                ? 'justify-center lg:order-2 lg:justify-start'
                : 'justify-center lg:order-1 lg:justify-end'
            }`}
          >

            <div className="relative w-full max-w-[520px] overflow-hidden rounded-[32px] bg-[#F4FAFD] shadow-xl">

              <img
                src="/images/doctor-home.jpg"
                alt="Dr. Mohamed Rohayem"
                className="h-[420px] w-full object-cover object-center sm:h-[520px] lg:h-[600px]"
              />

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}