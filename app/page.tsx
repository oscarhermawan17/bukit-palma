import NavBar from "@/app/components/NavBar"
import HeroCarousel from "@/app/components/HeroCarousel"
import IbadahGrid from "@/app/components/IbadahGrid"
import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"

// ─── Types ────────────────────────────────────────────────────────────────────

type Rekening = {
  _key: string
  namaBank: string
  noRekening: string
  atasNama?: string
}

type InfoGereja = {
  namaGereja?: string
  alamat?: string
  linkGmaps?: string
  noTelepon?: string
  email?: string
  facebook?: string
  instagram?: string
  youtube?: string
  tiktok?: string
}

type Bank = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  qris?: any
  transferBank?: Rekening[]
}

type Tema = {
  kataKata?: string
  pasal?: string
}

type Pengaturan = {
  aktifkanQris?: boolean
  aktifkanTransferBank?: boolean
  temaBulanan?: Tema
  temaPersembahan?: Tema
}

// ─── Sanity fetch ─────────────────────────────────────────────────────────────

const revalidateOpts = {
  next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
}

async function fetchInfoGereja(): Promise<InfoGereja | null> {
  return client.fetch(`*[_type == "infoGereja"][0]`, {}, revalidateOpts)
}

async function fetchPengaturan(): Promise<Pengaturan | null> {
  return client.fetch(`*[_type == "pengaturan"][0]`, {}, revalidateOpts)
}

async function fetchBank(): Promise<Bank | null> {
  return client.fetch(`*[_type == "bank"][0]`, {}, revalidateOpts)
}

// ─── Image URL helper ─────────────────────────────────────────────────────────

const builder = imageUrlBuilder(client)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source).url()
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [infoGereja, pengaturan, bank] = await Promise.all([
    fetchInfoGereja(),
    fetchPengaturan(),
    fetchBank(),
  ])

  const namaGereja = infoGereja?.namaGereja ?? "GKPB Tabanan"

  // Persembahan visibility flags
  const hasAyatPersembahan = !!(
    pengaturan?.temaPersembahan?.kataKata || pengaturan?.temaPersembahan?.pasal
  )
  const hasTransfer = !!(
    pengaturan?.aktifkanTransferBank !== false && bank?.transferBank?.length
  )
  const hasQris = !!(pengaturan?.aktifkanQris !== false && bank?.qris)

  const hasLeft = hasAyatPersembahan || hasTransfer
  const hasRight = hasQris
  const showPersembahan = hasLeft || hasRight

  return (
    <>
      {/* TopNavBar */}
      <NavBar namaGereja={namaGereja} />

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

        {/* Persembahan Section */}
        {showPersembahan && (
          <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div
              className={
                hasLeft && hasRight
                  ? "grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                  : "flex justify-center"
              }
            >
              {/* Left: tema persembahan + transfer bank */}
              {hasLeft && (
                <div className={!hasRight ? "w-full max-w-xl" : ""}>
                  <h2 className="font-headline-md text-headline-md text-primary mb-4">
                    Persembahan &amp; Syukur
                  </h2>

                  {hasAyatPersembahan && (
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                      {pengaturan?.temaPersembahan?.kataKata && (
                        <>&ldquo;{pengaturan.temaPersembahan.kataKata}&rdquo;</>
                      )}
                      {pengaturan?.temaPersembahan?.kataKata &&
                        pengaturan?.temaPersembahan?.pasal && (
                          <> &mdash; {pengaturan.temaPersembahan.pasal}</>
                        )}
                      {!pengaturan?.temaPersembahan?.kataKata &&
                        pengaturan?.temaPersembahan?.pasal && (
                          <>{pengaturan.temaPersembahan.pasal}</>
                        )}
                    </p>
                  )}

                  {hasTransfer && (
                    <div className="flex flex-col gap-4">
                      {bank!.transferBank!.map((rek) => (
                        <div
                          key={rek._key}
                          className="bg-surface-container-low p-6 rounded-xl border border-stone-grey/15"
                        >
                          <h4 className="font-label-lg text-label-lg text-on-surface mb-2">
                            Transfer Bank
                          </h4>
                          <p className="font-body-md text-body-md text-stone-grey mb-1">
                            {rek.namaBank}
                          </p>
                          <p className="font-headline-sm text-headline-sm text-primary tracking-wide">
                            {rek.noRekening}
                          </p>
                          {rek.atasNama && (
                            <p className="font-body-md text-body-md text-stone-grey mt-1">
                              a.n. {rek.atasNama}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Right: QRIS */}
              {hasRight && (
                <div
                  className={`bg-surface-bright p-8 rounded-2xl shadow-sm border border-stone-grey/10 flex flex-col items-center justify-center text-center relative overflow-hidden${!hasLeft ? " w-full max-w-sm" : ""}`}
                >
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
                      src={urlFor(bank!.qris!)}
                      alt="QRIS GKPB Tabanan"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant relative z-10">
                    Gunakan aplikasi M-Banking atau e-Wallet Anda untuk
                    melakukan pemindaian.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

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
              {namaGereja}
            </div>
            <p className="text-stone-grey text-sm">
              Gereja Kristen Protestan di Bali Jemaat Bukit Palma, Sanggulan.
              Hadir untuk melayani dan menjadi berkat bagi sesama dalam kasih
              Kristus.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-lg text-label-lg text-warm-parchment mb-2">
              Tautan Cepat
            </h4>
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
            <h4 className="font-label-lg text-label-lg text-warm-parchment mb-2">
              Hubungi Kami
            </h4>
            {infoGereja?.alamat && (
              <p className="text-stone-grey text-sm flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                {infoGereja.alamat}
              </p>
            )}
            {infoGereja?.noTelepon && (
              <p className="text-stone-grey text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
                {infoGereja.noTelepon}
              </p>
            )}
            {infoGereja?.linkGmaps && (
              <a
                href={infoGereja.linkGmaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-secondary-fixed-dim text-sm mt-2 transition-colors inline-flex items-center gap-1"
              >
                Lihat Peta
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </a>
            )}
          </div>

          {/* Col 4: Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-lg text-label-lg text-warm-parchment mb-2">
              Ikuti Kami
            </h4>
            <div className="flex gap-4">
              <a
                aria-label="YouTube"
                href="#"
                className="text-stone-grey hover:text-secondary-fixed transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
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
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
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
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
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
            &copy; {new Date().getFullYear()} {namaGereja} Tabanan. Seluruh Hak
            Cipta Dilindungi Undang-Undang. <br />
            Dibuat oleh Oscar dan Belen
          </p>
        </div>
      </footer>
    </>
  )
}
