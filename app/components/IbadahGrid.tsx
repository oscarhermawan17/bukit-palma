import { client } from "@/sanity/lib/client"

type IbadahItem = {
  _id: string
  tipe: string
  namaKhusus?: string
  waktu?: string
  lokasi: string
  linkLokasi?: string
  tema?: string
  pembawakhotbah?: string
  wartaUrl?: string
}

const TIPE_LABEL: Record<string, string> = {
  umum: "Kebaktian Umum",
  khusus: "Ibadah Khusus",
  kaumBapak: "Kaum Bapak",
  kaumIbu: "Kaum Ibu",
  pemuda: "Pemuda",
  sekolahMinggu: "Sekolah Minggu",
  kebaktianKeluarga: "Kebaktian Keluarga",
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

async function fetchIbadah(): Promise<IbadahItem[]> {
  const data = await client.fetch(
    `*[_type == "ibadah" && tampilDiHomepage == true && waktu >= now()] | order(waktu asc) {
      _id, tipe, namaKhusus, waktu, lokasi, linkLokasi, tema, pembawakhotbah, "wartaUrl": wartaPdf.asset->url
    }`,
    {},
    { next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 } },
  )
  return data
}

function getCardTitle(item: IbadahItem, umumIndex: number): string {
  if (item.tipe === "khusus") return item.namaKhusus ?? "Ibadah Khusus"
  return TIPE_LABEL[item.tipe] ?? item.tipe
}

function formatTanggal(waktu: string): string {
  return new Date(waktu).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Makassar",
  })
}

function formatJam(waktu: string): string {
  return new Date(waktu)
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Makassar",
    })
    .replace(":", ".")
}

function IbadahCard({
  item,
  umumIndex,
}: {
  item: IbadahItem
  umumIndex: number
}) {
  const title = getCardTitle(item, umumIndex)

  return (
    <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-l-terracotta border-t border-r border-b border-t-stone-grey/10 border-r-stone-grey/10 border-b-stone-grey/10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-terracotta text-[32px]">
          schedule
        </span>
        <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="mb-4">
        {item.waktu && (
          <p className="font-label-lg text-terracotta mb-1">
            {formatTanggal(item.waktu)}
          </p>
        )}
        <p className="font-headline-sm text-headline-sm text-primary mb-1">
          {item.waktu ? formatJam(item.waktu) : "—"} WITA
        </p>
        {item.pembawakhotbah && (
          <p className="font-body-md text-body-md text-on-surface font-bold">
            {item.pembawakhotbah}
          </p>
        )}
        {item.tema && (
          <p className="font-body-md text-body-md text-stone-grey italic mt-1">
            &ldquo;{item.tema}&rdquo;
          </p>
        )}
      </div>
      <div className="mt-auto pt-4 border-t border-stone-grey/15">
        {item.linkLokasi ? (
          <a
            href={item.linkLokasi}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 mb-4 hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined text-stone-grey group-hover:text-primary text-[20px]">
              location_on
            </span>
            <span className="underline underline-offset-2">{item.lokasi}</span>
          </a>
        ) : (
          <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-stone-grey text-[20px]">
              location_on
            </span>
            {item.lokasi}
          </p>
        )}
        {item.wartaUrl && (
          <a
            href={item.wartaUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center justify-center w-full gap-2 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors py-2 rounded-lg font-label-lg text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            Download Warta
          </a>
        )}
      </div>
    </div>
  )
}

export default async function IbadahGrid() {
  const items = await fetchIbadah()
  const n = items.length

  // Pre-compute per-item umum index for titling
  let umumCounter = 0
  const umumIndices = items.map((item) =>
    item.tipe === "umum" ? umumCounter++ : -1,
  )

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
          <div
            key={item._id}
            className={`w-full ${n === 1 ? "md:w-1/2" : "md:w-5/12"}`}
          >
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
