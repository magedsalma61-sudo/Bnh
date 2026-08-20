import Link from "next/link";

export default function SuccessPage() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-6"
    >

      <div className="w-full max-w-2xl rounded-[36px] bg-white p-10 text-center shadow-2xl md:p-16">

        {/* علامة النجاح */}

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

          <span className="text-5xl text-emerald-600">
            ✓
          </span>

        </div>


        <h1 className="mt-8 text-4xl font-black text-slate-800">
          تم التسجيل بنجاح
        </h1>


        <p className="mt-6 text-xl font-bold leading-9 text-emerald-600">
          شكرًا لك، تم استلام بياناتك بنجاح.
        </p>


        <p className="mt-4 text-lg leading-9 text-slate-600">

          سيتم إرسال رمز QR الخاص بك على البريد الإلكتروني
          <br />
          <strong className="text-slate-800">
            خلال يوم عمل
          </strong>

        </p>


        <div className="mt-8 rounded-2xl bg-sky-50 p-5 text-sm leading-7 text-slate-600">

          برجاء متابعة البريد الإلكتروني الذي قمت بالتسجيل به،
          والتأكد من مراجعة مجلد الرسائل غير المرغوب فيها
          إذا لم تجد الرسالة في البريد الوارد.

        </div>


        <Link
          href="/"
          className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-10 py-4 font-black text-white shadow-lg transition hover:scale-105"
        >
          العودة للصفحة الرئيسية
        </Link>

      </div>

    </main>
  );
}