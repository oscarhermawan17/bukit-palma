import { SchemaTypeDefinition } from 'sanity'
import { ibadah } from './ibadah'
import { berita } from './berita'
import { acara } from './acara'
import { galeri } from './galeri'
import { khotbah } from './khotbah'
import { timPelayan } from './timPelayan'

export const schemaTypes: SchemaTypeDefinition[] = [
  ibadah,
  berita,
  acara,
  galeri,
  khotbah,
  timPelayan,
]
