import { defineField, defineType } from "sanity"

export const pengaturan = defineType({
  name: "pengaturan",
  title: "Pengaturan",
  type: "document",

  fields: [
    // ─── Persembahan ────────────────────────────────────────────
    defineField({
      name: "aktifkanQris",
      title: "Aktifkan QRIS",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "aktifkanTransferBank",
      title: "Aktifkan Transfer Bank",
      type: "boolean",
      initialValue: true,
    }),

    // ─── Tema Bulanan ────────────────────────────────────────────
    defineField({
      name: "temaBulanan",
      title: "Tema Bulanan",
      type: "object",
      fields: [
        defineField({
          name: "kataKata",
          title: "Kata-Kata",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "pasal",
          title: "Pasal / Ayat Alkitab",
          type: "string",
          description: "Contoh: Yohanes 3:16",
        }),
      ],
    }),

    // ─── Tema Persembahan ────────────────────────────────────────
    defineField({
      name: "temaPersembahan",
      title: "Tema Persembahan",
      type: "object",
      fields: [
        defineField({
          name: "kataKata",
          title: "Kata-Kata",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "pasal",
          title: "Pasal / Ayat Alkitab",
          type: "string",
          description: "Contoh: 2 Korintus 9:7",
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: "Pengaturan" }
    },
  },
})
