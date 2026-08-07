import React from 'react'

type ProductCardProps = {
  title: string
  price: string
  category: string
  image: string
  badge?: string
}

export default function ProductCard({ title, price, category, image, badge }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-red-50 to-white">
        <div className="text-5xl">{image}</div>
      </div>
      <div className="p-5">
        {badge ? (
          <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {badge}
          </div>
        ) : null}
        <div className="text-sm text-gray-500">{category}</div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{price}</span>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
            إضافة
          </button>
        </div>
      </div>
    </article>
  )
}
