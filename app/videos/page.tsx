'use client'

import React from 'react'

/* =========================================================
   الفيديوهات
   ========================================================= */

const VIDEOS = Array.from(
  { length: 14 },
  (_, index) => ({
    id: index + 1,
    src: `/videos/${index + 1}.mp4`,
  })
)

/* =========================================================
   الصفحة
   ========================================================= */

export default function VideosPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FBFD] text-[#183B56]"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-[#DCEAF3] bg-white">

        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] text-3xl shadow-sm">
            🎬
          </div>

          <div className="mb-4 inline-flex rounded-full bg-[#DCEFFC] px-5 py-2 text-sm font-black text-[#1F6F9F]">
            فيديوهات الدكتور
          </div>

          <h1 className="text-4xl font-black tracking-tight text-[#183B56] sm:text-5xl">
            فيديوهات دكتور محمد رحيم
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#60798A]">
            مجموعة من الفيديوهات والمحتوى التوعوي
            لمساعدتك على فهم صحتك ورحلتك العلاجية بشكل
            أبسط.
          </p>

        </div>

      </section>


      {/* =====================================================
          VIDEOS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h2 className="text-2xl font-black text-[#183B56] sm:text-3xl">
              أحدث الفيديوهات
            </h2>

            <p className="mt-2 text-[#60798A]">
              شاهد الفيديو واختر المحتوى الذي يهمك.
            </p>

          </div>

          <div className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2F80B7] shadow-sm ring-1 ring-[#DCEAF3]">
            {VIDEOS.length} فيديو
          </div>

        </div>


        {/* ===================================================
            GRID
        =================================================== */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {VIDEOS.map((video) => (

            <article
              key={video.id}
              className="group overflow-hidden rounded-[28px] border border-[#DCEAF3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* =============================================
                  VIDEO
              ============================================= */}

              <div className="relative aspect-[9/16] overflow-hidden bg-[#102B3D]">

                <video
                  src={video.src}
                  controls
                  preload="metadata"
                  playsInline
                  className="h-full w-full object-cover"
                />

              </div>


              {/* =============================================
                  INFO
              ============================================= */}

              <div className="p-5">

                <div className="mb-3 inline-flex rounded-full bg-[#EAF6FC] px-3 py-1 text-xs font-black text-[#2F80B7]">
                  فيديو {video.id}
                </div>

                <h3 className="text-lg font-black text-[#183B56]">
                  فيديو دكتور محمد رحيم
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#60798A]">
                  شاهد الفيديو واستفد من المحتوى التوعوي.
                </p>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          FOOTER CTA
      ===================================================== */}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-[#EAF6FC] px-6 py-10 text-center sm:px-10">

          <div className="mx-auto max-w-2xl">

            <h2 className="text-2xl font-black text-[#183B56] sm:text-3xl">
              محتاج تعرف أكتر؟
            </h2>

            <p className="mt-3 leading-7 text-[#60798A]">
              تقدر تتواصل مع مراكز دكتور محمد رحيم
              لمعرفة الخدمة المناسبة ليك.
            </p>

            <a
              href="/services"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#2F80B7] px-7 py-3.5 font-black text-white shadow-lg transition hover:bg-[#23658F] hover:shadow-xl"
            >
              اكتشف الخدمات ←
            </a>

          </div>

        </div>

      </section>

    </main>
  )
}