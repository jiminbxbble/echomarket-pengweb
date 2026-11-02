
import { useState } from 'react'
import Ikon from './Ikon'
import { pengguna, singkat } from '../data/data'

export default function Postingan({ post, onUbah, onToast }) {
  const [bukaKomentar, setBukaKomentar] = useState(false)
  const [teksKomentar, setTeksKomentar] = useState('')
  const [panjang, setPanjang] = useState(false)

  const jumlahSuka = post.suka + (post.disukai ? 1 : 0)
  const teksPendek = post.teks.length > 110 && !panjang

  function suka() {
    onUbah({ ...post, disukai: !post.disukai })
  }

  function bagikan() {
    onUbah({ ...post, dibagikan: post.dibagikan + 1 })
    try {
      navigator.clipboard?.writeText(window.location.href)
    } catch {}
    onToast('Link postingan disalin')
  }

  function kirimKomentar(e) {
    e.preventDefault()
    if (!teksKomentar.trim()) return
    const baru = { id: Date.now(), nama: pengguna.nama, avatar: pengguna.avatar, teks: teksKomentar.trim(), waktu: 'Baru saja' }
    onUbah({ ...post, komentar: [baru, ...post.komentar] }, 'komentar')
    setTeksKomentar('')
  }

  return (
    <article className="em-kotak em-post">
      <div className="em-penulis">
        <img src={post.avatar} alt="" />
        <span>{post.nama}</span>
      </div>

      <p className="em-post-teks">
        {teksPendek ? post.teks.slice(0, 110) + '.... ' : post.teks + ' '}
        {post.teks.length > 110 && (
          <button className="em-link" onClick={() => setPanjang(!panjang)}>
            {panjang ? 'Lebih sedikit' : 'Lihat Selengkapnya'}
          </button>
        )}
      </p>

      {post.gambar.length === 1 && <img className="em-post-foto" src={post.gambar[0]} alt="" />}
      {post.gambar.length > 1 && (
        <div className="em-post-grid">
          {post.gambar.map((g, i) => <img key={i} src={g} alt="" />)}
        </div>
      )}

      <div className="em-post-angka">
        <span><Ikon nama="suka" ukuran={18} /> {singkat(jumlahSuka)} menyukai</span>
        <span><Ikon nama="komentar" ukuran={18} /> {post.komentar.length} komentar</span>
        <span><Ikon nama="bagikan" ukuran={18} /> {post.dibagikan} dibagikan</span>
      </div>

      <div className="em-post-aksi">
        <button onClick={suka} className={post.disukai ? 'aktif' : ''}>
          <Ikon nama="suka" fill={post.disukai ? 'currentColor' : 'none'} /> Suka
        </button>
        <button onClick={() => setBukaKomentar(!bukaKomentar)}>
          <Ikon nama="komentar" /> Komentari postingan ini
        </button>
        <button onClick={bagikan}>
          <Ikon nama="bagikan" /> Bagikan
        </button>
      </div>

      {bukaKomentar && (
        <div className="em-komentar">
          {post.komentar.length > 0 && <p className="em-urut">Paling Relevan</p>}
          {post.komentar.map((k) => (
            <div key={k.id} className="em-komen">
              <img src={k.avatar} alt="" />
              <div>
                <div className="em-komen-isi">
                  <b>{k.nama}</b>
                  <p>{k.teks}</p>
                </div>
                <small>{k.waktu} · Suka · Balas</small>
              </div>
            </div>
          ))}

          <form className="em-komen-form" onSubmit={kirimKomentar}>
            <img src={pengguna.avatar} alt="" />
            <input
              placeholder="Buat Komentar...."
              value={teksKomentar}
              onChange={(e) => setTeksKomentar(e.target.value)}
            />
            <button className="em-btn-hijau" disabled={!teksKomentar.trim()}>Post</button>
          </form>
        </div>
      )}
    </article>
  )
}
