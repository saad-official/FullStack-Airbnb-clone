'use client'
import React from 'react'

interface MenuItemsProps {
    onClick: () => void,
    label: string
}

const MenuItems = ({onClick, label}: MenuItemsProps) => {
  return (
      <div onClick={() => {}}
          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
      >
          {label}
    </div>
  )
}

export default MenuItems