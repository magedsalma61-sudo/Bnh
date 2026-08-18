'use client'

import './globals.css'
import React, { useState } from 'react'
import Link from 'next/link'
import { CartProvider } from '../components/shop/CartContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguage] =
    useState<'ar' | 'en'>('ar')

  const ar = language === 'ar'

  return (
    <html
      lang={ar ? 'ar' : 'en'}
      dir={ar ? 'rtl' : 'ltr'}
    >
      <body>
        <CartProvider>

          <div className="min-h-screen bg-white">

            {/* ================= HEADER ================= */}

            <header className="sticky top-0 z-50 border-b border-[#DCEAF3] bg-white/95 shadow-sm backdrop-blur">

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* ================= BRAND ================= */}

                <div className="flex items-center justify-center py-5">

                  <Link
                    href="/"
                    className="text-center"
                  >

                    <div className="text-3xl font-black tracking-tight text-[#183B56] sm:text-4xl lg:text-5xl">
                      Dr. Mohamed Rohayem
                    </div>

                    <div className="mt-1 text-sm font-bold text-[#60798A] sm:text-base">
                      {ar
                        ? 'مراكز دكتور محمد رحيم'
                        : 'Dr. Mohamed Rohayem Centers'}
                    </div>

                  </Link>

                </div>

                {/* ================= NAVIGATION ================= */}

                <div className="border-t border-[#DCEAF3]">

                  <nav className="flex flex-wrap items-center justify-center gap-2 py-4 text-sm font-bold sm:gap-3 sm:text-base">

                    {/* ================= الرئيسية ================= */}

                    <Link
                      href="/"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'الرئيسية'
                        : 'Home'}
                    </Link>

                    {/* ================= عن الدكتور ================= */}

                    <Link
                      href="/about"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'عن الدكتور'
                        : 'About Doctor'}
                    </Link>

                    {/* ================= الريفيوهات ================= */}

                    <Link
                      href="/reviews"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'الريفيوهات'
                        : 'Reviews'}
                    </Link>

                    {/* ================= فيديوهات الدكتور ================= */}

                    <Link
                      href="/videos"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'فيديوهات الدكتور'
                        : 'Doctor Videos'}
                    </Link>

                    {/* ================= الخدمات ================= */}

                    <Link
                      href="/services"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'الخدمات'
                        : 'Services'}
                    </Link>

                    {/* ================= الفروع ================= */}

                    <Link
                      href="/branches"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'الفروع'
                        : 'Branches'}
                    </Link>

                    {/* ================= المقالات ================= */}

                    <Link
                      href="/articles"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'مقالات د. محمد رحيم'
                        : 'Dr. Mohamed Rahim Articles'}
                    </Link>

                    {/* ================= تواصل معنا ================= */}

                    <Link
                      href="/contact"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'تواصل معنا'
                        : 'Contact Us'}
                    </Link>

                    {/* ================= الشكاوى والمقترحات ================= */}

                    <Link
                      href="/complaints"
                      className="rounded-2xl border border-[#B7D5E6] bg-[#D7EAF5] px-4 py-2.5 text-[#111827] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9FC7DE] hover:bg-[#B9D9EA] hover:shadow-md"
                    >
                      {ar
                        ? 'الشكاوى والمقترحات'
                        : 'Complaints & Suggestions'}
                    </Link>

                    {/* ================= LANGUAGE ================= */}

                    <button
                      type="button"
                      onClick={() =>
                        setLanguage(
                          ar ? 'en' : 'ar'
                        )
                      }
                      className="rounded-2xl border-2 border-[#2F80B7] bg-white px-4 py-2.5 font-bold text-[#2F80B7] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#2F80B7] hover:text-white hover:shadow-md"
                    >
                      {ar
                        ? 'English'
                        : 'العربية'}
                    </button>

                  </nav>

                </div>

              </div>

            </header>

            {/* ================= PAGE CONTENT ================= */}

            <main>
              {children}
            </main>

          </div>

        </CartProvider>
      </body>
    </html>
  )
}