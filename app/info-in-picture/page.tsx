"use client";

import { useState } from "react";

const infoImages = Array.from(
  { length: 21 },
  (_, i) => `/info-in-picture/info-${i + 1}.jpg`
);

export default function InfoInPicturePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? infoImages.length - 1
        : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === infoImages.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FBFD] text-[#183B56]"
    >
      {/* Header */}
      <section className="px-4 pb-12 pt-14 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-5 inline-flex rounded-full bg-[#EAF6FC] px-5 py-2 text-sm font-bold text-[#2F80B7]">
            💡 معلومات مفيدة
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-6xl">
            معلومة في صورة
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-[#60798A] sm:text-xl">
            معلومات ونصائح صحية مبسطة تساعدك تفهم جسمك وتاخد خطوات أفضل
            في رحلتك الصحية.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-base font-semibold leading-8 text-[#2F80B7] sm:text-lg">
            خليك دايمًا على اطلاع، لأن المعلومة الصح ممكن تكون بداية تغيير
            حقيقي. ✨
          </p>

        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {infoImages.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group overflow-hidden rounded-[28px] border border-[#DCEAF3] bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden rounded-[22px]">

                  <img
                    src={image}
                    alt={`معلومة صحية ${index + 1}`}
                    className="block h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/20">

                    <span className="rounded-full bg-white/95 px-5 py-3 text-sm font-black text-[#183B56] opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                      اضغط لعرض الصورة
                    </span>

                  </div>

                </div>
              </button>
            ))}

          </div>

        </div>
      </section>

      {/* Image Viewer */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeImage}
        >
          <div
            className="relative flex max-h-[92vh] max-w-5xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Image */}
            <img
              src={infoImages[selectedIndex]}
              alt={`معلومة صحية ${selectedIndex + 1}`}
              className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />

            {/* Close */}
            <button
              type="button"
              onClick={closeImage}
              className="absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-black text-[#183B56] shadow-lg transition hover:scale-110"
              aria-label="إغلاق"
            >
              ×
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={showPrevious}
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#183B56] shadow-lg transition hover:scale-110 md:-right-16"
              aria-label="الصورة السابقة"
            >
              →
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={showNext}
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#183B56] shadow-lg transition hover:scale-110 md:-left-16"
              aria-label="الصورة التالية"
            >
              ←
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-5 py-2 text-sm font-semibold text-white">
              {selectedIndex + 1} / {infoImages.length}
            </div>

          </div>
        </div>
      )}
    </main>
  );
}