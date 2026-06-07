import { defineField, defineType } from 'sanity'

export const berita = defineType({
  name: 'berita',
  title: 'Berita & Pengumuman',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'judul' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Berita', value: 'berita' },
          { title: 'Pengumuman', value: 'pengumuman' },
          { title: 'Renungan', value: 'renungan' },
        ],
      },
    }),
    defineField({
      name: 'gambarUtama',
      title: 'Gambar Utama',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ringkasan',
      title: 'Ringkasan',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'konten',
      title: 'Konten',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'tanggalTerbit',
      title: 'Tanggal Terbit',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'penulis',
      title: 'Penulis',
      type: 'string',
    }),
    defineField({
      name: 'dipublikasikan',
      title: 'Dipublikasikan',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'judul',
      subtitle: 'kategori',
      media: 'gambarUtama',
    },
  },
})
