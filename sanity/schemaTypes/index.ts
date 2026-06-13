import { SchemaTypeDefinition } from "sanity"
import { ibadah } from "./ibadah"
import { berita } from "./berita"
import { acara } from "./acara"
import { galeri } from "./galeri"
import { khotbah } from "./khotbah"
import { timPelayan } from "./timPelayan"
import { lokasi } from "./lokasi"
import { infoGereja } from "./infoGereja"
import { pengaturan } from "./pengaturan"
import { bank } from "./bank"

export const schemaTypes: SchemaTypeDefinition[] = [
  infoGereja,
  pengaturan,
  bank,
  ibadah,
  berita,
  acara,
  galeri,
  khotbah,
  timPelayan,
  lokasi,
]
