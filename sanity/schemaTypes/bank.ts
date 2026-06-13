import { defineArrayMember, defineField, defineType } from "sanity"

export const bank = defineType({
  name: "bank",
  title: "Bank & QRIS",
  type: "document",

  fields: [
    defineField({
      name: "qris",
      title: "Gambar QRIS",
      type: "image",
      description: "Upload gambar QRIS (JPG/PNG)",
      options: {
        accept: "image/jpeg,image/jpg,image/png",
        hotspot: false,
      },
    }),

    defineField({
      name: "transferBank",
      title: "Transfer Bank",
      type: "array",
      description: "Tambahkan satu atau lebih rekening bank",
      of: [
        defineArrayMember({
          type: "object",
          name: "rekening",
          title: "Rekening",
          fields: [
            defineField({
              name: "namaBank",
              title: "Nama Bank",
              type: "string",
              description: "Contoh: Bank Mandiri",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "noRekening",
              title: "No. Rekening",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "atasNama",
              title: "Atas Nama",
              type: "string",
              description: "Nama pemilik rekening",
            }),
          ],
          preview: {
            select: {
              title: "namaBank",
              subtitle: "noRekening",
            },
            prepare({ title, subtitle }) {
              return {
                title: title ?? "Bank",
                subtitle: subtitle ?? "-",
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: "Bank & QRIS" }
    },
  },
})
