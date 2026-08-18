'use client'

import React from 'react'

type Service = {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

const services: Service[] = [
  {
    id: 'clinic-consultation',
    title: 'الكشف العادي',
    description:
      'احجز موعدك للكشف في أحد فروع مراكز د. محمد رحيم.',
    icon: '🩺',
    href: '/services/booking',
  },
  {
    id: 'online-consultation',
    title: 'الكشف أونلاين',
    description:
      'احجز استشارتك أونلاين مع د. محمد رحيم من أي مكان.',
    icon: '💻',
    href: '/services/booking',
  },
  {
    id: 'medications',
    title: 'الأدوية',
    description:
      'متابعة الأدوية والتعليمات العلاجية المناسبة لحالتك.',
    icon: '💊',
    href: '/services/medications',
  },
]

export default function ServicesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8F6F8] text-[#183B56]"
    >
      {/* HEADER */}

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] text-3xl">
            🩺
          </div>

          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            خدماتنا
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#60798A] sm:text-lg">
            تعرف على الخدمات التي نقدمها في مراكز
            د. محمد رحيم، واختر الخدمة المناسبة لك.
          </p>

        </div>
      </section>

      {/* SERVICES */}

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-6 md:grid-cols-3">

            {services.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col rounded-3xl border border-[#DCEAF3] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] text-3xl transition group-hover:scale-105">
                  {service.icon}
                </div>

                <h2 className="mt-6 text-xl font-black text-[#183B56]">
                  {service.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#60798A]">
                  {service.description}
                </p>

                <a
                  href={service.href}
                  className="mt-6 rounded-2xl bg-[#2F80B7] px-5 py-3 text-center font-black text-white transition hover:bg-[#256A98]"
                >
                  احجز الآن
                </a>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* WHATSAPP */}

      <section className="pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          <div className="rounded-3xl bg-[#183B56] p-8 text-center text-white shadow-xl sm:p-10">

            <div className="text-4xl">
              💬
            </div>

            <h2 className="mt-4 text-2xl font-black">
              محتاج مساعدة في اختيار الخدمة؟
            </h2>

            <p className="mt-3 leading-8 text-white/80">
              تواصل معنا عبر واتساب وسنساعدك في اختيار
              الخدمة المناسبة.
            </p>

            <a
              href="https://wa.me/201281441562"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-2xl bg-[#25D366] px-7 py-3.5 font-black text-white transition hover:bg-[#1DA851]"
            >
              تواصل معنا عبر واتساب
            </a>

          </div>

        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
        Dr. Mohamed Rohayem — جميع الحقوق محفوظة
      </footer>

    </main>
  )
}