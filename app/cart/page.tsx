"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../../components/shop/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
  } = useCart();

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8fbfd] px-4 py-12 text-[#183b56] sm:py-16"
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] text-3xl">
            🛒
          </div>

          <h1 className="text-4xl font-black sm:text-5xl">
            سلة التسوق
          </h1>

          <p className="mt-3 text-lg text-[#60798A]">
            راجع المنتجات والكميات قبل إتمام الطلب.
          </p>

        </div>


        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <div className="rounded-[32px] bg-white p-10 text-center shadow-xl sm:p-16">

            <div className="text-6xl">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-black">
              السلة فاضية
            </h2>

            <p className="mt-3 text-[#60798A]">
              لسه مفيش منتجات في سلة التسوق.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex rounded-2xl bg-[#2F80B7] px-7 py-4 font-black text-white shadow-lg transition hover:bg-[#246B98]"
            >
              ← تصفح المنتجات
            </Link>

          </div>

        ) : (

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

            {/* PRODUCTS */}

            <div className="space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="rounded-[28px] border border-[#DCEAF3] bg-white p-4 shadow-sm sm:p-5"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    {/* IMAGE */}

                    <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-2xl bg-[#F8FBFD] sm:w-32">

                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-4xl">
                          🛍️
                        </span>
                      )}

                    </div>


                    {/* INFO */}

                    <div className="flex-1">

                      <h2 className="text-xl font-black">
                        {item.name}
                      </h2>

                      <div className="mt-2 flex items-center gap-3">

                        <span className="text-lg font-black text-[#2F80B7]">
                          {item.price} جنيه
                        </span>

                        {item.oldPrice && (
                          <span className="text-sm font-bold text-gray-400 line-through">
                            {item.oldPrice} جنيه
                          </span>
                        )}

                      </div>


                      {/* QUANTITY */}

                      <div className="mt-4 flex items-center gap-3">

                        <span className="text-sm font-bold text-[#60798A]">
                          الكمية
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#DCEAF3] font-black transition hover:bg-[#F4FAFD]"
                        >
                          −
                        </button>

                        <span className="flex h-9 min-w-[42px] items-center justify-center rounded-xl bg-[#F4FAFD] font-black">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#DCEAF3] font-black transition hover:bg-[#F4FAFD]"
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* ITEM TOTAL */}

                    <div className="text-right sm:min-w-[140px] sm:text-center">

                      <p className="text-sm font-bold text-[#60798A]">
                        الإجمالي
                      </p>

                      <p className="mt-1 text-2xl font-black text-[#183B56]">
                        {item.price * item.quantity} جنيه
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="mt-3 text-sm font-bold text-[#E35D6A] transition hover:underline"
                      >
                        🗑️ حذف
                      </button>

                    </div>

                  </div>

                </div>

              ))}


              {/* ACTIONS */}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">

                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-2xl border-2 border-[#DCEAF3] bg-white px-6 py-3.5 font-black transition hover:bg-[#F4FAFD]"
                >
                  ← إضافة منتجات أخرى
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-2xl px-6 py-3.5 font-black text-[#E35D6A] transition hover:bg-[#FFF5F6]"
                >
                  🗑️ تفريغ السلة
                </button>

              </div>

            </div>


            {/* SUMMARY */}

            <aside className="h-fit rounded-[32px] bg-white p-6 shadow-xl lg:sticky lg:top-28">

              <h2 className="text-2xl font-black">
                ملخص الطلب
              </h2>


              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-[#60798A]">
                    المنتجات
                  </span>

                  <span className="font-black">
                    {subtotal} جنيه
                  </span>

                </div>


                <div className="flex items-center justify-between">

                  <span className="text-[#60798A]">
                    الشحن
                  </span>

                  <span className="font-black text-[#2F80B7]">
                    يُحسب لاحقًا
                  </span>

                </div>


                <div className="border-t border-[#DCEAF3] pt-4">

                  <div className="flex items-center justify-between">

                    <span className="text-lg font-black">
                      الإجمالي
                    </span>

                    <span className="text-2xl font-black text-[#2F80B7]">
                      {total} جنيه
                    </span>

                  </div>

                </div>

              </div>


              {/* CHECKOUT */}

              <Link
                href="/checkout"
                className="mt-7 flex w-full items-center justify-center rounded-2xl bg-[#2F80B7] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#246B98] hover:shadow-xl"
              >
                إتمام الطلب ←
              </Link>


              <p className="mt-4 text-center text-xs leading-6 text-[#60798A]">
                سيتم حساب تكلفة الشحن حسب المحافظة في الخطوة التالية.
              </p>

            </aside>

          </div>

        )}

      </div>
    </main>
  );
}