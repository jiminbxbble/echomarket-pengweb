// Kotak "Apa yang anda pikirkan hari ini?" + jendela (modal) Buat Postingan
import { useRef, useState } from 'react'
import Ikon from './Ikon'
import { pengguna } from '../data/data'

export default function BuatPostingan({ onKirim }) {
  const [buka, setBuka] = useState(false)
  const [teks, setTeks] = useState('')
  const [gambar, setGambar] = useState([])
  const fileRef = useRef(null)

  // Pilih foto/video dari komputer, tampilkan pratinjaunya
  function pilihFile(e) {
    const files = [...e.target.files].slice(0, 4)
    setGambar(files.map((f) => URL.createObjectURL(f)))
  }

  function bukaDengan(pilihFoto) {
    setBuka(true)
    if (pilihFoto) setTimeout(() => fileRef.current?.click(), 50)
  }

  function kirim() {
    if (!teks.trim() && gambar.length === 0) return
    onKirim({ teks: teks.trim(), gambar })
    setTeks('')
    setGambar([])
    setBuka(false)
  }

  return (
    <>
      <section className="em-kotak em-buat">
        <button className="em-buat-input" onClick={() => bukaDengan(false)}>
          Apa yang anda pikirkan hari ini?
          <span className="em-plus"><Ikon nama="tambah" ukuran={20} /></span>
        </button>
        <div className="em-buat-aksi">
          <button onClick={() => bukaDengan(true)}><Ikon nama="foto" /> Tambahkan Foto</button>
          <button onClick={() => bukaDengan(true)}><Ikon nama="video" /> Tambahkan Video</button>
        </div>
      </section>

      {buka && (
        <div className="em-modal-latar" onClick={() => setBuka(false)}>
          <div className="em-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Buat Postingan">
            <div className="em-modal-kepala">
              <h3>Buat Postingan</h3>
              <button onClick={() => setBuka(false)} aria-label="Tutup"><Ikon nama="tutup" /></button>
            </div>

            <div className="em-penulis">
              <img src={pengguna.avatar} alt="" />
              <b>{pengguna.nama}</b>
            </div>

            <textarea
              autoFocus
              placeholder={`Apa yang sedang kamu pikirkan, ${pengguna.nama}?`}
              value={teks}
              onChange={(e) => setTeks(e.target.value)}
            />

            {gambar.length > 0 && (
              <div className="em-pratinjau">
                {gambar.map((g) => <img key={g} src={g} alt="" />)}
              </div>
            )}

            <div className="em-modal-tambah">
              <span>Tambahkan Foto/Video</span>
              <button onClick={() => fileRef.current.click()} aria-label="Pilih foto"><Ikon nama="foto" /></button>
              <input ref={fileRef} type="file" accept="image/*,video/*" multiple hidden onChange={pilihFile} />
            </div>

            <button className="em-btn-hijau lebar" onClick={kirim} disabled={!teks.trim() && gambar.length === 0}>
              Kirim
            </button>
          </div>
        </div>
      )}
    </>
  )
}
