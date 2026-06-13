"use client"

import { useEffect, useState } from "react"
import { set, StringInputProps, useClient } from "sanity"

type LokasiOption = {
  nama: string
  linkGmaps: string
}

export function LokasiUrlInput(props: StringInputProps) {
  const client = useClient({ apiVersion: "2024-01-01" })
  const [options, setOptions] = useState<LokasiOption[]>([])

  useEffect(() => {
    client
      .fetch<LokasiOption[]>(
        `*[_type == "lokasi" && defined(linkGmaps) && linkGmaps != ""] | order(nama asc) { nama, linkGmaps }`,
      )
      .then(setOptions)
      .catch(() => setOptions([]))
  }, [client])

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value
    if (val) {
      props.onChange(set(val))
    }
    // reset dropdown kembali ke placeholder
    e.target.value = ""
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {options.length > 0 && (
        <select
          defaultValue=""
          onChange={handleSelect}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "13px",
            color: "#444",
            background: "#fafafa",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>
            ⬇ Isi otomatis dari Daftar Lokasi…
          </option>
          {options.map((o) => (
            <option key={o.linkGmaps} value={o.linkGmaps}>
              {o.nama}
            </option>
          ))}
        </select>
      )}
      {props.renderDefault(props)}
    </div>
  )
}
