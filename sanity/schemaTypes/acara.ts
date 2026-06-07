import { defineField, defineType } from 'sanity'

export const acara = defineType({
  name: 'acara',
  title: 'Acara & Event',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Acara',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nama' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster / Gambar',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'deskripsi',
      title: 'Deskripsi',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'tanggalMulai',
      title: 'Tanggal & Jam Mulai',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tanggalSelesai',
      title: 'Tanggal & Jam Selesai',
      type: 'datetime',
    }),
    defineField({
      name: 'lokasi',
      title: 'Lokasi',
      type: 'string',
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Ibadah Khusus', value: 'ibadahKhusus' },
          { title: 'Retreat', value: 'retreat' },
          { title: 'Seminar', value: 'seminar' },
          { title: 'Pelayanan Sosial', value: 'sosial' },
          { title: 'Lainnya', value: 'lainnya' },
        ],
      },
    }),
    defineField({
      name: 'aktif',
      title: 'Tampilkan di Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'nama',
      subtitle: 'tanggalMulai',
      media: 'poster',
    },
    prepare({ title, subtitle }) {
      const tanggal = subtitle
        ? new Date(subtitle).toLocaleDateString('id-ID', { dateStyle: 'medium' })
        : ''
      return { title, subtitle: tanggal }
    },
  },
})
