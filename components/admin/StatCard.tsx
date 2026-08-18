import React from 'react'

type StatCardProps = {
  title: string
  value: string
  hint: string
}

export default function StatCard({ title, value, hint }: StatCardProps) {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
      <div className="mt-2 text-sm text-gray-500">{hint}</div>
    </div>
  )
}
