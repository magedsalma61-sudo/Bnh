import './globals.css'
import React from 'react'
import { CartProvider } from './CartContext'
export const metadata = {
  title: 'BNH Egypt',
  description: 'Premium e-commerce store - BNH Egypt'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <CartProvider>
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
        <div className="min-h-screen flex flex-col bg-[#fafafa]">
          <header className="border-b border-gray-200 bg-white shadow-sm">
            <div className="container py-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    B
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">BNH Egypt</div>
                    <div className="text-sm text-gray-500">متجر صحي ومميز</div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:max-w-2xl">
                  <div className="flex flex-1 items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm">
                    <span className="ml-3 text-gray-400">🔍</span>
                    <input
                      type="text"
                      placeholder="ابحث عن منتج أو فئة"
                      className="w-full border-none bg-transparent text-right text-sm outline-none"
                    />
                  </div>

                  <nav className="flex flex-wrap items-center justify-end gap-3 text-sm font-medium text-gray-700">
                    <a href="#" className="rounded-full px-3 py-2 transition hover:bg-gray-100">التصنيفات</a>
                    <a href="#" className="rounded-full px-3 py-2 transition hover:bg-gray-100">المفضلة</a>
                    <a href="#" className="rounded-full px-3 py-2 transition hover:bg-gray-100">الحساب</a>
                    <a href="#" className="rounded-full bg-primary px-4 py-2 text-white transition hover:bg-red-700">السلة (0)</a>
                  </nav>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 container py-6 sm:py-8 lg:py-10">{children}</main>

          <footer className="border-t border-gray-200 bg-white py-8">
            <div className="container grid gap-8 text-sm text-gray-600 md:grid-cols-3">
              <div>
                <div className="mb-3 font-semibold text-gray-900">BNH Egypt</div>
                <p>متجر إلكتروني حديث يقدم منتجات ذات جودة عالية مع تجربة تسوق مميزة.</p>
              </div>
              <div>
                <div className="mb-3 font-semibold text-gray-900">روابط سريعة</div>
                <ul className="space-y-2">
                  <li>الرئيسية</li>
                  <li>المنتجات</li>
                  <li>الأسئلة الشائعة</li>
                </ul>
              </div>
              <div>
                <div className="mb-3 font-semibold text-gray-900">اتصل بنا</div>
                <ul className="space-y-2">
                  <li>support@bnh-egypt.com</li>
                  <li>+20 100 000 0000</li>
                  <li>القاهرة، مصر</li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
