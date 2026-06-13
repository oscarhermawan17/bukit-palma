import { defineField, defineType } from "sanity"

export const lokasi = defineType({
  name: "lokasi",
  title: "Daftar Lokasi",
  type: "document",
  fields: [
    defineField({
      name: "nama",
      title: "Nama Tempat",
      type: "string",
      description:
        "Contoh: Gedung Utama Gereja, Aula Samping, Gedung Wilayah Timur",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "linkGmaps",
      title: "Link Google Maps",
      type: "url",
      description: "Tempel link dari Google Maps (opsional)",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Harus berupa URL yang valid",
        ),
    }),
  ],

  preview: {
    select: {
      title: "nama",
      subtitle: "linkGmaps",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? subtitle : "Tanpa link Google Maps",
      }
    },
  },
})
