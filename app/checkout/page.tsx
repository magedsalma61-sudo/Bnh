"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/shop/CartContext";

const GOOGLE_SHEET_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxgtClt8TIFnqnBDBfShHbWHvnpExvvWOAKzNOOb2pTtUyCzTA_-8-yi1dGlxSj5guROA/exec";

const VODAFONE_CASH_NUMBER = "01000225449";
const INSTAPAY_NUMBER = "01141336908";

const shippingRates: Record<string, number> = {
  "القاهرة والجيزة": 50,
  "القليوبية": 65,
  "باقي المحافظات": 75,
  "شرم الشيخ": 130,
  "الوادي الجديد": 130,
};

const paymentMethods = [
  {
    id: "cod",
    title: "الدفع عند الاستلام",
    icon: "💵",
  },
  {
    id: "vodafone",
    title: "Vodafone Cash",
    icon: "📱",
  },
  {
    id: "instapay",
    title: "InstaPay",
    icon: "💳",
  },
];

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, subtotal, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // =========================
  // RECEIPT
  // =========================

  const [receiptFile, setReceiptFile] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const shipping = useMemo(() => {
    return shippingRates[governorate] || 0;
  }, [governorate]);

  const total =
    Number(subtotal) + Number(shipping);

  const isTransfer =
    paymentMethod === "vodafone" ||
    paymentMethod === "instapay";

  // =========================
  // PAYMENT CHANGE
  // =========================

  const handlePaymentChange = (
    method: string
  ) => {
    setPaymentMethod(method);
    setErrorMessage("");

    // لو اختار الدفع عند الاستلام
    // نخفي ونمسح الإيصال
    if (method === "cod") {
      setReceiptFile(null);

      const input =
        document.getElementById(
          "receipt-upload"
        ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }
    }
  };

  // =========================
  // RECEIPT CHANGE
  // =========================

  const handleReceiptChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrorMessage("");

    const file =
      event.target.files?.[0];

    if (!file) {
      setReceiptFile(null);
      return;
    }

    // الصور فقط
    if (!file.type.startsWith("image/")) {
      setErrorMessage(
        "من فضلك اختار صورة لإيصال التحويل."
      );

      event.target.value = "";
      setReceiptFile(null);

      return;
    }

    // أقصى حجم 10 ميجا
    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setErrorMessage(
        "حجم صورة الإيصال لازم يكون أقل من 10 ميجا."
      );

      event.target.value = "";
      setReceiptFile(null);

      return;
    }

    setReceiptFile(file);
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    if (!name.trim()) {
      return "من فضلك اكتب الاسم بالكامل.";
    }

    if (!phone.trim()) {
      return "من فضلك اكتب رقم التليفون.";
    }

    if (!whatsapp.trim()) {
      return "من فضلك اكتب رقم الواتساب.";
    }

    if (!governorate) {
      return "من فضلك اختر المحافظة.";
    }

    if (!address.trim()) {
      return "من فضلك اكتب العنوان بالتفصيل.";
    }

    if (!paymentMethod) {
      return "من فضلك اختر طريقة الدفع.";
    }

    // الإيصال إجباري للتحويل الإلكتروني
    if (
      isTransfer &&
      !receiptFile
    ) {
      return "من فضلك ارفع صورة إيصال التحويل.";
    }

    return "";
  };

  // =========================
  // FILE TO BASE64
  // =========================

  const fileToBase64 = (
    file: File
  ): Promise<string> => {
    return new Promise(
      (resolve, reject) => {
        const reader =
          new FileReader();

        reader.onload = () => {
          const result =
            reader.result;

          if (
            typeof result !==
            "string"
          ) {
            reject(
              new Error(
                "تعذر قراءة ملف الإيصال."
              )
            );

            return;
          }

          const parts =
            result.split(",");

          if (parts.length < 2) {
            reject(
              new Error(
                "ملف الإيصال غير صالح."
              )
            );

            return;
          }

          resolve(parts[1]);
        };

        reader.onerror = () => {
          reject(
            new Error(
              "تعذر قراءة صورة الإيصال."
            )
          );
        };

        reader.readAsDataURL(file);
      }
    );
  };

  // =========================
  // SUBMIT ORDER
  // =========================

  const submitOrder = async () => {
    setErrorMessage("");

    if (cart.length === 0) {
      setErrorMessage(
        "السلة فارغة. من فضلك أضف منتجات أولًا."
      );

      return;
    }

    const validationError =
      validateForm();

    if (validationError) {
      setErrorMessage(
        validationError
      );

      return;
    }

    setLoading(true);

    try {
      let receiptBase64 = "";

      // تحويل صورة الإيصال إلى Base64
      if (
        isTransfer &&
        receiptFile
      ) {
        receiptBase64 =
          await fileToBase64(
            receiptFile
          );
      }

      const order = {
        orderId:
          `ORD-${Date.now()}`,

        customer: {
          name: name.trim(),
          phone: phone.trim(),
          whatsapp:
            whatsapp.trim(),
          governorate,
          address:
            address.trim(),
          notes:
            notes.trim(),
        },

        products: cart.map(
          (item) => ({
            id: item.id,
            name: item.name,
            price:
              Number(item.price),
            quantity:
              Number(item.quantity),
            total:
              Number(item.price) *
              Number(item.quantity),
          })
        ),

        paymentMethod,

        subtotal:
          Number(subtotal),

        shipping:
          Number(shipping),

        total:
          Number(total),

        createdAt:
          new Date().toISOString(),

        // =========================
        // RECEIPT
        // =========================

        receipt:
          isTransfer &&
          receiptFile
            ? {
                fileName:
                  receiptFile.name,

                fileType:
                  receiptFile.type,

                fileSize:
                  receiptFile.size,

                base64:
                  receiptBase64,
              }
            : null,
      };

      // =========================
      // SEND TO GOOGLE SHEET
      // =========================

      await fetch(
        GOOGLE_SHEET_WEB_APP_URL,
        {
          method: "POST",

          mode: "no-cors",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body: JSON.stringify({
            order,
          }),
        }
      );

      // =========================
      // SAVE LOCAL ORDER
      // =========================

      localStorage.setItem(
        "bnh-last-order",
        JSON.stringify(order)
      );

      // =========================
      // CLEAR CART
      // =========================

      clearCart();

      // =========================
      // SUCCESS PAGE
      // =========================

      router.push(
        `/order-success?orderId=${encodeURIComponent(
          order.orderId
        )}`
      );
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "حصلت مشكلة أثناء إرسال الطلب. حاول مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#f8fbfd] px-4 py-16 text-[#183b56]"
      >
        <div className="mx-auto max-w-2xl">

          <div className="rounded-[32px] bg-white p-10 text-center shadow-xl sm:p-16">

            <div className="text-6xl">
              🛒
            </div>

            <h1 className="mt-6 text-3xl font-black">
              السلة فاضية
            </h1>

            <p className="mt-4 leading-8 text-[#60798A]">
              لازم تضيف منتج واحد على الأقل قبل إتمام الطلب.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-2xl bg-[#2F80B7] px-7 py-4 font-black text-white shadow-lg transition hover:bg-[#246B98]"
            >
              ← العودة للمنتجات
            </Link>

          </div>

        </div>
      </main>
    );
  }

  // =========================
  // CHECKOUT
  // =========================

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8fbfd] px-4 py-10 text-[#183b56] sm:py-16"
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] text-3xl">
            📦
          </div>

          <h1 className="text-4xl font-black sm:text-5xl">
            إتمام الطلب
          </h1>

          <p className="mt-4 text-lg leading-8 text-[#60798A]">
            اكتب بياناتك واختار طريقة الدفع لإتمام طلبك.
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* =========================
              FORM
          ========================= */}

          <div className="space-y-6">

            {/* CUSTOMER DATA */}

            <section className="rounded-[32px] bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-7">

                <h2 className="text-2xl font-black">
                  👤 بيانات العميل
                </h2>

                <p className="mt-2 text-sm text-[#60798A]">
                  البيانات دي هنستخدمها لتأكيد وتوصيل الطلب.
                </p>

              </div>

              <div>

                <label className="mb-2 block font-bold">
                  الاسم بالكامل
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="اكتب اسمك بالكامل"
                  className="w-full rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 outline-none transition focus:border-[#2F80B7] focus:bg-white"
                />

              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block font-bold">
                    رقم التليفون
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 text-left outline-none transition focus:border-[#2F80B7] focus:bg-white"
                  />

                </div>

                <div>

                  <label className="mb-2 block font-bold">
                    رقم الواتساب
                  </label>

                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) =>
                      setWhatsapp(
                        e.target.value
                      )
                    }
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 text-left outline-none transition focus:border-[#2F80B7] focus:bg-white"
                  />

                </div>

              </div>

            </section>

            {/* ADDRESS */}

            <section className="rounded-[32px] bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-2xl font-black">
                📍 بيانات التوصيل
              </h2>

              <div className="mt-7">

                <label className="mb-2 block font-bold">
                  المحافظة
                </label>

                <select
                  value={governorate}
                  onChange={(e) =>
                    setGovernorate(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 outline-none transition focus:border-[#2F80B7] focus:bg-white"
                >

                  <option value="">
                    اختر المحافظة
                  </option>

                  <option value="القاهرة والجيزة">
                    القاهرة والجيزة — 50 جنيه
                  </option>

                  <option value="القليوبية">
                    القليوبية — 65 جنيه
                  </option>

                  <option value="باقي المحافظات">
                    باقي المحافظات — 75 جنيه
                  </option>

                  <option value="شرم الشيخ">
                    شرم الشيخ — 130 جنيه
                  </option>

                  <option value="الوادي الجديد">
                    الوادي الجديد — 130 جنيه
                  </option>

                </select>

              </div>

              <div className="mt-5">

                <label className="mb-2 block font-bold">
                  العنوان بالتفصيل
                </label>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  placeholder="اكتب المنطقة والشارع ورقم العمارة والشقة وأي تفاصيل تساعد في التوصيل"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 leading-8 outline-none transition focus:border-[#2F80B7] focus:bg-white"
                />

              </div>

              <div className="mt-5">

                <label className="mb-2 block font-bold">
                  ملاحظات إضافية

                  <span className="mr-2 text-sm font-normal text-[#60798A]">
                    اختياري
                  </span>

                </label>

                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(
                      e.target.value
                    )
                  }
                  placeholder="أي ملاحظات خاصة بالطلب أو التوصيل..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 leading-8 outline-none transition focus:border-[#2F80B7] focus:bg-white"
                />

              </div>

            </section>

            {/* PAYMENT */}

            <section className="rounded-[32px] bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-2xl font-black">
                💳 طريقة الدفع
              </h2>

              <div className="mt-6 grid gap-3">

                {paymentMethods.map(
                  (method) => (

                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        handlePaymentChange(
                          method.id
                        )
                      }
                      className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-right transition ${
                        paymentMethod ===
                        method.id
                          ? "border-[#2F80B7] bg-[#F0F8FC]"
                          : "border-[#DCEAF3] bg-[#F8FBFD] hover:border-[#2F80B7]"
                      }`}
                    >

                      <span className="text-2xl">
                        {method.icon}
                      </span>

                      <span className="font-black">
                        {method.title}
                      </span>

                      <span
                        className={`mr-auto flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          paymentMethod ===
                          method.id
                            ? "border-[#2F80B7] bg-[#2F80B7]"
                            : "border-[#B8CAD5]"
                        }`}
                      >

                        {paymentMethod ===
                          method.id && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}

                      </span>

                    </button>

                  )
                )}

              </div>

              {/* TRANSFER */}

              {isTransfer && (

                <div className="mt-6 rounded-3xl bg-[#FFF9E8] p-5">

                  <h3 className="font-black">
                    🧾 بيانات التحويل
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#60798A]">
                    حوّل المبلغ أولًا، وبعدها ارفع Screenshot لإيصال التحويل.
                  </p>

                  {/* VODAFONE */}

                  {paymentMethod ===
                    "vodafone" && (

                    <div className="mt-4 rounded-2xl bg-white p-5">

                      <p className="text-sm font-bold text-[#60798A]">
                        رقم Vodafone Cash
                      </p>

                      <p
                        dir="ltr"
                        className="mt-2 text-center text-2xl font-black tracking-wider text-[#2F80B7]"
                      >
                        {VODAFONE_CASH_NUMBER}
                      </p>

                    </div>

                  )}

                  {/* INSTAPAY */}

                  {paymentMethod ===
                    "instapay" && (

                    <div className="mt-4 rounded-2xl bg-white p-5">

                      <p className="text-sm font-bold text-[#60798A]">
                        رقم InstaPay
                      </p>

                      <p
                        dir="ltr"
                        className="mt-2 text-center text-2xl font-black tracking-wider text-[#2F80B7]"
                      >
                        {INSTAPAY_NUMBER}
                      </p>

                    </div>

                  )}

                  {/* RECEIPT */}

                  <div className="mt-5">

                    <label className="mb-2 block font-black">

                      إيصال الدفع

                      <span className="mr-1 text-[#E35D6A]">
                        *
                      </span>

                    </label>

                    <label
                      htmlFor="receipt-upload"
                      className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-[#BFD8E6] bg-white p-5 transition hover:border-[#2F80B7] hover:bg-[#F8FBFD]"
                    >

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF6FC] text-2xl">
                        📎
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="font-black text-[#183B56]">

                          {receiptFile
                            ? "تم اختيار الإيصال ✓"
                            : "إرفاق إيصال التحويل"}

                        </p>

                        <p className="mt-1 truncate text-sm text-[#60798A]">

                          {receiptFile
                            ? receiptFile.name
                            : "اضغط هنا لاختيار صورة الإيصال"}

                        </p>

                      </div>

                      <div className="rounded-xl bg-[#2F80B7] px-4 py-2 text-sm font-black text-white">
                        اختيار ملف
                      </div>

                    </label>

                    <input
                      id="receipt-upload"
                      type="file"
                      accept="image/*"
                      onChange={
                        handleReceiptChange
                      }
                      className="hidden"
                    />

                    <p className="mt-2 text-xs leading-6 text-[#60798A]">
                      صورة الإيصال مطلوبة لإتمام الدفع الإلكتروني. الحد الأقصى 10 ميجا.
                    </p>

                  </div>

                </div>

              )}

            </section>

            {/* ERROR */}

            {errorMessage && (

              <div className="rounded-2xl border border-[#F3C2C8] bg-[#FFF5F6] p-4 font-bold text-[#C83D4B]">
                ⚠️ {errorMessage}
              </div>

            )}

          </div>

          {/* SUMMARY */}

          <aside className="h-fit rounded-[32px] bg-white p-6 shadow-xl lg:sticky lg:top-28">

            <h2 className="text-2xl font-black">
              ملخص الطلب
            </h2>

            <div className="mt-6 space-y-4">

              {cart.map(
                (item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F8FBFD]">

                      {item.imageUrl ? (

                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain p-1"
                        />

                      ) : (
                        "🛍️"
                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate font-black">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-[#60798A]">
                        {item.quantity} × {item.price} جنيه
                      </p>

                    </div>

                    <p className="font-black">
                      {Number(item.price) *
                        Number(item.quantity)}
                    </p>

                  </div>

                )
              )}

            </div>

            <div className="mt-6 border-t border-[#DCEAF3] pt-5">

              <div className="flex items-center justify-between">

                <span className="text-[#60798A]">
                  إجمالي المنتجات
                </span>

                <span className="font-black">
                  {subtotal} جنيه
                </span>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <span className="text-[#60798A]">
                  الشحن
                </span>

                <span className="font-black text-[#2F80B7]">

                  {shipping > 0
                    ? `${shipping} جنيه`
                    : "اختر المحافظة"}

                </span>

              </div>

              <div className="mt-5 border-t border-[#DCEAF3] pt-5">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-black">
                    الإجمالي النهائي
                  </span>

                  <span className="text-2xl font-black text-[#2F80B7]">
                    {total} جنيه
                  </span>

                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={submitOrder}
              disabled={loading}
              className="mt-7 w-full rounded-2xl bg-[#2F80B7] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#246B98] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "جاري إرسال الطلب..."
                : "تأكيد الطلب ✓"}

            </button>

            <Link
              href="/cart"
              className="mt-3 flex w-full items-center justify-center rounded-2xl border-2 border-[#DCEAF3] bg-white px-6 py-3.5 font-black transition hover:bg-[#F8FBFD]"
            >
              ← الرجوع للسلة
            </Link>

            <p className="mt-5 text-center text-xs leading-6 text-[#60798A]">
              بمراجعة الطلب والضغط على تأكيد الطلب، أنت تؤكد صحة بيانات التواصل والتوصيل.
            </p>

          </aside>

        </div>

      </div>
    </main>
  );
}