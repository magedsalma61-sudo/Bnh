
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
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')
  const [menuOpen, setMenuOpen] = useState(false)

  const ar = language === 'ar'

  const links = [
    { href: '/', ar: 'الرئيسية', en: 'Home' },
    { href: '/about', ar: 'عن الدكتور', en: 'About Doctor' },
    { href: '/reviews', ar: 'الريفيوهات', en: 'Reviews' },
    { href: '/videos', ar: 'فيديوهات الدكتور', en: 'Doctor Videos' },
    { href: '/services', ar: 'الخدمات', en: 'Services' },
    { href: '/branches', ar: 'الفروع', en: 'Branches' },
    { href: '/articles', ar: 'مقالات د. محمد رحيم', en: 'Doctor Articles' },
    { href: '/contact', ar: 'تواصل معنا', en: 'Contact Us' },
    {
      href: '/complaints',
      ar: 'الشكاوى والمقترحات',
      en: 'Complaints & Suggestions',
    },
  ]

  return (
    <html lang={ar ? 'ar' : 'en'} dir={ar ? 'rtl' : 'ltr'}>
      <body>
        <CartProvider>
          <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-50 border-b border-[#DCEAF3] bg-white/95 shadow-sm backdrop-blur">
              <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="min-w-0 flex-1 text-start"
                  >
                    <div className="whitespace-nowrap text-[clamp(16px,3.5vw,24px)] font-black tracking-tight text-[#183B56] sm:text-4xl lg:text-5xl">
                      Dr. Mohamed Rohayem
                    </div>

                    <div className="mt-1 text-[11px] font-bold text-[#60798A] sm:text-base">
                      {ar
                        ? 'مراكز دكتور محمد رحيم'
                        : 'Dr. Mohamed Rohayem Centers'}
                    </div>
                  </Link>

                  {/* MENU BUTTON */}
                  <button
                    type="button"
                    aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#B7D5E6] bg-[#D7EAF5] px-3 py-3 text-sm font-bold text-[#183B56] shadow-sm transition hover:bg-[#B9D9EA] sm:rounded-2xl sm:px-5 sm:py-3.5 sm:text-base"
                  >
                    {menuOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M4 6h16" />
                        <path d="M4 12h16" />
                        <path d="M4 18h16" />
                      </svg>
                    )}

                    <span>{ar ? 'القائمة' : 'Menu'}</span>
                  </button>
                </div>

                {/* MENU */}
                <div
                  id="main-navigation"
                  aria-hidden={!menuOpen}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    menuOpen
                      ? 'max-h-[700px] translate-y-0 pb-3 opacity-100'
                      : 'pointer-events-none max-h-0 translate-y-[-8px] pb-0 opacity-0'
                  }`}
                >
                  <nav className="grid grid-cols-1 gap-2 border-t border-[#DCEAF3] pt-3 sm:grid-cols-2 lg:grid-cols-3">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        tabIndex={menuOpen ? 0 : -1}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-xl border border-[#DCEAF3] bg-[#F4FAFD] px-4 py-3 text-sm font-bold text-[#183B56] transition hover:border-[#9FC7DE] hover:bg-[#D7EAF5]"
                      >
                        {ar ? link.ar : link.en}
                      </Link>
                    ))}

                    <button
                      type="button"
                      tabIndex={menuOpen ? 0 : -1}
                      onClick={() => {
                        setLanguage(ar ? 'en' : 'ar')
                        setMenuOpen(false)
                      }}
                      className="rounded-xl border border-[#2F80B7] bg-white px-4 py-3 text-sm font-bold text-[#2F80B7] transition hover:bg-[#2F80B7] hover:text-white"
                    >
                      {ar ? 'English' : 'العربية'}
                    </button>
                  </nav>
                </div>
              </div>
            </header>

            {/* PAGE CONTENT */}
            <main>{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
