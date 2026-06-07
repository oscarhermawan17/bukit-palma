import { defineField, defineType } from 'sanity'

export const jadwalIbadah = defineType({
  name: 'jadwalIbadah',
  title: 'Jadwal Ibadah',
  type: 'document',
  fields: [
    defineField({
      name: 'jenis',
      title: 'Jenis Kebaktian',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Kebaktian Umum', value: 'umum' },
          { title: 'Kebaktian Pemuda', value: 'pemuda' },
          { title: 'Kebaktian Anak', value: 'anak' },
          { title: 'Kebaktian Keluarga', value: 'keluarga' },
          { title: 'Doa Pagi', value: 'doaPagi' },
          { title: 'Pendalaman Alkitab', value: 'pa' },
        ],
      },
    }),
    defineField({
      name: 'hari',
      title: 'Hari',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu',
        ],
      },
    }),
    defineField({
      name: 'jam',
      title: 'Jam (contoh: 08:00)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lokasi',
      title: 'Lokasi / Ruangan',
      type: 'string',
    }),
    defineField({
      name: 'keterangan',
      title: 'Keterangan Tambahan',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'aktif',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Hari',
      name: 'hariAsc',
      by: [{ field: 'hari', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'jenis',
      subtitle: 'hari',
      media: 'aktif',
    },
    prepare({ title, subtitle }) {
      return { title, subtitle }
    },
  },
})
