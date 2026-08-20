"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    nationalId: "",
    email: "",
    phone: "",
    whatsapp: "",
    buildingNumber: "",
    apartmentNumber: "",
    address: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    const nameParts = form.fullName.trim().split(/\s+/).filter(Boolean);

    if (nameParts.length < 4) {
      setMessage("من فضلك اكتبي الاسم الرباعي كاملا.");
      return;
    }

    if (!/^\d{14}$/.test(form.nationalId)) {
      setMessage("رقم البطاقة يجب أن يكون 14 رقما بالضبط.");
      return;
    }

    if (!/^01\d{9}$/.test(form.phone)) {
      setMessage("رقم التليفون يجب أن يكون 11 رقما ويبدأ بـ 01.");
      return;
    }

    if (!/^01\d{9}$/.test(form.whatsapp)) {
      setMessage("رقم الواتساب يجب أن يكون 11 رقما ويبدأ بـ 01.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setMessage("من فضلك اكتبي بريد إلكتروني صحيح.");
      return;
    }

    if (
      !form.buildingNumber.trim() ||
      !form.apartmentNumber.trim() ||
      !form.address.trim()
    ) {
      setMessage("من فضلك املئي جميع البيانات المطلوبة.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!result.success) {
        setMessage(result.message || "حدث خطأ أثناء التسجيل.");
        setLoading(false);
        return;
      }

      router.push("/success");
    } catch (error) {
      console.error(error);
      setMessage("حدث خطأ في الاتصال بالخادم. برجاء المحاولة مرة أخرى.");
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10"
    >
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-slate-800">
            تسجيل البيانات
          </h1>

          <p className="mt-3 text-slate-500">
            برجاء إدخال جميع البيانات المطلوبة بشكل صحيح
          </p>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-2xl md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                الاسم الرباعي *
              </label>

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="الاسم رباعي على الأقل"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                رقم البطاقة *
              </label>

              <input
                name="nationalId"
                value={form.nationalId}
                onChange={handleChange}
                required
                inputMode="numeric"
                maxLength={14}
                placeholder="14 رقم"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                البريد الإلكتروني *
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="example@gmail.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  رقم التليفون *
                </label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  رقم الواتساب *
                </label>

                <input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  رقم العمارة *
                </label>

                <input
                  name="buildingNumber"
                  value={form.buildingNumber}
                  onChange={handleChange}
                  required
                  placeholder="رقم العمارة"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  رقم الشقة *
                </label>

                <input
                  name="apartmentNumber"
                  value={form.apartmentNumber}
                  onChange={handleChange}
                  required
                  placeholder="رقم الشقة"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                العنوان بالتفصيل *
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={5}
                placeholder="اكتبي العنوان بالتفصيل"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {message && (
              <div className="rounded-2xl bg-red-50 px-5 py-4 text-center font-bold text-red-600">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "جاري تسجيل البيانات..." : "تسجيل البيانات"}
            </button>

            <p className="text-center text-xs text-slate-400">
              جميع البيانات إلزامية ولن يتم قبول التسجيل ببيانات ناقصة.
            </p>

          </form>
        </div>
      </div>
    </main>
  );
}
