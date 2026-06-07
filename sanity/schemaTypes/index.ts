import { SchemaTypeDefinition } from 'sanity'
import { jadwalIbadah } from './jadwalIbadah'
import { berita } from './berita'
import { acara } from './acara'
import { galeri } from './galeri'
import { khotbah } from './khotbah'
import { timPelayan } from './timPelayan'

export const schemaTypes: SchemaTypeDefinition[] = [
  jadwalIbadah,
  berita,
  acara,
  galeri,
  khotbah,
  timPelayan,
]
