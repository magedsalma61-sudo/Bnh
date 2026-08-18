'use client'

import Link from 'next/link'

type Article = {
  id: string
  title: string
  subtitle?: string
  excerpt: string
}

const articles: Article[] = [
  {
    id: 'why-insulin-resistance-is-common',
    title:
      'لماذا أصبحت مقاومة الإنسولين مشكلة شائعة؟',
    subtitle:
      'رؤية سلوكية وغذائية من الواقع الطبي',
    excerpt:
      'لم تعد مقاومة الإنسولين مشكلة مرتبطة فقط بمرضى السكري، بل أصبحت حالة شائعة نراها يوميًا في العيادات، ويرتبط ظهورها بعوامل غذائية وسلوكية ونمط الحياة.',
  },

  {
    id: 'insulin-resistance-silent-disease',
    title:
      'مقاومة الإنسولين: المرض الصامت وراء السمنة والعناد في نزول الوزن',
    excerpt:
      'عمرك عملت دايت، التزمت، وتعبت… وبرضه الميزان ما اتحركش؟ أحيانًا يكون السبب وراء صعوبة نزول الوزن هو مقاومة الإنسولين.',
  },

  {
    id: 'child-insulin-resistance-success-story',
    title:
      'قصة نجاح: طفل 10 سنوات ومقاومة الإنسولين… لما العلاج يكون فهم مش دواء',
    excerpt:
      'قصة من الواقع الطبي لطفل ظهرت لديه مؤشرات مقاومة الإنسولين، وكيف تم التعامل مع الحالة من خلال تقييم شامل وتعديل نمط الحياة والتغذية.',
  },

  {
    id: 'insulin-resistance-belly-fat',
    title:
      'مقاومة الإنسولين والكرش العنيد: لماذا دهون البطن لا تختفي؟',
    excerpt:
      'لو عندك كرش عنيد، فالمشكلة أحيانًا لا تكون في التمارين أو الأكل فقط، وإنما قد ترتبط بطريقة تعامل الجسم مع الإنسولين وتوزيع الدهون.',
  },

  {
    id: 'is-medicine-the-real-solution',
    title:
      'هل الدواء هو الحل الحقيقي لمقاومة الإنسولين؟',
    subtitle:
      'قراءة هادئة في العلاج الدوائي والحلول الأكثر فاعلية',
    excerpt:
      'هل الدواء هو الحل دائمًا؟ قراءة في دور العلاج الدوائي، وأهمية نمط الحياة والتغذية، وكيف يتم اختيار النهج المناسب لكل حالة.',
  },
]

export default function ArticlesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white text-[#183B56]"
    >

      {/* HERO */}

      <section className="bg-gradient-to-b from-[#F4FAFD] to-white px-4 py-14 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mb-4 inline-flex rounded-full bg-[#2F80B7] px-5 py-2 text-sm font-bold text-white shadow-sm">
            مقالات د. محمد رحيم
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            مقالات د. محمد رحيم
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-[#49687C]">
            مقالات وتوعية طبية حول السمنة، التغذية العلاجية،
            مقاومة الإنسولين ونمط الحياة من واقع الخبرة الطبية.
          </p>

          <div className="mt-6 text-sm font-bold text-[#2F80B7]">
            ✍️ بقلم د. محمد رحيم
          </div>

        </div>

      </section>

      {/* ARTICLES */}

      <section className="px-4 py-12 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="mb-8">

            <h2 className="text-2xl font-black text-[#183B56]">
              أحدث المقالات
            </h2>

            <p className="mt-2 text-sm text-[#60798A]">
              اختر المقال الذي تريد قراءته.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {articles.map((article, index) => (
              <article
                key={article.id}
                className="group flex h-full flex-col rounded-[28px] border border-[#DCEAF3] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* NUMBER */}

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6FC] text-lg font-black text-[#2F80B7]">
                    {index + 1}
                  </div>

                  <span className="rounded-full bg-[#F4FAFD] px-3 py-1 text-xs font-bold text-[#2F80B7]">
                    مقال طبي
                  </span>

                </div>

                {/* TITLE */}

                <h2 className="mt-6 text-2xl font-black leading-10 text-[#183B56]">
                  {article.title}
                </h2>

                {article.subtitle && (
                  <p className="mt-2 text-sm font-bold text-[#2F80B7]">
                    {article.subtitle}
                  </p>
                )}

                {/* EXCERPT */}

                <p className="mt-4 flex-1 text-base leading-8 text-[#60798A]">
                  {article.excerpt}
                </p>

                {/* AUTHOR */}

                <div className="mt-6 border-t border-[#EAF1F5] pt-5">

                  <div className="text-sm font-bold text-[#183B56]">
                    بقلم: د. محمد رحيم
                  </div>

                  <div className="mt-1 text-xs text-[#718795]">
                    استشاري العلاج غير الجراحي للسمنة والتغذية العلاجية
                  </div>

                </div>

                {/* LINK */}

                <Link
                  href={`/articles/${article.id}`}
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#2F80B7] px-5 py-3.5 font-black text-white transition hover:bg-[#236A99]"
                >
                  قراءة المقال ←
                </Link>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* AUTHOR */}

      <section className="px-4 pb-14 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl rounded-[32px] bg-[#F4FAFD] p-7 sm:p-10">

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              👨‍⚕️
            </div>

            <h2 className="mt-5 text-2xl font-black text-[#183B56]">
              عن الكاتب
            </h2>

            <p className="mt-3 text-lg font-black text-[#2F80B7]">
              د. محمد رحيم
            </p>

            <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-[#60798A]">
              استشاري العلاج غير الجراحي للسمنة،
              دكتوراه في التغذية العلاجية، وخبرة أكثر من
              20 عامًا في علاج السمنة والتغذية العلاجية
              وعلاج مقاومة الإنسولين.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}