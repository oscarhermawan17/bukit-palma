"use client"

import { useState } from "react"
import Link from "next/link"

type NavBarProps = {
  namaGereja?: string
}

export default function NavBar({ namaGereja = "GKPB Tabanan" }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-warm-parchment/90 dark:bg-deep-ebony/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-stone-grey/10 transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed tracking-tight"
        >
          {namaGereja}
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-gutter">
          <Link
            href="/"
            className="font-label-lg text-label-lg text-primary dark:text-primary-fixed font-bold border-b-2 border-primary pb-1 hover:text-terracotta transition-colors duration-300"
          >
            Beranda
          </Link>
          <Link
            href="/kategorial"
            className="font-label-lg text-label-lg text-on-surface-variant dark:text-surface-variant hover:text-terracotta border-b-2 border-transparent pb-1 transition-colors duration-300"
          >
            Ibadah Kategorial
          </Link>
          <Link
            href="/galeri"
            className="font-label-lg text-label-lg text-on-surface-variant dark:text-surface-variant hover:text-terracotta border-b-2 border-transparent pb-1 transition-colors duration-300"
          >
            Galeri
          </Link>
          <Link
            href="/kontak"
            className="font-label-lg text-label-lg text-on-surface-variant dark:text-surface-variant hover:text-terracotta border-b-2 border-transparent pb-1 transition-colors duration-300"
          >
            Kontak
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-warm-parchment dark:bg-deep-ebony border-t border-stone-grey/10 px-margin-mobile py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="font-label-lg text-label-lg text-primary font-bold"
            onClick={() => setMobileOpen(false)}
          >
            Beranda
          </Link>
          <Link
            href="/jadwal"
            className="font-label-lg text-label-lg text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            Ibadah Kategorial
          </Link>
          <Link
            href="/galeri"
            className="font-label-lg text-label-lg text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            Galeri
          </Link>
          <Link
            href="/contact"
            className="font-label-lg text-label-lg text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}
