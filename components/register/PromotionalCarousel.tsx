"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface CarouselSlide {
  image: string
}

export const PromotionalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const slides: CarouselSlide[] = [
    { image: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/carousel/signup_carousel_01.png" },
    { image: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/carousel/signup_carousel_02.png" },
    { image: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/carousel/signup_carousel_03.png" },
    { image: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/carousel/signup_carousel_04.png" },
  ]

  // Manual navigation
  const goToSlide = (index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setCurrentSlide(index)
    startAutoSlide()
  }

  // Start auto-sliding
  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
  }

  useEffect(() => {
    // Set loaded state after a small delay to ensure DOM is ready
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Start the auto-slide
    startAutoSlide()

    // Cleanup function
    return () => {
      clearTimeout(loadTimer)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [slides.length])

  // Loading skeleton
  if (!isLoaded) {
    return (
      <div className="h-full min-h-[500px] bg-gray-50 flex items-center justify-center p-6">
        <div className="animate-pulse w-full max-w-md h-64 bg-gray-200 rounded-lg" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === index
            ? "opacity-100 translate-x-0 z-10"
            : index < currentSlide
              ? "opacity-0 -translate-x-full z-0"
              : "opacity-0 translate-x-full z-0"
            }`}
          aria-hidden={currentSlide !== index}
        >
          <div className="h-full flex flex-col justify-center items-center px-8">
            <Image
              src={slide.image}
              alt={`슬라이드 ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />

            <div
              className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 z-20"
              style={{ bottom: '80px' }}
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${i === currentSlide ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === currentSlide ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
