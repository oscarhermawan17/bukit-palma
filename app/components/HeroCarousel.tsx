"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "https://lh3.googleusercontent.com/aida/AP1WRLsLOIyNcgivRZ2nf0SvIGbAyZFb32eJycEuiZsVHzDYM7ETXQd_Vwdh-IiNvCdknvbRZT7xBIGP7cVuju2048YdvZj1BazNsBLdyk1O4lJIS9iqtI1vvt1nv5l59zGjtat3kruaHzBCb8_E7PTQo151O6UymjpF_Oj7M3z9HXx4P-nFPi2HfF0BJ6jFViJctAegA82I6W9d72u2vfV-ysNURs9p1OQimeBPvdUw4Wia5_a5eZPK242LP_uD",
    alt: "Gereja Interior",
    title: "Shalom & Selamat Datang",
    subtitle: "GKPB Jemaat Tabanan",
  },
  {
    src: "https://lh3.googleusercontent.com/aida/AP1WRLvCoYR2sZtIQ4FSIhRqtZOaIbXXwVw9887dNoB1_PNogA1IthYFDTIjGg1RSdPSlxcnEZUO8pC062dmCVoc6IyazEs_JccddaN_6s1P9GoaWUTZlnUkYVZaf2W9CD7QCg2kGjS1i1MC0MwWkntK5mW6cJ0RMEFwKsQwkdIbaEYwrJwqiofSKzirH3HStkRzxznf54W-g1irKAsK0CPLXidfCldyROp-hpAcvHg1XvkLDw55wdj2wuAGMvPf",
    alt: "Symbolic Dove",
    title: "Damai Sejahtera Bertahta",
    subtitle: "Membangun Komunitas dalam Kasih",
  },
  {
    src: "https://lh3.googleusercontent.com/aida/AP1WRLtt5pBMUqfM8xRHuX4V6xULLLq_h6Tdd32KqHa-rjwuI-E4YpsEthrkqSEUP5thGY3RUhTMiPEEHgrPjywy2oC_wRT_yrVq2kGCRYhcjO7ARWStopESa-trW3S4lpiJfp96TB--8WV7fY-BvPlV7yDXPOM3QOhvZLftxqOM7QL1CZbUbU8yh_jQbUE2SaBi8NQf8sS93T2bet-SNGxn_9otcol97RYT1RQf5dn3MaJrMMHVDf2IhK2AxYF-",
    alt: "Community",
    title: "Melayani Sesama",
    subtitle: "Hadir Untuk Memberkati",
  },
];

export default function HeroCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const slideWidth = carousel.offsetWidth;
      if (slideWidth === 0) return;
      const newIndex = Math.round(carousel.scrollLeft / slideWidth);
      setCurrentIndex(newIndex);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });

    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const next = (currentIndex + 1) % slides.length;
      carouselRef.current.scrollTo({
        left: next * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }, 5000);

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollTo({ left: index * carousel.offsetWidth, behavior: "smooth" });
    setCurrentIndex(index);
  };

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
              <div key={i} className="w-full h-full shrink-0 snap-start relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-linear-to-t from-deep-ebony/90 via-deep-ebony/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop">
                  <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-secondary-fixed mb-4 drop-shadow-md">
                    {slide.title}
                  </h1>
                  <p className="font-headline-sm text-headline-sm text-warm-parchment">
                    {slide.subtitle}
                  </p>
                </div>
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
  );
}
