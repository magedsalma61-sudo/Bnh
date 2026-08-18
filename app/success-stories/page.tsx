'use client'

import { useState } from 'react'

const successStories = Array.from(
  { length: 13 },
  (_, i) => `/success-stories/success-${i + 1}.jpg`
)

export default function SuccessStoriesPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openImage = (index: number) => {
    setSelectedIndex(index)
  }

  const closeImage = () => {
    setSelectedIndex(null)
  }

  const showPrevious = () => {
    if (selectedIndex === null) return

    setSelectedIndex(
      selectedIndex === 0
        ? successStories.length - 1
        : selectedIndex - 1
    )
  }

  const showNext = () => {
    if (selectedIndex === null) return

    setSelectedIndex(
      selectedIndex === successStories.length - 1
        ? 0
        : selectedIndex + 1
    )
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FBFD] text-[#183B56]"
    >

      {/* Hero */}
      <section className="px-4 pb-14 pt-14 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-5 inline-flex rounded-full bg-[#EAF6FC] px-5 py-2 text-sm font-bold text-[#2F80B7]">
            ✨ نتائج حقيقية من عملائنا
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-6xl">
            قصص نجاح العملاء
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-[#60798A] sm:text-xl">
            كل رحلة نجاح تبدأ بخطوة.
          </p>

          <p className="mx-auto mt-2 max-w-3xl text-base leading-8 text-[#60798A] sm:text-lg">
            مع برامج متخصصة لإنقاص الوزن وتنسيق القوام، وخطط غذائية وجلسات
            مصممة بما يناسب كل حالة، نساعدك تبدأ رحلة تغيير بخطوات مدروسة. 💪
          </p>

          <p className="mt-5 text-lg font-black text-[#2F80B7]">
            والنتائج؟ شوف بنفسك قصص نجاح عملائنا. ✨
          </p>

        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {successStories.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => openImage(index)}
                className="group relative overflow-hidden rounded-[28px] border border-[#DCEAF3] bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >

                <div className="relative overflow-hidden rounded-[22px] bg-[#F1F6F8]">

                  <img
                    src={image}
                    alt={`قصة نجاح العميل ${index + 1}`}
                    className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/20">
                    <span className="rounded-full bg-white/90 px-5 py-3 text-sm font-black text-[#183B56] opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                      اضغط لعرض الصورة
                    </span>
                  </div>

                </div>

              </button>
            ))}

          </div>

        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={closeImage}
        >

          {/* Close */}
          <button
            type="button"
            onClick={closeImage}
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-black text-[#183B56] shadow-xl"
            aria-label="إغلاق"
          >
            ×
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showPrevious()
            }}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-black text-[#183B56] shadow-xl sm:right-8"
            aria-label="الصورة السابقة"
          >
            →
          </button>

          {/* Image */}
          <div
            className="flex max-h-[90vh] max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={successStories[selectedIndex]}
              alt={`قصة نجاح العميل ${selectedIndex + 1}`}
              className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />

          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-black text-[#183B56] shadow-xl sm:left-8"
            aria-label="الصورة التالية"
          >
            ←
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#183B56] shadow-lg">
            {selectedIndex + 1} / {successStories.length}
          </div>

        </div>
      )}

    </main>
  )
}