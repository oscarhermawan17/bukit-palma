import 'server-only'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  // CDN dimatikan di dev agar perubahan data langsung terlihat
  useCdn: process.env.NODE_ENV === 'production',
  // Disable stega/visual editing — mencegah next-sanity menyuntikkan
  // overlay client-side ke semua halaman (penyebab 874 KiB unused JS)
  stega: { enabled: false },
})
