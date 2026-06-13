import { client } from '@/sanity/lib/client'

type IbadahItem = {
  _id: string
  tipe: string
  namaKhusus?: string
  tanggal?: string
  jam: string
  lokasi: string
  tema?: string
  pembawakhotbah?: string
}

const TIPE_LABEL: Record<string, string> = {
  umum: 'Ibadah Umum',
  khusus: 'Ibadah Khusus',
  kaumBapak: 'Kaum Bapak',
  kaumIbu: 'Kaum Ibu',
  pemuda: 'Pemuda',
  sekolahMinggu: 'Sekolah Minggu',
  kebaktianKeluarga: 'Kebaktian Keluarga',
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

async function fetchIbadah(): Promise<IbadahItem[]> {
  return client.fetch(
    `*[_type == "ibadah" && tampilDiHomepage == true] | order(jam asc) {
      _id, tipe, namaKhusus, tanggal, jam, lokasi, tema, pembawakhotbah
    }`,
    {},
    { next: { revalidate: process.env.NODE_ENV === 'production' ? 60 : 0 } },
  )
}

function getCardTitle(item: IbadahItem, umumIndex: number): string {
  if (item.tipe === 'khusus') return item.namaKhusus ?? 'Ibadah Khusus'
  if (item.tipe === 'umum') return `Kebaktian ${ROMAN[umumIndex] ?? umumIndex + 1}`
  return TIPE_LABEL[item.tipe] ?? item.tipe
}

function formatTanggal(tanggal: string): string {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function IbadahCard({ item, umumIndex }: { item: IbadahItem; umumIndex: number }) {
  const title = getCardTitle(item, umumIndex)
  const subtitle = item.tema ?? TIPE_LABEL[item.tipe] ?? item.tipe

  return (
    <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-l-terracotta border-t border-r border-b border-t-stone-grey/10 border-r-stone-grey/10 border-b-stone-grey/10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-terracotta text-[32px]">schedule</span>
        <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="mb-4">
        <p className="font-headline-sm text-headline-sm text-primary mb-1">{item.jam} WITA</p>
        {item.tanggal && (
          <p className="font-body-md text-body-md text-stone-grey/70 mb-1">
            {formatTanggal(item.tanggal)}
          </p>
        )}
        <p className="font-body-md text-body-md text-stone-grey">{subtitle}</p>
        {item.pembawakhotbah && (
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Dilayani oleh:{' '}
            <span className="text-primary font-semibold">{item.pembawakhotbah}</span>
          </p>
        )}
      </div>
      <div className="mt-auto pt-4 border-t border-stone-grey/15">
        <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-stone-grey text-[20px]">location_on</span>
          {item.lokasi}
        </p>
      </div>
    </div>
  )
}

export default async function IbadahGrid() {
  const items = await fetchIbadah()
  const n = items.length

  // Pre-compute per-item umum index for titling
  let umumCounter = 0
  const umumIndices = items.map((item) => (item.tipe === 'umum' ? umumCounter++ : -1))

  if (n === 0) {
    return (
      <p className="text-center font-body-md text-body-md text-stone-grey py-8">
        Belum ada jadwal ibadah yang ditampilkan.
      </p>
    )
  }

  // 1 or 2 items → centered, larger cards
  if (n <= 2) {
    return (
      <div className="flex flex-col md:flex-row justify-center gap-gutter">
        {items.map((item, i) => (
          <div key={item._id} className={`w-full ${n === 1 ? 'md:w-1/2' : 'md:w-5/12'}`}>
            <IbadahCard item={item} umumIndex={umumIndices[i]} />
          </div>
        ))}
      </div>
    )
  }

  // 3+ items
  const remainder = n % 3
  if (remainder === 0) {
    // Perfect multiple of 3 → clean grid
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {items.map((item, i) => (
          <IbadahCard key={item._id} item={item} umumIndex={umumIndices[i]} />
        ))}
      </div>
    )
  }

  // Has a remainder row: split into full rows + partial last row
  const mainItems = items.slice(0, n - remainder)
  const lastItems = items.slice(n - remainder)

  return (
    <div className="flex flex-col gap-gutter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {mainItems.map((item, i) => (
          <IbadahCard key={item._id} item={item} umumIndex={umumIndices[i]} />
        ))}
      </div>
      {/* Partial last row — centered with same card width as grid-cols-3 */}
      <div className="flex flex-col md:flex-row justify-center gap-gutter">
        {lastItems.map((item, j) => {
          const i = n - remainder + j
          return (
            <div key={item._id} className="w-full md:w-1/3">
              <IbadahCard item={item} umumIndex={umumIndices[i]} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
