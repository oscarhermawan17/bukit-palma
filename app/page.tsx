import NavBar from "@/app/components/NavBar";
import HeroCarousel from "@/app/components/HeroCarousel";
import IbadahGrid from "@/app/components/IbadahGrid";

export default function Home() {
  return (
    <>
      {/* TopNavBar */}
      <NavBar />

      <main className="pt-20">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Jadwal Ibadah Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Jadwal Ibadah
            </h2>
          </div>
          <IbadahGrid />
        </section>

        {/* Warta Jemaat Section */}
        <section className="bg-warm-parchment py-16 border-y border-stone-grey/10">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-3">
              Panduan Liturgi &amp; Warta
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-xl mx-auto">
              Dapatkan informasi terbaru seputar pelayanan, kegiatan sepekan, dan panduan liturgi
              ibadah minggu ini.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 border-2 border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors duration-300 px-8 py-3 rounded-lg font-label-lg text-label-lg group"
            >
              <span className="material-symbols-outlined group-hover:text-on-primary">
                picture_as_pdf
              </span>
              Download Warta Jemaat Minggu Ini
            </a>
          </div>
        </section>

        {/* Persembahan Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">
                Persembahan &amp; Syukur
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                &ldquo;Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan
                sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan
                sukacita.&rdquo; &mdash; 2 Korintus 9:7
              </p>
              <div className="bg-surface-container-low p-6 rounded-xl border border-stone-grey/15 mb-6">
                <h4 className="font-label-lg text-label-lg text-on-surface mb-2">Transfer Bank</h4>
                <p className="font-body-md text-body-md text-stone-grey mb-1">Bank Mandiri</p>
                <p className="font-headline-sm text-headline-sm text-primary tracking-wide">
                  145-00-1234567-8
                </p>
                <p className="font-body-md text-body-md text-stone-grey mt-1">
                  a.n. GKPB Jemaat Tabanan
                </p>
              </div>
            </div>
            <div className="bg-surface-bright p-8 rounded-2xl shadow-sm border border-stone-grey/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Decorative subtle pattern */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, #640f1d 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              <h3 className="font-headline-sm text-headline-sm text-primary mb-6 relative z-10">
                Scan QRIS
              </h3>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-grey/20 mb-6 relative z-10 w-64 h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="QRIS GKPB Tabanan"
                  className="w-full h-full object-cover rounded-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtHd4jCsu6CLQjgaIF-1vcWVJTzlrqPNE-b_cJt2vtok7N3pj1uj2qLO3uCPWzoD3BUVjCrf5AbiCj99nZhXQSFF6Q6QhSyOKos3x8Kz5LrQbAjCvkOEy4d-rL0uHPbAx2Cgb9HToFefWyOJZJJO12gVZyzJO2UKGdOBBEmUjvef8Fl-cdvCQx0YU1aEUeWKo09vdCRMR1H6Q3010aS8ulhY6zrMM_El5qJsyjXnPKNU-IPgStcvabVAlkFCYBvnNZSG5LczioJ0eA"
                />
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant relative z-10">
                Gunakan aplikasi M-Banking atau e-Wallet Anda untuk melakukan pemindaian.
              </p>
            </div>
          </div>
        </section>

        {/* Organisasi Section */}
        <section className="bg-warm-parchment py-section-gap border-t border-stone-grey/10">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <h2 className="font-headline-md text-headline-md text-primary mb-12">
              Lembaga &amp; Kategorial
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 hover:opacity-100 transition-opacity duration-500">
              <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="GKPB Logo"
                  className="max-w-full max-h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLsc91ur9LzHhoNnIwdx3xplPyZyX0-lR3HF9iPP-4UvR2fyteI6bqztTNAs7Q_qYrhC2TIk1is9-oATViHsevzKcVTkr8WPfvY07fQ0LNemh-l7jbBYUYJ5KdYHlOPDEJMVxOF9ANSStGQg4pNGFqzSX1RF0qBk1cV7bvTdrM_2-N7W8tSmu9htcGm4tfWvwVHeRPArzM2crEzWmfc9948Aco83Z2GONgv7sLXRRtFL4t4OB4LWU6UC5ZqL"
                />
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="GKPB Tabanan Logo"
                  className="max-w-full max-h-full object-contain rounded-sm"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBauqqvodTZJRaN00iK1BKsTnwQmF86-Uq7JinQuNVo_5X07-NsM4BYULjYcbwQVqaJC3Z8dOBlSUEiYc1kDDrrBKChrDiAOEBqFijzjTbw28LXSQnyXVC8t6MOqwgzi0FzFsloYn65wRV32XAMjkzAJGzrvxCFvACmKvGUBtemZVgwQfbySjErZfHs4RNs9z75ZzUK3S4YATnYhs6o98P2Y2TIMYB5cvwAxz-KwDEVymrP-eIrcSR5GaWYnCPAMcUeEwT0cz7jl-m_"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-deep-ebony dark:bg-black w-full text-secondary-fixed font-body-md text-body-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto border-b border-stone-grey/20">
          {/* Col 1: Brand & Identity */}
          <div className="flex flex-col gap-4">
            <div className="font-headline-md text-headline-md text-secondary-fixed font-bold">
              GKPB Tabanan
            </div>
            <p className="text-stone-grey text-sm">
              Gereja Kristen Protestan di Bali Jemaat Tabanan. Hadir untuk melayani dan menjadi
              berkat bagi sesama dalam kasih Kristus.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-lg text-label-lg text-warm-parchment mb-2">Tautan Cepat</h4>
            <a
              href="#"
              className="text-stone-grey hover:text-secondary-fixed-dim transition-colors opacity-80 hover:opacity-100"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-stone-grey hover:text-secondary-fixed-dim transition-colors opacity-80 hover:opacity-100"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-stone-grey hover:text-secondary-fixed-dim transition-colors opacity-80 hover:opacity-100"
            >
              Member Portal
            </a>
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-lg text-label-lg text-warm-parchment mb-2">Hubungi Kami</h4>
            <p className="text-stone-grey text-sm flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              Jl. Debes No.6, Tabanan, Bali
            </p>
            <p className="text-stone-grey text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">call</span>
              +62 361 223758
            </p>
            <a
              href="https://maps.app.goo.gl/2tgigKRnntmfgc4w5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary-fixed-dim text-sm mt-2 transition-colors inline-flex items-center gap-1"
            >
              Lihat Peta
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>

          {/* Col 4: Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-lg text-label-lg text-warm-parchment mb-2">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a
                aria-label="YouTube"
                href="#"
                className="text-stone-grey hover:text-secondary-fixed transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                  />
                </svg>
              </a>
              <a
                aria-label="Facebook"
                href="#"
                className="text-stone-grey hover:text-secondary-fixed transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  />
                </svg>
              </a>
              <a
                aria-label="Instagram"
                href="#"
                className="text-stone-grey hover:text-secondary-fixed transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bottom */}
        <div className="bg-black py-4 px-margin-mobile md:px-margin-desktop text-center">
          <p className="text-stone-grey text-sm">
            © 2024 GKPB Jemaat Tabanan. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

