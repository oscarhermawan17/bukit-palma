import { defineField, defineType } from 'sanity'

const TIPE_KATEGORIAL = ['kaumBapak', 'kaumIbu', 'pemuda', 'sekolahMinggu', 'kebaktianKeluarga']

export const ibadah = defineType({
  name: 'ibadah',
  title: 'Jadwal Ibadah',
  type: 'document',
  fields: [
    defineField({
      name: 'tipe',
      title: 'Tipe Ibadah',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Umum', value: 'umum' },
          { title: 'Khusus (Natal, Paskah, dll)', value: 'khusus' },
          { title: '— Kategorial —', value: '' },
          { title: 'Kaum Bapak', value: 'kaumBapak' },
          { title: 'Kaum Ibu', value: 'kaumIbu' },
          { title: 'Pemuda', value: 'pemuda' },
          { title: 'Sekolah Minggu', value: 'sekolahMinggu' },
          { title: 'Kebaktian Keluarga', value: 'kebaktianKeluarga' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'namaKhusus',
      title: 'Nama Ibadah Khusus',
      type: 'string',
      description: 'Contoh: Malam Natal, Natal, Paskah, Jumat Agung',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const tipe = (context.document as { tipe?: string })?.tipe
          if (tipe === 'khusus' && !value) return 'Wajib diisi untuk ibadah khusus'
          return true
        }),
      hidden: ({ document }) => (document?.tipe as string) !== 'khusus',
    }),

    defineField({
      name: 'tanggal',
      title: 'Tanggal',
      type: 'date',
      options: { dateFormat: 'DD MMMM YYYY' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'jam',
      title: 'Jam Mulai',
      type: 'string',
      description: 'Contoh: 08.00, 10.30, 19.00',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'lokasi',
      title: 'Lokasi',
      type: 'string',
      description: 'Contoh: Gedung Utama Gereja, Aula Samping, Gedung Wilayah Timur',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tuanRumah',
      title: 'Tuan Rumah / Keluarga yang Ditunjuk',
      type: 'string',
      description: 'Contoh: Keluarga Bpk. Sinaga',
      hidden: ({ document }) =>
        !TIPE_KATEGORIAL.includes((document?.tipe as string) ?? ''),
    }),

    defineField({
      name: 'pembawakhotbah',
      title: 'Pembawa Khotbah',
      type: 'string',
    }),

    defineField({
      name: 'tema',
      title: 'Tema Khotbah',
      type: 'string',
      description: 'Opsional — bisa diisi setelah tema ditentukan',
    }),

    defineField({
      name: 'tampilDiHomepage',
      title: 'Tampilkan di Halaman Utama',
      type: 'boolean',
      description: 'Aktifkan agar jadwal ini muncul di homepage website',
      initialValue: false,
    }),

    defineField({
      name: 'catatan',
      title: 'Catatan Tambahan',
      type: 'text',
      rows: 2,
      description: 'Opsional — informasi tambahan untuk jemaat',
    }),
  ],

  preview: {
    select: {
      tipe: 'tipe',
      namaKhusus: 'namaKhusus',
      tanggal: 'tanggal',
      jam: 'jam',
      lokasi: 'lokasi',
    },
    prepare({ tipe, namaKhusus, tanggal, jam, lokasi }) {
      const labelMap: Record<string, string> = {
        umum: 'Umum',
        khusus: 'Khusus',
        kaumBapak: 'Kaum Bapak',
        kaumIbu: 'Kaum Ibu',
        pemuda: 'Pemuda',
        sekolahMinggu: 'Sekolah Minggu',
        kebaktianKeluarga: 'Kebaktian Keluarga',
      }
      const label = labelMap[tipe] ?? tipe
      const judul = tipe === 'khusus' && namaKhusus ? namaKhusus : `Ibadah ${label}`
      const tgl = tanggal
        ? new Date(tanggal).toLocaleDateString('id-ID', { dateStyle: 'medium' })
        : ''
      return {
        title: judul,
        subtitle: `${tgl}${jam ? ' · ' + jam : ''}${lokasi ? ' · ' + lokasi : ''}`,
      }
    },
  },

  orderings: [
    {
      title: 'Tanggal Terbaru',
      name: 'tanggalDesc',
      by: [{ field: 'tanggal', direction: 'desc' }],
    },
    {
      title: 'Tanggal Terlama',
      name: 'tanggalAsc',
      by: [{ field: 'tanggal', direction: 'asc' }],
    },
  ],
})
