import { defineField, defineType } from 'sanity'

export const khotbah = defineType({
  name: 'khotbah',
  title: 'Khotbah & Renungan',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Khotbah',
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
      name: 'pengkhotbah',
      title: 'Pengkhotbah',
      type: 'string',
    }),
    defineField({
      name: 'tanggal',
      title: 'Tanggal',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ayatAlkitab',
      title: 'Ayat Alkitab',
      type: 'string',
      description: 'Contoh: Yohanes 3:16',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'linkYoutube',
      title: 'Link YouTube',
      type: 'url',
    }),
    defineField({
      name: 'linkAudio',
      title: 'Link Audio (MP3)',
      type: 'url',
    }),
    defineField({
      name: 'teksKhotbah',
      title: 'Teks Khotbah',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'seri',
      title: 'Seri Khotbah',
      type: 'string',
      description: 'Isi jika khotbah ini bagian dari seri tertentu',
    }),
  ],
  preview: {
    select: {
      title: 'judul',
      subtitle: 'pengkhotbah',
      media: 'thumbnail',
    },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `oleh ${subtitle}` : '' }
    },
  },
})
