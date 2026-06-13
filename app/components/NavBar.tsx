"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-warm-parchment/90 dark:bg-deep-ebony/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-stone-grey/10 transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed tracking-tight"
        >
          GKPB Tabanan
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-gutter">
          <Link
            href="#"
            className="font-label-lg text-label-lg text-primary dark:text-primary-fixed font-bold border-b-2 border-primary pb-1 hover:text-terracotta transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="#"
            className="font-label-lg text-label-lg text-on-surface-variant dark:text-surface-variant hover:text-terracotta transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href="#"
            className="font-label-lg text-label-lg text-on-surface-variant dark:text-surface-variant hover:text-terracotta transition-colors duration-300"
          >
            News
          </Link>
          <Link
            href="#"
            className="font-label-lg text-label-lg text-on-surface-variant dark:text-surface-variant hover:text-terracotta transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Trailing Action */}
        <div className="hidden md:block">
          <button className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-6 py-2 rounded-lg shadow-sm border-b-2 border-primary-fixed-dim transition-all duration-200 active:translate-y-px active:border-b-0">
            Give Thanks
          </button>
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
            href="#"
            className="font-label-lg text-label-lg text-primary font-bold"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            href="#"
            className="font-label-lg text-label-lg text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#"
            className="font-label-lg text-label-lg text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            News
          </Link>
          <Link
            href="#"
            className="font-label-lg text-label-lg text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
          <button className="bg-primary text-on-primary font-label-lg text-label-lg px-6 py-2 rounded-lg w-fit">
            Give Thanks
          </button>
        </div>
      )}
    </nav>
  );
}
