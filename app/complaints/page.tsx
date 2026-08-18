"use client";

import { useState } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzer1sXlAhklf3JaOVbJN8aNLdMmhi4_MKJ5Op7JelO6WSApTGk7tgyIa2-0FoiPnPo/exec";

const WHATSAPP_NUMBER = "201281441562";

export default function ComplaintsPage() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const goToStepTwo = () => {
    if (!name.trim() || !phone.trim() || !whatsapp.trim() || !type) {
      alert("من فضلك أكمل البيانات المطلوبة");
      return;
    }

    setStep(2);
  };

  const sendForm = async () => {
    if (!message.trim()) {
      alert("من فضلك اكتب تفاصيل الشكوى أو الاقتراح");
      return;
    }

    setLoading(true);

    try {
      const formData = new URLSearchParams();

      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("whatsapp", whatsapp);
      formData.append("type", type);
      formData.append("message", message);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setSent(true);
    } catch (error) {
      console.error(error);
      alert("حصلت مشكلة أثناء الإرسال، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "أهلاً، أرغب في التواصل مع مراكز دكتور محمد رحيم."
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  if (sent) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#f8fbfd] px-4 py-16 text-[#183b56]"
      >
        <div className="mx-auto max-w-2xl">

          <div className="rounded-[32px] bg-white p-8 text-center shadow-xl sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF8F0] text-4xl">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-black">
              تم إرسال رسالتك بنجاح ❤️
            </h1>

            <p className="mt-4 text-lg leading-8 text-[#60798a]">
              شكرًا لتواصلك معنا. تم تسجيل{" "}
              {type === "شكوى" ? "شكواك" : "اقتراحك"} بنجاح،
              وسيتم التعامل معه من فريقنا.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#1DA851] sm:w-auto"
            >
              💬 لو تحب تتواصل معنا عبر واتساب
            </a>

            <button
              onClick={() => {
                setStep(1);
                setSent(false);
                setName("");
                setPhone("");
                setWhatsapp("");
                setType("");
                setMessage("");
              }}
              className="mt-4 block w-full text-sm font-bold text-[#2F80B7] hover:underline"
            >
              إرسال شكوى أو اقتراح آخر
            </button>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8fbfd] px-4 py-10 text-[#183b56] sm:py-16"
    >
      <div className="mx-auto max-w-3xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] text-3xl">
            💬
          </div>

          <h1 className="text-3xl font-black sm:text-4xl">
            الشكاوى والمقترحات
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[#60798a] sm:text-lg">
            رأيك يهمنا، ويساعدنا دائمًا على تطوير خدماتنا وتحسين تجربتك معنا.
          </p>

        </div>


        {/* ================= PROGRESS ================= */}

        <div className="mb-6 flex items-center justify-center gap-3">

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full font-black ${
              step === 1
                ? "bg-[#2F80B7] text-white"
                : "bg-[#DCEAF3] text-[#2F80B7]"
            }`}
          >
            1
          </div>

          <div className="h-1 w-16 rounded-full bg-[#DCEAF3]" />

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full font-black ${
              step === 2
                ? "bg-[#2F80B7] text-white"
                : "bg-[#DCEAF3] text-[#2F80B7]"
            }`}
          >
            2
          </div>

        </div>


        {/* ================= FORM ================= */}

        <div className="rounded-[32px] bg-white p-6 shadow-xl sm:p-10">

          {step === 1 ? (

            <>
              <h2 className="text-2xl font-black">
                بيانات التواصل
              </h2>

              <p className="mt-2 text-sm text-[#60798a]">
                من فضلك اكتب بياناتك حتى نتمكن من التواصل معك عند الحاجة.
              </p>


              {/* NAME */}

              <div className="mt-7">

                <label className="mb-2 block font-bold">
                  الاسم
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتب اسمك"
                  className="w-full rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 outline-none transition focus:border-[#2F80B7] focus:bg-white"
                />

              </div>


              {/* PHONE */}

              <div className="mt-5">

                <label className="mb-2 block font-bold">
                  رقم التليفون
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 text-left outline-none transition focus:border-[#2F80B7] focus:bg-white"
                  dir="ltr"
                />

              </div>


              {/* WHATSAPP */}

              <div className="mt-5">

                <label className="mb-2 block font-bold">
                  رقم الواتساب
                </label>

                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 text-left outline-none transition focus:border-[#2F80B7] focus:bg-white"
                  dir="ltr"
                />

              </div>


              {/* TYPE */}

              <div className="mt-7">

                <label className="mb-3 block font-bold">
                  حضرتك بخصوص إيه؟
                </label>

                <div className="grid gap-4 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() => setType("شكوى")}
                    className={`rounded-2xl border-2 p-5 text-right transition ${
                      type === "شكوى"
                        ? "border-[#E35D6A] bg-[#FFF5F6]"
                        : "border-[#DCEAF3] bg-[#F8FBFD] hover:border-[#E35D6A]"
                    }`}
                  >

                    <div className="text-2xl">
                      ⚠️
                    </div>

                    <div className="mt-2 font-black">
                      شكوى
                    </div>

                    <div className="mt-1 text-sm text-[#60798a]">
                      عندك مشكلة أو تجربة تحتاج إلى متابعة؟
                    </div>

                  </button>


                  <button
                    type="button"
                    onClick={() => setType("اقتراح")}
                    className={`rounded-2xl border-2 p-5 text-right transition ${
                      type === "اقتراح"
                        ? "border-[#2F80B7] bg-[#F0F8FC]"
                        : "border-[#DCEAF3] bg-[#F8FBFD] hover:border-[#2F80B7]"
                    }`}
                  >

                    <div className="text-2xl">
                      💡
                    </div>

                    <div className="mt-2 font-black">
                      اقتراح
                    </div>

                    <div className="mt-1 text-sm text-[#60798a]">
                      عندك فكرة تساعدنا نطور خدماتنا؟
                    </div>

                  </button>

                </div>

              </div>


              {/* NEXT */}

              <button
                type="button"
                onClick={goToStepTwo}
                className="mt-8 w-full rounded-2xl bg-[#2F80B7] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#246B98]"
              >
                التالي ←
              </button>

            </>

          ) : (

            <>
              <div className="flex items-center justify-between gap-4">

                <div>
                  <h2 className="text-2xl font-black">
                    اكتب التفاصيل
                  </h2>

                  <p className="mt-2 text-sm text-[#60798a]">
                    اكتب لنا تفاصيل {type === "شكوى" ? "الشكوى" : "الاقتراح"} بالتفصيل.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F0F8FC] px-4 py-2 font-black text-[#2F80B7]">
                  {type}
                </div>

              </div>


              {/* MESSAGE */}

              <div className="mt-7">

                <label className="mb-2 block font-bold">
                  التفاصيل
                </label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    type === "شكوى"
                      ? "اكتب تفاصيل الشكوى هنا..."
                      : "اكتب اقتراحك هنا..."
                  }
                  rows={9}
                  className="w-full resize-none rounded-2xl border border-[#DCEAF3] bg-[#F8FBFD] px-5 py-4 leading-8 outline-none transition focus:border-[#2F80B7] focus:bg-white"
                />

              </div>


              {/* BUTTONS */}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={sendForm}
                  disabled={loading}
                  className="rounded-2xl bg-[#2F80B7] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#246B98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "جاري الإرسال..." : "إرسال"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="rounded-2xl border-2 border-[#DCEAF3] bg-white px-6 py-4 font-black text-[#183b56] transition hover:bg-[#F8FBFD]"
                >
                  ← تعديل البيانات
                </button>

              </div>


              {/* WHATSAPP */}

              <div className="mt-6 rounded-3xl bg-[#F0FBF4] p-5 text-center">

                <p className="font-bold text-[#285875]">
                  لو تحب تتواصل معنا مباشرة
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-6 py-3.5 font-black text-white shadow-md transition hover:bg-[#1DA851]"
                >
                  💬 تواصل معنا عبر واتساب
                </a>

              </div>

            </>

          )}

        </div>

      </div>
    </main>
  );
}