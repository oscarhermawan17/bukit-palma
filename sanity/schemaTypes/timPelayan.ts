import { defineField, defineType } from 'sanity'

export const timPelayan = defineType({
  name: 'timPelayan',
  title: 'Tim Pelayan & Pengurus',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'jabatan',
      title: 'Jabatan / Peran',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Contoh: Pendeta Jemaat, Majelis, Worship Leader',
    }),
    defineField({
      name: 'divisi',
      title: 'Divisi / Bidang',
      type: 'string',
      options: {
        list: [
          { title: 'Kepemimpinan', value: 'kepemimpinan' },
          { title: 'Ibadah & Musik', value: 'ibadah' },
          { title: 'Pemuda', value: 'pemuda' },
          { title: 'Anak & Remaja', value: 'anak' },
          { title: 'Diakonia / Sosial', value: 'diakonia' },
          { title: 'Administrasi', value: 'administrasi' },
          { title: 'Lainnya', value: 'lainnya' },
        ],
      },
    }),
    defineField({
      name: 'biografi',
      title: 'Biografi Singkat',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'urutan',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka kecil tampil lebih dulu',
      initialValue: 99,
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
      title: 'Urutan',
      name: 'urutanAsc',
      by: [{ field: 'urutan', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nama',
      subtitle: 'jabatan',
      media: 'foto',
    },
  },
})
