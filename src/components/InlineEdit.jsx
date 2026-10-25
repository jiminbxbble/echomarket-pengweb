import { useState } from 'react'

// Baris field dengan tombol "Ubah" -> muncul input -> "Simpan"
export default function InlineEdit({
  label, value, onChange, onNotify,
  type = 'text', placeholder, emptyText = '-', format, validate, minWidth,
}) {
  const [editing, setEditing] = useState(false)
  const [temp, setTemp] = useState('')

  const start = () => {
    setTemp(value)
    setEditing(true)
  }

  const commit = () => {
    const v = temp.trim()
    const error = validate?.(v)
    if (error) {
      onNotify(error)
      return
    }
    onChange(v)
    setEditing(false)
    onNotify('Berhasil diubah (jangan lupa simpan)')
  }

  return (
    <div className="row">
      <span>{label}</span>
      <div className="v">
        {editing ? (
          <input
            className="f sm"
            type={type}
            value={temp}
            placeholder={placeholder}
            inputMode={type === 'tel' ? 'numeric' : undefined}
            autoFocus
            onChange={(e) => setTemp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && commit()}
          />
        ) : (
          <span style={{ minWidth }}>{value ? (format ? format(value) : value) : emptyText}</span>
        )}
        <button type="button" className="lnk" onClick={editing ? commit : start}>
          {editing ? 'Simpan' : 'Ubah'}
        </button>
      </div>
    </div>
  )
}
