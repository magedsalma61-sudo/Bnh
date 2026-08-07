import React from 'react'

type CategoryChipProps = {
  name: string
  active?: boolean
}

export default function CategoryChip({ name, active = false }: CategoryChipProps) {
  return (
    <button
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? 'border-primary bg-primary text-white'
          : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary'
      }`}
    >
      {name}
    </button>
  )
}
