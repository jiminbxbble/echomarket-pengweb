import { useRef, useState } from 'react'
import Avatar from './Avatar'
import InlineEdit from './InlineEdit'

const EMAIL = 'Fauzein123@gmail.com'
const GENDERS = ['Laki-laki', 'Perempuan', 'Lainnya']
const MAX_SIZE = 1024 * 1024 // 1 MB

const validateUsername = (v) => (v.length < 3 ? 'Username minimal 3 karakter' : '')
const validatePhone = (v) =>
  v && !/^(\+62|0)8\d{7,12}$/.test(v) ? 'Nomor telepon tidak valid (contoh: 08123456789)' : ''
const formatDate = (iso) => iso.split('-').reverse().join('/') // yyyy-mm-dd -> dd/mm/yyyy

export default function ProfileForm({ profile, onSave, onNotify, namaRef }) {
  const [draft, setDraft] = useState(profile)
  const [imgError, setImgError] = useState('')
  const fileRef = useRef(null)

  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }))

  const handleFile = (e) => {
    const file = e.target.files[0]
    setImgError('')
    if (!file) return
    if (!/^image\/(jpeg|png)$/.test(file.type)) {
      setImgError('Format harus .JPEG atau .PNG')
      return
    }
    if (file.size > MAX_SIZE) {
      setImgError('Ukuran gambar maksimal 1 MB')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      set('photo', reader.result)
      onNotify('Foto dipilih, klik Simpan perubahan')
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <main>
      <h1>Profil saya</h1>
      <p className="sub">Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>

      <div className="grid">
        <div className="form">
          <InlineEdit
            label="Username" value={draft.username}
            onChange={(v) => set('username', v)} onNotify={onNotify}
            validate={validateUsername}
          />

          <div className="row">
            <span>Nama</span>
            <div className="v">
              <input
                ref={namaRef} className="f" autoComplete="off"
                value={draft.nama} onChange={(e) => set('nama', e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <span>Email</span>
            <div className="v">{EMAIL}</div>
          </div>

          <InlineEdit
            label="No. Telepon" type="tel" placeholder="08xxxxxxxxxx" minWidth={104}
            value={draft.telepon} onChange={(v) => set('telepon', v)} onNotify={onNotify}
            validate={validatePhone}
          />

          <div className="row">
            <span>Nama toko</span>
            <div className="v">
              <input
                className="f" autoComplete="off" placeholder="Belum ada nama toko"
                value={draft.toko} onChange={(e) => set('toko', e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <span>Jenis kelamin</span>
            <div className="cb">
              {GENDERS.map((g) => (
                <label key={g}>
                  <input
                    type="checkbox" checked={draft.gender === g}
                    onChange={(e) => set('gender', e.target.checked ? g : '')}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <InlineEdit
            label="Tanggal lahir" type="date" emptyText="dd/mm/yyyy"
            value={draft.tglLahir} onChange={(v) => set('tglLahir', v)} onNotify={onNotify}
            format={formatDate}
          />

          <button type="button" className="save" onClick={() => onSave(draft)}>
            Simpan perubahan
          </button>
        </div>

        <div className="right">
          <Avatar src={draft.photo} size={72} onClick={() => fileRef.current.click()} />
          <button type="button" className="btn-o" onClick={() => fileRef.current.click()}>
            Pilih gambar
          </button>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png" hidden onChange={handleFile} />
          <p>
            Ukuran gambar: maks. 1 MB<br />
            Format gambar: .JPEG, .PNG
          </p>
          <span className="err">{imgError}</span>
        </div>
      </div>
    </main>
  )
}
