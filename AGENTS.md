<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Gereja Bukit Palma — Project Guide for AI Agents

## Tentang Project

Website resmi **GKPB Jemaat Tabanan** (Gereja Kristen Protestan di Bali Jemaat Tabanan).

- Alamat: Jl. Debes No.6, Tabanan, Bali | Telp: +62 361 223758
- Stack: **Next.js 16.2.7** · **React 19** · **TypeScript** · **Tailwind CSS v4** · **Sanity v5**
- Bahasa konten: **Bahasa Indonesia**

---

## Struktur Folder

```
/
├── app/
│   ├── layout.tsx              # Root layout, font imports, metadata
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind @theme (design tokens)
│   ├── components/
│   │   ├── NavBar.tsx          # Fixed top navbar, mobile responsive
│   │   ├── HeroCarousel.tsx    # Auto-sliding hero (client component)
│   │   └── IbadahGrid.tsx      # Server component, fetches dari Sanity
│   └── studio/[[...tool]]/
│       └── page.tsx            # Sanity Studio (embedded di /studio)
├── sanity/
│   ├── lib/client.ts           # Sanity client (next-sanity)
│   └── schemaTypes/
│       ├── index.ts
│       ├── ibadah.ts           # Jadwal Ibadah
│       ├── acara.ts            # Acara & Event
│       ├── berita.ts           # Berita & Pengumuman
│       ├── galeri.ts           # Galeri Foto
│       ├── khotbah.ts          # Khotbah & Renungan
│       └── timPelayan.ts       # Tim Pelayan & Pengurus
├── design/
│   └── home.html               # Desain referensi HTML (static mockup)
└── sanity.config.ts            # Konfigurasi Sanity Studio
```

---

## Sanity CMS

| Variabel | Nilai |
|---|---|
| Project ID | `gdkni5a8` |
| Dataset | `production` |
| Studio URL | `/studio` |
| API Version | `2024-01-01` |

### Schema Types

| Schema | Title | Field Penting |
|---|---|---|
| `ibadah` | Jadwal Ibadah | `tipe` (umum/khusus/kategorial), `tanggal`, `jam`, `lokasi`, `tampilDiHomepage` |
| `acara` | Acara & Event | `nama`, `slug`, `poster`, `tanggalMulai`, `aktif` |
| `berita` | Berita & Pengumuman | `judul`, `slug`, `kategori`, `konten` (block), `dipublikasikan` |
| `galeri` | Galeri Foto | `namaAlbum`, `slug`, `foto` (array image) |
| `khotbah` | Khotbah & Renungan | `judul`, `pengkhotbah`, `ayatAlkitab`, `linkYoutube`, `linkAudio` |
| `timPelayan` | Tim Pelayan & Pengurus | `nama`, `jabatan`, `divisi`, `urutan`, `aktif` |

**Tipe Ibadah:** `umum` · `khusus` · `kaumBapak` · `kaumIbu` · `pemuda` · `sekolahMinggu` · `kebaktianKeluarga`

**Contoh query GROQ:**
```groq
*[_type == "ibadah" && tampilDiHomepage == true] | order(jam asc)
```

---

## Design System (Tailwind v4 `@theme`)

Semua token ada di `app/globals.css`. Jangan gunakan warna/spacing arbitrary — selalu pakai token.

### Warna Utama

| Token | Hex | Kegunaan |
|---|---|---|
| `primary` | `#640f1d` | Maroon tua — warna utama brand |
| `terracotta` | `#B35C44` | Aksen, border-left cards |
| `warm-parchment` | `#F9F7F2` | Background section, navbar |
| `deep-ebony` | `#0F172A` | Footer, hero overlay |
| `stone-grey` | `#6B7280` | Teks sekunder |
| `secondary-fixed` | `#ffe08f` | Gold/kuning — teks di atas dark bg |

### Spacing

| Token | Nilai |
|---|---|
| `margin-desktop` | 40px |
| `margin-mobile` | 16px |
| `gutter` | 24px |
| `section-gap` | 80px |
| `container-max` | 1200px |

### Tipografi (3 Font)

| Font | Variable | Dipakai untuk |
|---|---|---|
| **Libre Caslon Text** | `--font-libre-caslon-text` | `font-display-lg`, `font-headline-md`, `font-headline-sm` |
| **Hanken Grotesk** | `--font-hanken-grotesk` | `font-label-lg`, `font-label-sm` |
| **Source Sans 3** | `--font-source-sans-3` | `font-body-lg`, `font-body-md` |

### Ikon

Gunakan **Material Symbols Outlined** (sudah di-load via Google Fonts di `layout.tsx`):
```html
<span className="material-symbols-outlined">schedule</span>
```

---

## Homepage (`app/page.tsx`) — Sections

1. **NavBar** — fixed top, blur backdrop, mobile hamburger menu
2. **HeroCarousel** — 3 slide auto-rotate setiap 5 detik, tombol prev/next
3. **Jadwal Ibadah** — grid dari Sanity (`IbadahGrid.tsx`, server component)
4. **Warta Jemaat** — tombol download PDF (belum terhubung)
5. **Persembahan** — info rekening Bank Mandiri + QRIS placeholder
6. **Lembaga & Kategorial** — logo GKPB (grayscale → hover berwarna)
7. **Footer** — 4 kolom: brand, tautan cepat, kontak, sosial media

### NavBar Links (belum diimplementasi, masih `href="#"`)
About · Services · News · Contact · tombol "Give Thanks"

---

## Pola Kode

### Server Component + Sanity fetch
```tsx
import { client } from '@/sanity/lib/client'

async function fetchData() {
  return client.fetch(
    `*[_type == "ibadah" && tampilDiHomepage == true]`,
    {},
    { next: { revalidate: process.env.NODE_ENV === 'production' ? 60 : 0 } }
  )
}

export default async function MyComponent() {
  const data = await fetchData()
  // ...
}
```

### Client Component
```tsx
"use client"
import { useState } from "react"
```

### Import path alias
```tsx
import { client } from '@/sanity/lib/client'
import NavBar from "@/app/components/NavBar"
```

### Card pattern
```tsx
<div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-l-terracotta border border-stone-grey/10 shadow-sm hover:shadow-md transition-shadow duration-300">
```

### Section pattern
```tsx
<section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
```

---

## Dev Commands

```bash
npm run dev    # Development server
npm run build  # Production build
npm run lint   # ESLint
```

---

## Status Halaman

| Halaman | Status |
|---|---|
| `/` Homepage | ✅ Selesai (full sections) |
| `/studio` Sanity Studio | ✅ Selesai |
| `/about` | ❌ Belum dibuat |
| `/jadwal` | ❌ Belum dibuat |
| `/berita` | ❌ Belum dibuat |
| `/berita/[slug]` | ❌ Belum dibuat |
| `/khotbah` | ❌ Belum dibuat |
| `/galeri` | ❌ Belum dibuat |
| `/acara` | ❌ Belum dibuat |
| `/tim` | ❌ Belum dibuat |

---

## Catatan Penting

- **Tailwind v4**: Konfigurasi via `@theme` di `globals.css`, bukan `tailwind.config.js`.
- **next-sanity v13**: Gunakan `createClient` dari `next-sanity`, bukan `@sanity/client` langsung.
- **Image dari Sanity**: Gunakan `@sanity/image-url` untuk build URL gambar.
- **`useCdn`**: `false` di development, `true` di production (sudah dikonfigurasi di `client.ts`).
- **Revalidasi**: ISR 60 detik di production, 0 (no cache) di development.
- **`eslint-disable @next/next/no-img-element`**: Dipakai sementara untuk gambar eksternal. Sebaiknya migrasi ke `next/image` ke depannya.
