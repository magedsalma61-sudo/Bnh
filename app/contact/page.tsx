"use client";

import React from "react";

const WHATSAPP_NUMBER = "201281441562";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "أهلاً، أرغب في التواصل مع مراكز دكتور محمد رحيم."
);

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const facebookUrl = "https://www.facebook.com/share/191Rzi8oN2/";

const instagramUrl =
  "https://www.instagram.com/drmrohayem?igsh=OGVyZXdzbzU4cjdy";

const tiktokUrl =
  "https://www.tiktok.com/@dr.mrohayem?_r=1&_t=ZS-98qbclqtemg";

const youtubeUrl = "https://youtube.com/@dr.mohamedrohayem";

const threadsUrl = "https://www.threads.com/@drmrohayem";

export default function ContactPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8fbfd] px-4 py-10 text-[#183b56] sm:py-16"
    >
      <div className="mx-auto max-w-5xl">

        {/* ================= TITLE ================= */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] text-3xl">
            💙
          </div>

          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            تواصل معنا
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#60798a] sm:text-lg">
            يسعدنا تواصلكم معنا ❤️
            <br />
            لو حابب تتواصل معانا أو تتابع كل جديد، تقدر تختار المنصة
            المناسبة ليك من الروابط التالية.
          </p>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ================= IMAGE ================= */}

          <div className="overflow-hidden rounded-[32px] bg-white shadow-xl">

            <img
              src="/images/contact-doctor.jpg"
              alt="Dr. Mohamed Rohayem"
              className="h-[420px] w-full object-cover object-center sm:h-[520px]"
            />

          </div>


          {/* ================= SOCIAL LINKS ================= */}

          <div className="rounded-[32px] bg-white p-6 shadow-xl sm:p-10">

            <h2 className="text-2xl font-black sm:text-3xl">
              اختار طريقة التواصل المناسبة ليك
            </h2>

            <p className="mt-3 text-base leading-7 text-[#60798a]">
              يمكنك التواصل معنا مباشرة أو متابعة حساباتنا على منصات
              التواصل الاجتماعي.
            </p>


            {/* ================= LINKS ================= */}

            <div className="mt-7 flex flex-col gap-4">

              {/* WhatsApp */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 font-black text-white shadow-md transition hover:bg-[#1DA851] hover:shadow-lg"
              >
                💬 تواصل معنا عبر واتساب
              </a>


              {/* Facebook */}

              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-2xl bg-[#1877F2] px-6 py-4 font-black text-white shadow-md transition hover:opacity-90 hover:shadow-lg"
              >
                📘 تابعنا على فيسبوك
              </a>


              {/* Instagram */}

              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-2xl bg-[#E4405F] px-6 py-4 font-black text-white shadow-md transition hover:opacity-90 hover:shadow-lg"
              >
                📸 تابعنا على إنستجرام
              </a>


              {/* TikTok */}

              <a
                href={tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-2xl bg-[#111111] px-6 py-4 font-black text-white shadow-md transition hover:bg-black hover:shadow-lg"
              >
                🎵 تابعنا على تيك توك
              </a>


              {/* YouTube */}

              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-2xl bg-[#FF0000] px-6 py-4 font-black text-white shadow-md transition hover:bg-[#D90000] hover:shadow-lg"
              >
                ▶️ تابعنا على يوتيوب
              </a>


              {/* Threads */}

              <a
                href={threadsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-2xl bg-[#000000] px-6 py-4 font-black text-white shadow-md transition hover:bg-[#222222] hover:shadow-lg"
              >
                🧵 تابعنا على Threads
              </a>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM MESSAGE ================= */}

        <div className="mt-10 rounded-[28px] bg-white p-6 text-center shadow-lg sm:p-8">

          <h2 className="text-2xl font-black">
            نحن دائمًا سعداء بتواصلكم ❤️
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-8 text-[#60798a]">
            سواء كان لديك استفسار أو ترغب في معرفة المزيد عن خدماتنا،
            فريقنا يسعده مساعدتك والرد على استفساراتك.
          </p>

        </div>

      </div>
    </main>
  );
}