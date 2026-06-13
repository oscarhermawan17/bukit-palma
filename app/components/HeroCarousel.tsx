"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export type HeroSlide = {
  _key: string
  imageUrl?: string
  judul?: string
  subjudul?: string
}

type Props = {
  slides: HeroSlide[]
}

export default function HeroCarousel({ slides }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      const slideWidth = carousel.offsetWidth
      if (slideWidth === 0) return
      const newIndex = Math.round(carousel.scrollLeft / slideWidth)
      setCurrentIndex(newIndex)
    }

    carousel.addEventListener("scroll", handleScroll, { passive: true })

    const interval = setInterval(() => {
      if (!carouselRef.current) return
      const next = (currentIndex + 1) % slides.length
      carouselRef.current.scrollTo({
        left: next * carouselRef.current.offsetWidth,
        behavior: "smooth",
      })
    }, 5000)

    return () => {
      carousel.removeEventListener("scroll", handleScroll)
      clearInterval(interval)
    }
  }, [currentIndex, slides.length])

  const goToSlide = (index: number) => {
    const carousel = carouselRef.current
    if (!carousel) return
    carousel.scrollTo({ left: index * carousel.offsetWidth, behavior: "smooth" })
    setCurrentIndex(index)
  }

  if (slides.length === 0) return null

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        {/* Carousel wrapper */}
        <div className="relative rounded-2xl overflow-hidden h-[60vh] bg-deep-ebony">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex w-full h-full snap-x snap-mandatory overflow-x-auto hide-scrollbar"
          >
            {slides.map((slide, i) => (
              <div key={slide._key} className="w-full h-full shrink-0 snap-start relative">
                {slide.imageUrl && (
                  <Image
                    src={slide.imageUrl}
                    alt={slide.judul ?? "Slide carousel"}
                    fill
                    sizes="100vw"
                    loading="lazy"
                    className="object-cover opacity-70"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-deep-ebony/90 via-deep-ebony/40 to-transparent" />
                {(slide.judul || slide.subjudul) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop">
                    {slide.judul && (
                      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-secondary-fixed mb-4 drop-shadow-md">
                        {slide.judul}
                      </h1>
                    )}
                    {slide.subjudul && (
                      <p className="font-headline-sm text-headline-sm text-warm-parchment">
                        {slide.subjudul}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Prev Button */}
          <button
            onClick={() => goToSlide((currentIndex - 1 + slides.length) % slides.length)}
            aria-label="Slide sebelumnya"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-deep-ebony/50 hover:bg-deep-ebony/80 text-secondary-fixed backdrop-blur-sm transition-all duration-200"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {/* Next Button */}
          <button
            onClick={() => goToSlide((currentIndex + 1) % slides.length)}
            aria-label="Slide berikutnya"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-deep-ebony/50 hover:bg-deep-ebony/80 text-secondary-fixed backdrop-blur-sm transition-all duration-200"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? "w-8 bg-secondary-fixed"
                    : "w-2 bg-surface-variant/50 hover:bg-surface-variant"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
