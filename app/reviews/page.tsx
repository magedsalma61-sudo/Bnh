"use client";

import { useState } from "react";

const reviews = [
  "/images/reviews/review-1.png",
  "/images/reviews/review-2.png",
  "/images/reviews/review-3.png",
  "/images/reviews/review-4.png",
  "/images/reviews/review-5.png",
  "/images/reviews/review-6.png",
  "/images/reviews/review-7.png",
  "/images/reviews/review-8.png",
  "/images/reviews/review-9.png",
  "/images/reviews/review-10.png",
];

export default function ReviewsPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0 ? reviews.length - 1 : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === reviews.length - 1 ? 0 : selectedIndex + 1
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
            ⭐ تجارب حقيقية من عملائنا
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-6xl">
            آراء عملائنا
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-[#60798A] sm:text-xl">
            تجارب حقيقية من عملائنا، وكلماتهم عن رحلتهم معانا ونتائجهم مع
            د. محمد رحيم.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-base font-semibold leading-8 text-[#2F80B7] sm:text-lg">
            ثقتكم هي أكبر نجاح لينا، وسعادتكم بالنتيجة هي الدافع إننا دايمًا
            نقدم الأفضل. ✨
          </p>

        </div>
      </section>

      {/* Reviews Gallery */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {reviews.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group overflow-hidden rounded-[28px] border border-[#DCEAF3] bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden rounded-[22px]">

                  <img
                    src={image}
                    alt={`رأي عميل ${index + 1}`}
                    className="block h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Hover */}
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
              src={reviews[selectedIndex]}
              alt={`رأي عميل ${selectedIndex + 1}`}
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

          </div>

        </div>
      )}
    </main>
  );
}