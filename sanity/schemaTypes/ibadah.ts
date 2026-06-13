import { defineField, defineType } from "sanity"
import { LokasiUrlInput } from "../components/LokasiUrlInput"
import { WitaDatetimeInput } from "../components/WitaDatetimeInput"

const TIPE_KATEGORIAL = [
  "kaumBapak",
  "kaumIbu",
  "pemuda",
  "sekolahMinggu",
  "kebaktianKeluarga",
]

export const ibadah = defineType({
  name: "ibadah",
  title: "Jadwal Ibadah",
  type: "document",
  fields: [
    defineField({
      name: "tipe",
      title: "Tipe Ibadah",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Umum", value: "umum" },
          { title: "Khusus (Natal, Paskah, dll)", value: "khusus" },
          { title: "— Kategorial —", value: "" },
          { title: "Kaum Bapak", value: "kaumBapak" },
          { title: "Kaum Ibu", value: "kaumIbu" },
          { title: "Pemuda", value: "pemuda" },
          { title: "Sekolah Minggu", value: "sekolahMinggu" },
          { title: "Kebaktian Keluarga", value: "kebaktianKeluarga" },
        ],
        layout: "radio",
      },
    }),

    defineField({
      name: "namaKhusus",
      title: "Nama Ibadah Khusus",
      type: "string",
      description: "Contoh: Malam Natal, Natal, Paskah, Jumat Agung",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const tipe = (context.document as { tipe?: string })?.tipe
          if (tipe === "khusus" && !value)
            return "Wajib diisi untuk ibadah khusus"
          return true
        }),
      hidden: ({ document }) => (document?.tipe as string) !== "khusus",
    }),

    defineField({
      name: "waktu",
      title: "Tanggal & Jam Ibadah",
      type: "datetime",
      options: {
        dateFormat: "DD MMMM YYYY",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      components: {
        input: WitaDatetimeInput,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "lokasi",
      title: "Lokasi",
      type: "string",
      description:
        "Contoh: Gedung Utama Gereja, Aula Samping, Gedung Wilayah Timur",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "linkLokasi",
      title: "Link Lokasi (Google Maps)",
      type: "url",
      description:
        "Opsional — pilih dari dropdown untuk mengisi otomatis, atau ketik manual.",
      components: {
        input: LokasiUrlInput,
      },
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Harus berupa URL yang valid",
        ),
    }),

    defineField({
      name: "tuanRumah",
      title: "Tuan Rumah / Keluarga yang Ditunjuk",
      type: "string",
      description: "Contoh: Keluarga Bpk. Sinaga",
      hidden: ({ document }) =>
        !TIPE_KATEGORIAL.includes((document?.tipe as string) ?? ""),
    }),

    defineField({
      name: "pembawakhotbah",
      title: "Pembawa Khotbah",
      type: "string",
    }),

    defineField({
      name: "tema",
      title: "Tema Khotbah",
      type: "string",
      description: "Opsional — bisa diisi setelah tema ditentukan",
    }),

    defineField({
      name: "tampilDiHomepage",
      title: "Tampilkan di Halaman Utama",
      type: "boolean",
      description: "Aktifkan agar jadwal ini muncul di homepage website",
      initialValue: false,
    }),

    defineField({
      name: "wartaPdf",
      title: "Warta Jemaat (PDF)",
      type: "file",
      description: "Opsional — upload file PDF warta jemaat untuk ibadah ini",
      options: {
        accept: ".pdf,application/pdf",
      },
    }),

    defineField({
      name: "catatan",
      title: "Catatan Tambahan",
      type: "text",
      rows: 2,
      description: "Opsional — informasi tambahan untuk jemaat",
    }),
  ],

  preview: {
    select: {
      tipe: "tipe",
      namaKhusus: "namaKhusus",
      waktu: "waktu",
      lokasi: "lokasi",
    },
    prepare({ tipe, namaKhusus, waktu, lokasi }) {
      const labelMap: Record<string, string> = {
        umum: "Umum",
        khusus: "Khusus",
        kaumBapak: "Kaum Bapak",
        kaumIbu: "Kaum Ibu",
        pemuda: "Pemuda",
        sekolahMinggu: "Sekolah Minggu",
        kebaktianKeluarga: "Kebaktian Keluarga",
      }
      const label = labelMap[tipe] ?? tipe
      const judul =
        tipe === "khusus" && namaKhusus ? namaKhusus : `Ibadah ${label}`
      const dt = waktu ? new Date(waktu) : null
      const tgl = dt
        ? dt.toLocaleDateString("id-ID", { dateStyle: "medium" })
        : ""
      const jam = dt
        ? dt.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : ""
      return {
        title: judul,
        subtitle: `${tgl}${jam ? " · " + jam : ""}${lokasi ? " · " + lokasi : ""}`,
      }
    },
  },

  orderings: [
    {
      title: "Tanggal Terbaru",
      name: "waktuDesc",
      by: [{ field: "waktu", direction: "desc" }],
    },
    {
      title: "Tanggal Terlama",
      name: "waktuAsc",
      by: [{ field: "waktu", direction: "asc" }],
    },
  ],
})
