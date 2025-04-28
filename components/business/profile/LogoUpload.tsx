"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Camera, X } from "lucide-react"

interface LogoUploadProps {
  defaultLogo?: string
  onLogoChange: (file: File | null) => void
}

export const LogoUpload = ({
  defaultLogo = "/placeholder.svg?height=120&width=120",
  onLogoChange,
}: LogoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultLogo)
  const [isHovering, setIsHovering] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
    onLogoChange(file)
  }

  const handleRemoveLogo = () => {
    setPreviewUrl(defaultLogo)
    onLogoChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={previewUrl || "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg"}
          alt="Company logo"
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />

        {isHovering && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-white p-2 rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Camera size={20} />
            </button>
            {previewUrl !== defaultLogo && (
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="text-white p-2 rounded-full bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-2"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        id="logo-upload"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
      >
        로고 변경
      </button>

      <p className="text-xs text-gray-500 mt-1">권장 크기: 500x500px, 최대 5MB</p>
    </div>
  )
}
