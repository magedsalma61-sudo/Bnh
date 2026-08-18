"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../../components/shop/CartContext";

const products = [
  {
    id: "kanova-ultra-old",
    name: "Kanova Ultra القديم",
    price: 1250,
    image: "/images/products/product-1.jpg",
  },
  {
    id: "retox-organic",
    name: "Retox Organic",
    price: 200,
    oldPrice: 250,
    image: "/images/products/product-2.jpg",
  },
  {
    id: "mix-berry",
    name: "Mix Berry",
    price: 200,
    oldPrice: 250,
    image: "/images/products/product-3.jpg",
  },
  {
    id: "snh-support",
    name: "SNH Support",
    price: 450,
    image: "/images/products/product-4.jpg",
  },
  {
    id: "diuretic-tea",
    name: "Diuretic Tea",
    price: 200,
    oldPrice: 450,
    image: "/images/products/product-5.jpg",
  },
  {
    id: "matcha",
    name: "Matcha",
    price: 250,
    oldPrice: 300,
    image: "/images/products/product-6.jpg",
  },
  {
    id: "pms",
    name: "PMS",
    price: 200,
    oldPrice: 250,
    image: "/images/products/product-7.jpg",
  },
  {
    id: "kanova-ultra-new",
    name: "Kanova Ultra الجديد",
    price: 900,
    oldPrice: 1000,
    image: "/images/products/product-8.jpg",
  },
  {
    id: "smoothy",
    name: "Smoothy",
    price: 425,
    image: "/images/products/product-9.jpg",
  },
  {
    id: "her-whey",
    name: "Her Whey",
    price: 700,
    image: "/images/products/product-10.jpg",
  },
  {
    id: "homa-gone",
    name: "HOMA gone",
    price: 425,
    image: "/images/products/product-11.jpg",
  },
  {
    id: "group-one",
    name: "المجموعة الأولى",
    price: 1500,
    oldPrice: 1600,
    image: "/images/products/product-12.jpg",
  },
  {
    id: "group-two",
    name: "المجموعة الثانية",
    price: 1600,
    oldPrice: 2800,
    image: "/images/products/product-13.jpg",
  },
  {
    id: "group-three",
    name: "المجموعة الثالثة",
    price: 2200,
    image: "/images/products/product-14.jpg",
  },
  {
    id: "kanova-fat-burner",
    name: "Kanova Fat Burner",
    price: 1200,
    image: "/images/products/product-15.jpg",
  },
  {
    id: "digestive-tea",
    name: "Digestive Tea",
    price: 200,
    oldPrice: 250,
    image: "/images/products/product-16.jpg",
  },
];

export default function ProductsPage() {
  const { addToCart, totalItems, subtotal, cart } = useCart();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (id: string) => {
    return quantities[id] || 1;
  };

  const increaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: getQuantity(id) + 1,
    }));
  };

  const decreaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, getQuantity(id) - 1),
    }));
  };

  const handleAddToCart = (product: (typeof products)[number]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      category: "products",
      imageUrl: product.image,
      quantity: getQuantity(product.id),
    });
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8fbfd] px-4 py-12 text-[#183b56] sm:py-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= STORE HEADER ================= */}

        <div className="mx-auto mb-8 max-w-3xl text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] text-3xl">
            🛍️
          </div>

          <h1 className="text-4xl font-black sm:text-5xl">
            متجر المنتجات
          </h1>

          <p className="mt-4 text-lg leading-8 text-[#60798A]">
            اختار المنتجات المناسبة ليك وأضفها إلى سلة التسوق لإتمام طلبك.
          </p>

        </div>


        {/* ================= CART BAR ================= */}

        <div className="sticky top-24 z-30 mb-8">

          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-3xl border border-[#DCEAF3] bg-white/95 p-4 shadow-lg backdrop-blur">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6FC] text-2xl">
                🛒
              </div>

              <div>
                <p className="font-black">
                  سلة التسوق
                </p>

                <p className="text-sm text-[#60798A]">
                  {totalItems} منتج
                  {totalItems !== 1 ? "ات" : ""}
                  {" • "}
                  {subtotal} جنيه
                </p>
              </div>

            </div>


            <Link
              href="/cart"
              className={`rounded-2xl px-5 py-3 font-black text-white shadow-md transition ${
                totalItems > 0
                  ? "bg-[#2F80B7] hover:bg-[#246B98]"
                  : "bg-[#A8BBC7] hover:bg-[#91A7B5]"
              }`}
            >
              🛒 عرض السلة
            </Link>

          </div>

        </div>


        {/* ================= PRODUCTS ================= */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product) => {
            const quantity = getQuantity(product.id);

            const cartItem = cart.find(
              (item) => item.id === product.id
            );

            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-[28px] border border-[#DCEAF3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* IMAGE */}

                <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-white p-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />

                  {product.oldPrice && (
                    <div className="absolute right-4 top-4 rounded-full bg-[#E35D6A] px-3 py-1.5 text-xs font-black text-white shadow-md">
                      عرض خاص
                    </div>
                  )}

                </div>


                {/* INFO */}

                <div className="p-5 text-center">

                  <h2 className="min-h-[56px] text-xl font-black text-[#183B56]">
                    {product.name}
                  </h2>


                  {/* PRICE */}

                  <div className="mt-4 flex items-center justify-center gap-3">

                    <span className="text-2xl font-black text-[#2F80B7]">
                      {product.price} جنيه
                    </span>

                    {product.oldPrice && (
                      <span className="text-sm font-bold text-gray-400 line-through">
                        {product.oldPrice} جنيه
                      </span>
                    )}

                  </div>


                  {/* QUANTITY */}

                  <div className="mt-5 flex items-center justify-center gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#DCEAF3] bg-white text-xl font-black transition hover:bg-[#F4FAFD]"
                    >
                      −
                    </button>

                    <div className="flex h-10 min-w-[52px] items-center justify-center rounded-xl bg-[#F4FAFD] font-black">
                      {quantity}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#DCEAF3] bg-white text-xl font-black transition hover:bg-[#F4FAFD]"
                    >
                      +
                    </button>

                  </div>


                  {/* ADD TO CART */}

                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className="mt-5 w-full rounded-2xl bg-[#2F80B7] px-5 py-4 font-black text-white shadow-md transition hover:bg-[#246B98] hover:shadow-lg"
                  >
                    🛒{" "}
                    {cartItem
                      ? "إضافة كمية أخرى للسلة"
                      : "أضف إلى السلة"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>


        {/* ================= SHIPPING ================= */}

        <div className="mt-14 rounded-[28px] bg-white p-6 text-center shadow-sm sm:p-8">

          <h2 className="text-2xl font-black">
            🚚 أسعار الشحن
          </h2>

          <p className="mt-2 text-sm text-[#60798A]">
            يتم حساب الشحن حسب المحافظة عند إتمام الطلب.
          </p>

          <div className="mx-auto mt-5 grid max-w-4xl gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">

            <div className="rounded-2xl bg-[#F4FAFD] p-4 font-bold">
              القاهرة والجيزة
              <br />
              <span className="text-[#2F80B7]">
                50 جنيه
              </span>
            </div>

            <div className="rounded-2xl bg-[#F4FAFD] p-4 font-bold">
              القليوبية
              <br />
              <span className="text-[#2F80B7]">
                65 جنيه
              </span>
            </div>

            <div className="rounded-2xl bg-[#F4FAFD] p-4 font-bold">
              باقي المحافظات
              <br />
              <span className="text-[#2F80B7]">
                75 جنيه
              </span>
            </div>

            <div className="rounded-2xl bg-[#F4FAFD] p-4 font-bold">
              شرم الشيخ
              <br />
              <span className="text-[#2F80B7]">
                130 جنيه
              </span>
            </div>

            <div className="rounded-2xl bg-[#F4FAFD] p-4 font-bold">
              الوادي الجديد
              <br />
              <span className="text-[#2F80B7]">
                130 جنيه
              </span>
            </div>

          </div>

        </div>


        {/* ================= PAYMENT ================= */}

        <div className="mt-6 rounded-[28px] bg-white p-6 text-center shadow-sm sm:p-8">

          <h2 className="text-2xl font-black">
            💳 طرق الدفع
          </h2>

          <p className="mt-4 leading-8 text-[#60798A]">
            الدفع عند الاستلام أو عبر Vodafone Cash أو InstaPay.
            <br />
            في حالة التحويل الإلكتروني، يرجى الاحتفاظ بالإيصال وإرساله عند إتمام الطلب.
          </p>

        </div>

      </div>
    </main>
  );
}