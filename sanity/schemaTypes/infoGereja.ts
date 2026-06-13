import { defineArrayMember, defineField, defineType } from "sanity"

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

    // ─── Hero Carousel ───────────────────────────────────────────
    defineField({
      name: "slideCarousel",
      title: "Slide Hero Carousel",
      type: "array",
      description: "Slide yang ditampilkan di bagian atas halaman utama",
      of: [
        defineArrayMember({
          type: "object",
          name: "slide",
          title: "Slide",
          fields: [
            defineField({
              name: "gambar",
              title: "Gambar",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "judul",
              title: "Judul",
              type: "string",
            }),
            defineField({
              name: "subjudul",
              title: "Sub Judul",
              type: "string",
            }),
            defineField({
              name: "aktif",
              title: "Aktif",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "judul",
              subtitle: "subjudul",
              media: "gambar",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title ?? "(Tanpa Judul)",
                subtitle,
                media,
              }
            },
          },
        }),
      ],
    }),

    // ─── Lembaga & Kategorial ────────────────────────────────────
    defineField({
      name: "lembaga",
      title: "Lembaga & Kategorial",
      type: "array",
      description: "Upload logo/foto lembaga dan kategorial gereja",
      of: [
        defineArrayMember({
          type: "object",
          name: "itemLembaga",
          title: "Lembaga",
          fields: [
            defineField({
              name: "nama",
              title: "Nama Lembaga",
              type: "string",
              description: "Dipakai sebagai alt text gambar",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "gambar",
              title: "Gambar / Logo",
              type: "image",
              options: { hotspot: false },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL (opsional)",
              type: "url",
              description: "Link redirect ke halaman lembaga tersebut",
              validation: (Rule) =>
                Rule.uri({ scheme: ["http", "https"] }).error(
                  "Harus berupa URL yang valid",
                ),
            }),
          ],
          preview: {
            select: {
              title: "nama",
              media: "gambar",
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "namaGereja",
      subtitle: "alamat",
    },
  },
})
