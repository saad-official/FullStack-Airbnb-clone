'use client'
import React from 'react'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhoto } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void,
  value: string,
  
    
}

const ImageUpload = () => {
  return (
    <div>
      ImageUpload
       </div>
  )
}

export default ImageUpload