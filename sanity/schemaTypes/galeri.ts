import { defineField, defineType } from 'sanity'

export const galeri = defineType({
  name: 'galeri',
  title: 'Galeri Foto',
  type: 'document',
  fields: [
    defineField({
      name: 'namaAlbum',
      title: 'Nama Album',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'namaAlbum' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tanggal',
      title: 'Tanggal Kegiatan',
      type: 'date',
    }),
    defineField({
      name: 'keterangan',
      title: 'Keterangan Album',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'coverFoto',
      title: 'Cover Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'foto',
      title: 'Foto-foto',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Keterangan Foto', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'namaAlbum',
      subtitle: 'tanggal',
      media: 'coverFoto',
    },
    prepare({ title, subtitle }) {
      const tanggal = subtitle
        ? new Date(subtitle).toLocaleDateString('id-ID', { dateStyle: 'medium' })
        : ''
      return { title, subtitle: tanggal }
    },
  },
})
