'use client'
import Image from 'next/image'
import React from 'react'

interface AvatorType {
  src: string | null | undefined
}

const Avatar = ({src}: AvatorType) => {
  return (
      <Image
          src={src || ""}
          height="30"
          width="30"
          alt='avatar'
          className='rounded-full'
      />
          
  )
}

export default Avatar