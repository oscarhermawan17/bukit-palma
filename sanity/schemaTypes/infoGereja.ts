import { defineField, defineType } from "sanity"

export const infoGereja = defineType({
  name: "infoGereja",
  title: "Informasi Gereja",
  type: "document",

  fields: [
    defineField({
      name: "namaGereja",
      title: "Nama Gereja",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "alamat",
      title: "Alamat Gereja",
      type: "text",
      rows: 3,
      description: "Contoh: Jl. Debes No.6, Tabanan, Bali 82112",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "linkGmaps",
      title: "Link Google Maps",
      type: "url",
      description: "Tempel link dari Google Maps",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Harus berupa URL yang valid",
        ),
    }),

    defineField({
      name: "noTelepon",
      title: "No. Telepon",
      type: "string",
      description: "Contoh: +62 361 223758",
    }),

    // ─── Media Sosial ────────────────────────────────────────────
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Contoh: bukitpalma@gmail.com",
    }),

    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Harus berupa URL yang valid",
        ),
    }),

    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Harus berupa URL yang valid",
        ),
    }),

    defineField({
      name: "youtube",
      title: "YouTube",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Harus berupa URL yang valid",
        ),
    }),

    defineField({
      name: "tiktok",
      title: "TikTok",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Harus berupa URL yang valid",
        ),
    }),
  ],

  preview: {
    select: {
      title: "namaGereja",
      subtitle: "alamat",
    },
  },
})
