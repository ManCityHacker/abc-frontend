"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: "/hero-slide-1.png",
      alt: "ABC Provisions - Premium Artisanal Foods"
    },
    {
      image: "/hero-slide-2.png", 
      alt: "ABC Provisions - Gourmet Cheese Selection"
    },
    {
      image: "/hero-slide-3.png",
      alt: "ABC Provisions - Fine Charcuterie"
    }
  ]

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative h-[50vh] small:h-[70vh] min-h-[400px] small:min-h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 small:left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 small:p-3 rounded-full transition-all duration-200 backdrop-blur-sm hidden xsmall:block"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 small:w-6 small:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 small:right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 small:p-3 rounded-full transition-all duration-200 backdrop-blur-sm hidden xsmall:block"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 small:w-6 small:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 small:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 small:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 small:w-3 small:h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
