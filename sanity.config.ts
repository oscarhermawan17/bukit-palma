import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemaTypes"

const INFO_GEREJA_ID = "infoGereja-singleton"
const PENGATURAN_ID = "pengaturan-singleton"
const BANK_ID = "bank-singleton"

export default defineConfig({
  name: "gereja-bukit-palma",
  title: "Gereja Bukit Palma",

  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Konten")
          .items([
            // Singleton — langsung buka form, tanpa list
            S.listItem()
              .title("Informasi Gereja")
              .id("infoGereja")
              .child(
                S.document()
                  .schemaType("infoGereja")
                  .documentId(INFO_GEREJA_ID),
              ),

            S.listItem()
              .title("Pengaturan")
              .id("pengaturan")
              .child(
                S.document().schemaType("pengaturan").documentId(PENGATURAN_ID),
              ),

            S.listItem()
              .title("Bank & QRIS")
              .id("bank")
              .child(S.document().schemaType("bank").documentId(BANK_ID)),

            S.divider(),

            // Semua document type lainnya (otomatis jadi list)
            ...S.documentTypeListItems().filter(
              (item) =>
                item.getId() !== "infoGereja" &&
                item.getId() !== "pengaturan" &&
                item.getId() !== "bank",
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
