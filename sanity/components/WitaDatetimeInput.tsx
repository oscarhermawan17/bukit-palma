"use client"

import { set, unset } from "sanity"
import type { StringInputProps } from "sanity"

/**
 * Custom datetime input yang selalu menginterpretasikan input sebagai WITA (UTC+8).
 * Sanity menyimpan datetime sebagai UTC — komponen ini memastikan konversi
 * selalu dari WITA, bukan dari timezone browser admin.
 */
export function WitaDatetimeInput(props: StringInputProps) {
  const { value, onChange } = props

  // Konversi nilai UTC yang tersimpan → local datetime string untuk input (dalam WITA)
  const toInputValue = (utcIso: string | undefined): string => {
    if (!utcIso) return ""
    const date = new Date(utcIso)
    // Offset WITA: UTC+8 = 480 menit
    const witaMs = date.getTime() + 8 * 60 * 60 * 1000
    const witaDate = new Date(witaMs)
    const yyyy = witaDate.getUTCFullYear()
    const mm = String(witaDate.getUTCMonth() + 1).padStart(2, "0")
    const dd = String(witaDate.getUTCDate()).padStart(2, "0")
    const hh = String(witaDate.getUTCHours()).padStart(2, "0")
    const min = String(witaDate.getUTCMinutes()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`
  }

  // Konversi nilai input (WITA) → ISO UTC untuk disimpan ke Sanity
  const toSanityValue = (localValue: string): string => {
    if (!localValue) return ""
    // Tambahkan +08:00 agar JavaScript tahu ini WITA
    return new Date(`${localValue}:00+08:00`).toISOString()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (!raw) {
      onChange(unset())
      return
    }
    onChange(set(toSanityValue(raw)))
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        type="datetime-local"
        value={toInputValue(value)}
        onChange={handleChange}
        style={{
          border: "1px solid var(--card-border-color, #e2e8f0)",
          borderRadius: "0.375rem",
          padding: "0.5rem 0.75rem",
          fontSize: "0.9375rem",
          width: "100%",
          background: "var(--card-bg-color, white)",
          color: "var(--card-fg-color, inherit)",
        }}
      />
      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--card-muted-fg-color, #6b7280)",
          marginTop: "0.25rem",
        }}
      >
        ⏰ Input dalam <strong>WITA (Waktu Indonesia Tengah, UTC+8)</strong> —
        berlaku untuk semua zona waktu.
      </p>
    </div>
  )
}
