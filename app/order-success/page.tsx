"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../components/shop/CartContext";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { clearCart } = useCart();

  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8fbfd] px-4 py-16 text-[#183b56] sm:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[36px] bg-white p-8 text-center shadow-xl sm:p-12">

          {/* SUCCESS ICON */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#EAF8F0] text-5xl shadow-sm">
            ✓
          </div>

          {/* TITLE */}
          <h1 className="mt-7 text-3xl font-black sm:text-4xl">
            تم استلام طلبك بنجاح ❤️
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-[#60798A]">
            شكرًا لثقتك في مراكز دكتور محمد رحيم.
            تم تسجيل بيانات طلبك، وسيتم التواصل معك لتأكيد الطلب والتوصيل.
          </p>

          {/* ORDER NUMBER */}
          {orderId && (
            <div className="mt-7 rounded-3xl bg-[#F4FAFD] p-5">
              <p className="text-sm font-bold text-[#60798A]">
                رقم الطلب
              </p>

              <p className="mt-2 text-2xl font-black text-[#2F80B7]">
                {orderId}
              </p>

              <p className="mt-2 text-xs text-[#60798A]">
                احتفظ برقم الطلب للرجوع إليه عند التواصل معنا.
              </p>
            </div>
          )}

          {/* NEXT STEPS */}
          <div className="mt-7 rounded-3xl border border-[#DCEAF3] bg-white p-5 text-right">
            <h2 className="font-black">
              📦 ماذا بعد؟
            </h2>

            <div className="mt-4 space-y-3 text-sm leading-7 text-[#60798A]">
              <p>✓ سيتم مراجعة بيانات الطلب.</p>

              <p>✓ سيتم التواصل معك لتأكيد الطلب.</p>

              <p>✓ بعد التأكيد سيتم تجهيز الطلب للتوصيل.</p>

              <p>
                ✓ تكلفة الشحن تم حسابها حسب المحافظة التي اخترتها.
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/products"
              className="flex items-center justify-center rounded-2xl bg-[#2F80B7] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#246B98]"
            >
              🛍️ العودة للمتجر
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center rounded-2xl border-2 border-[#DCEAF3] bg-white px-6 py-4 font-black transition hover:bg-[#F8FBFD]"
            >
              🏠 الصفحة الرئيسية
            </Link>
          </div>

          {/* WHATSAPP */}
          <div className="mt-7 rounded-3xl bg-[#F0FBF4] p-5">
            <p className="font-bold text-[#285875]">
              محتاج مساعدة بخصوص طلبك؟
            </p>

            <a
              href="https://wa.me/201281441562"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-6 py-3.5 font-black text-white shadow-md transition hover:bg-[#1DA851]"
            >
              💬 تواصل معنا عبر واتساب
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <main
          dir="rtl"
          className="flex min-h-screen items-center justify-center bg-[#f8fbfd] px-4"
        >
          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
            <p className="text-lg font-bold text-[#183b56]">
              جاري تحميل الطلب...
            </p>
          </div>
        </main>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}