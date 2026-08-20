import Image from "next/image";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#FFFDF8] text-[#17231F]"
    >
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#DDF4EC] blur-3xl" />
        <div className="absolute -left-40 top-[35%] h-[380px] w-[380px] rounded-full bg-[#FFE2D8] blur-3xl" />
        <div className="absolute bottom-[-180px] right-[35%] h-[400px] w-[400px] rounded-full bg-[#E1F3F2] blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-7xl px-6 py-6 md:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#176B5B] text-xl font-black text-white shadow-lg">
              N
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-wide text-[#176B5B]">
                NEW CAPITAL
              </p>

              <p className="text-xs font-medium text-[#71807A]">
                CITY AUTHORITY
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-4 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:pt-8">

        {/* Logo */}
        <div className="relative order-2 lg:order-1">
          <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-[42px] border border-white bg-white p-7 shadow-[0_25px_80px_rgba(23,107,91,0.12)] md:min-h-[570px]">

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#DDF4EC]" />

            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#FFE5DC]" />

            <div className="relative z-10 w-full max-w-[540px]">
              <Image
                src="/logo.png"
                alt="جهاز العاصمة الجديدة"
                width={700}
                height={700}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_20px_25px_rgba(40,60,50,0.12)]"
              />
            </div>

            <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3">
              <span className="h-1 w-12 rounded-full bg-[#F07A5F]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#2BA7A0]" />
              <span className="h-1 w-12 rounded-full bg-[#176B5B]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">

          {/* English Name */}
          <div className="mb-5">
            <p className="text-sm font-black tracking-[0.28em] text-[#176B5B] md:text-lg">
              NEW CAPITAL CITY AUTHORITY
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-1 w-16 rounded-full bg-[#F07A5F]" />
              <span className="h-1 w-5 rounded-full bg-[#2BA7A0]" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-3xl text-4xl font-black leading-[1.35] tracking-tight text-[#18251F] md:text-5xl lg:text-[4.2rem]">
            أهلًا بك في
            <br />

            <span className="text-[#176B5B]">
              جهاز العاصمة الجديدة
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-black md:text-lg">
            هنا يمكنك تسجيل بياناتك لحضور اجتماع السكان
            <br />
            بجهاز العاصمة الجديدة.
          </p>

          {/* Registration Card */}
          <div className="mt-8 overflow-hidden rounded-[28px] border border-[#E7ECE8] bg-white shadow-[0_18px_50px_rgba(20,70,55,0.08)]">

            <div className="flex items-center gap-5 p-5 md:p-6">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#E4F5EF] text-2xl text-[#176B5B]">
                📋
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-black text-[#1D2A24] md:text-xl">
                  سجّل الآن بكل سهولة
                </h2>

                <p className="mt-1 text-sm leading-7 text-[#68736E] md:text-base">
                  أدخل بياناتك الأساسية لإتمام التسجيل.
                </p>
              </div>

              <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#FFF0EA] text-xl font-bold text-[#E26950] sm:flex">
                ←
              </div>
            </div>

            <div className="bg-[#F8FBF9] px-6 py-3 text-center text-xs font-bold text-[#71807A]">
              جميع البيانات المطلوبة يجب إدخالها بشكل صحيح
            </div>
          </div>

          {/* Registration Button */}
          <a
            href="/register"
            className="group mt-5 flex w-full items-center justify-center gap-4 rounded-[24px] bg-[#176B5B] px-7 py-5 text-lg font-black text-white shadow-[0_14px_35px_rgba(23,107,91,0.22)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#125848] hover:shadow-[0_20px_45px_rgba(23,107,91,0.28)]"
          >
            <span>التسجيل الآن</span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
          </a>

          {/* Small note */}
          <div className="mt-5 text-center text-sm text-[#707B76]">
            التسجيل يستغرق أقل من دقيقتين
          </div>
        </div>
      </section>
    </main>
  );
}