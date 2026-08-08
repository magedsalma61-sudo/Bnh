import './globals.css'
import React from 'react'
import { CartProvider } from '../components/shop/CartContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#fafafa]">
            <header className="border-b border-gray-200 bg-white shadow-sm">
              <div className="container py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                      B
                    </div>

                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        BNH Egypt
                      </div>
                      <div className="text-sm text-gray-500">
                        متجر صحي ومميز
                      </div>
                    </div>
                  </div>

                  <nav className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <a
                      href="#"
                      className="rounded-full px-3 py-2 hover:bg-gray-100"
                    >
                      التصنيفات
                    </a>

                    <a
                      href="#"
                      className="rounded-full px-3 py-2 hover:bg-gray-100"
                    >
                      المفضلة
                    </a>

                    <a
                      href="#"
                      className="rounded-full px-3 py-2 hover:bg-gray-100"
                    >
                      الحساب
                    </a>

                    <a
                      href="#"
                      className="rounded-full bg-primary px-4 py-2 text-white hover:bg-red-700"
                    >
                      السلة (0)
                    </a>
                  </nav>
                </div>
              </div>
            </header>

            <main className="container flex-1 py-6 sm:py-8 lg:py-10">
              {children}
            </main>

            <footer className="border-t border-gray-200 bg-white py-8">
              <div className="container grid gap-8 text-sm text-gray-600 md:grid-cols-3">
                <div>
                  <div className="mb-3 font-semibold text-gray-900">
                    BNH Egypt
                  </div>

                  <p>
                    متجر إلكتروني حديث يقدم منتجات ذات جودة عالية مع تجربة
                    تسوق مميزة.
                  </p>
                </div>

                <div>
                  <div className="mb-3 font-semibold text-gray-900">
                    روابط سريعة
                  </div>

                  <ul className="space-y-2">
                    <li>الرئيسية</li>
                    <li>المنتجات</li>
                    <li>الأسئلة الشائعة</li>
                  </ul>
                </div>

                <div>
                  <div className="mb-3 font-semibold text-gray-900">
                    اتصل بنا
                  </div>

                  <ul className="space-y-2">
                    <li>support@bnh-egypt.com</li>
                    <li>01281441562</li>
                    <li>القاهرة، مصر</li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}