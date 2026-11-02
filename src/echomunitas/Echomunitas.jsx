
import { useState } from 'react'
import Header from './components/Header'
import MenuKiri from './components/MenuKiri'
import BuatPostingan from './components/BuatPostingan'
import Cerita from './components/Cerita'
import TutorBaris from './components/TutorBaris'
import Postingan from './components/Postingan'
import Tantangan from './components/Tantangan'
import { pengguna, postinganAwal, misiAwal } from './data/data'
import './echomunitas.css'

function tambahProgres(misi, ids) {
  const ubah = (list) => list.map((m) => (ids.includes(m.id) && m.progres < m.target ? { ...m, progres: m.progres + 1 } : m))
  return { harian: ubah(misi.harian), mingguan: ubah(misi.mingguan) }
}

export default function Echomunitas() {
  const [posts, setPosts] = useState(postinganAwal)
  const [misi, setMisi] = useState(misiAwal)
  const [streak, setStreak] = useState(0)
  const [cari, setCari] = useState('')
  const [toast, setToast] = useState('')

  function tampilkan(pesan) {
    setToast(pesan)
    setTimeout(() => setToast(''), 2200)
  }

  function kirimPost({ teks, gambar }) {
    const baru = {
      id: Date.now(),
      nama: pengguna.nama,
      avatar: pengguna.avatar,
      teks,
      gambar,
      suka: 0,
      dibagikan: 0,
      komentar: [],
    }
    setPosts([baru, ...posts])
    setMisi(tambahProgres(misi, ['h2', 'm2']))
    if (streak === 0) setStreak(1)
    tampilkan('Postingan berhasil dibagikan ✓')
  }

  function ubahPost(postBaru, jenis) {
    setPosts(posts.map((p) => (p.id === postBaru.id ? postBaru : p)))
    if (jenis === 'komentar') setMisi(tambahProgres(misi, ['m3']))
  }

  function klaim(id) {
    const tandai = (list) => list.map((m) => (m.id === id ? { ...m, diklaim: true } : m))
    setMisi({ harian: tandai(misi.harian), mingguan: tandai(misi.mingguan) })
    tampilkan('🎉 Voucher Diskon Rp 5.000 masuk ke Voucher saya')
  }

  const kata = cari.trim().toLowerCase()
  const tampil = kata
    ? posts.filter((p) => p.teks.toLowerCase().includes(kata) || p.nama.toLowerCase().includes(kata))
    : posts

  return (
    <div className="em-halaman">
      <Header cari={cari} setCari={setCari} />

      <div className="em-isi">
        <MenuKiri />

        <main className="em-feed">
          <BuatPostingan onKirim={kirimPost} />
          {!kata && <Cerita />}
          {!kata && <TutorBaris />}

          {tampil.map((p) => (
            <Postingan key={p.id} post={p} onUbah={ubahPost} onToast={tampilkan} />
          ))}
          {tampil.length === 0 && <p className="em-kosong">Tidak ada postingan dengan kata "{cari}"</p>}
        </main>

        <Tantangan misi={misi} streak={streak} onKlaim={klaim} />
      </div>

      {toast && <div className="em-toast">{toast}</div>}
    </div>
  )
}
