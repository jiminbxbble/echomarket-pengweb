// Halaman Marketplace (Store page) – halaman utama setelah pengguna masuk.
// Frame "Store akun login page" di Figma.
// Data kategori, flash sale, dan rekomendasi diambil dengan fetch() dari public/data/marketplace.json
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../echomunitas/components/Header'
import Ikon from '../echomunitas/components/Ikon'
import { ambilSesi, keluarSesi } from '../auth/sesi'
import { api } from '../lib/api'
import '../echomunitas/echomunitas.css' // gaya header dipakai bersama
import './marketplace.css'

// Mengubah 10000 menjadi "Rp 10.000"
const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

// Hitung mundur flash sale (detik -> "02 : 40 : 55")
function formatWaktu(total) {
  const j = String(Math.floor(total / 3600)).padStart(2, '0')
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
  const d = String(total % 60).padStart(2, '0')
  return `${j} : ${m} : ${d}`
}

export default function Marketplace() {
  const navigate = useNavigate()
  const sesi = ambilSesi()

  const [data, setData] = useState(null) // { kategori, flashSale, rekomendasi }
  const [status, setStatus] = useState('memuat') // 'memuat' | 'berhasil' | 'gagal'
  const [cari, setCari] = useState('')
  const [kategoriAktif, setKategoriAktif] = useState('')
  const [sisa, setSisa] = useState(2 * 3600 + 40 * 60 + 55)
  const [botBuka, setBotBuka] = useState(false)
  const [botInput, setBotInput] = useState('')
  const [botLoading, setBotLoading] = useState(false)
  const [botPesan, setBotPesan] = useState([
    {
      role: 'assistant',
      content: 'Hai! Aku Echobot. Mau cari barang daur ulang apa hari ini?',
    },
  ])

  // Ambil data dari Backend REST API (fallback ke /data/marketplace.json jika server belum jalan)
  async function muatData() {
    setStatus('memuat')
    try {
      const [kategori, flashRes, produkRes] = await Promise.all([
        api.get('/categories'),
        api.get('/products?flashSale=true&perHalaman=4'),
        api.get('/products?perHalaman=24'),
      ])
      setData({
        kategori,
        flashSale: flashRes.data || [],
        rekomendasi: (produkRes.data || []).map((p) => ({
          ...p,
          kategori: p.kategoriId || p.kategori?.id || '',
        })),
      })
      setStatus('berhasil')
    } catch {
      try {
        const res = await fetch('/data/marketplace.json')
        if (!res.ok) throw new Error('Gagal mengambil data')
        const json = await res.json()
        setData(json)
        setStatus('berhasil')
      } catch (err) {
        console.error(err)
        setStatus('gagal')
      }
    }
  }

  async function kirimBot(e) {
    e.preventDefault()
    const teks = botInput.trim()
    if (!teks || botLoading) return

    const riwayatBaru = [...botPesan, { role: 'user', content: teks }]
    setBotPesan(riwayatBaru)
    setBotInput('')
    setBotLoading(true)

    try {
      const res = await api.post('/ai/chat', {
        message: teks,
        history: botPesan.slice(-6),
      })
      setBotPesan([...riwayatBaru, { role: 'assistant', content: res.reply }])
    } catch {
      setBotPesan([
        ...riwayatBaru,
        {
          role: 'assistant',
          content: 'Maaf, EchoBot sedang tidak dapat terhubung ke server.',
        },
      ])
    } finally {
      setBotLoading(false)
    }
  }

  useEffect(() => {
    muatData()
  }, [])

  // Timer flash sale berkurang 1 detik
  useEffect(() => {
    if (sisa <= 0) return
    const t = setTimeout(() => setSisa(sisa - 1), 1000)
    return () => clearTimeout(t)
  }, [sisa])

  function keluar() {
    keluarSesi()
    navigate('/')
  }

  // Filter rekomendasi berdasarkan kata pencarian & kategori yang dipilih
  const kata = cari.trim().toLowerCase()
  const produk = (data?.rekomendasi || []).filter(
    (p) => (!kata || p.nama.toLowerCase().includes(kata)) && (!kategoriAktif || p.kategori === kategoriAktif)
  )

  return (
    <div className="mp-halaman">
      <Header cari={cari} setCari={setCari} />

      <main className="mp-isi">
        {/* ===== Banner ===== */}
        <section className="mp-banner">
          <div>
            <h1>Belanja Sekarang, Bumi Ikut Senang!</h1>
            <p>Pilih barang daur ulang berkualitas, belanja cerdas sambil jaga lingkungan.</p>
            <a href="#rekomendasi" className="mp-banner-btn">Cek Sekarang</a>
            <span className="mp-banner-titik" aria-hidden="true">♻ ♻ ♻</span>
          </div>
          <img src="/img/banner-anak.webp" alt="Anak-anak memilah sampah daur ulang" />
        </section>

        {sesi && (
          <p className="mp-sapa">
            Halo, <b>{sesi.email}</b> 👋 Selamat berbelanja.{' '}
            <button onClick={keluar} className="mp-link">Keluar</button>
          </p>
        )}

        {/* ===== Fitur & Kategori ===== */}
        <div className="mp-baris">
          <section className="mp-fitur">
            <h2>Fitur Echomarket</h2>
            <Link to="/echomunitas" className="mp-fitur-kartu lebar">
              <Ikon nama="dunia" ukuran={28} />
              Echomunitas
            </Link>
            <div className="mp-fitur-dua">
              <Link to="/#gabung" className="mp-fitur-kartu">
                <Ikon nama="troli" ukuran={28} />
                Echojualan
              </Link>
              <Link to="/daftar" className="mp-fitur-kartu">
                <Ikon nama="daftarToko" ukuran={28} />
                Daftar penjual
              </Link>
            </div>
          </section>

          <section className="mp-kategori">
            <div className="mp-judul-baris">
              <h2>Kategori</h2>
              {kategoriAktif && (
                <button className="mp-link" onClick={() => setKategoriAktif('')}>Lihat semua</button>
              )}
            </div>

            {status === 'memuat' && <div className="mp-kerangka" aria-label="Memuat kategori" />}
            {status === 'berhasil' && (
              <div className="mp-kategori-grid">
                {data.kategori.map((k) => (
                  <button
                    key={k.id}
                    className={'mp-kat' + (kategoriAktif === k.id ? ' aktif' : '')}
                    onClick={() => {
                      setKategoriAktif(kategoriAktif === k.id ? '' : k.id)
                      document.getElementById('rekomendasi')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <img src={k.ikon} alt="" />
                    {k.nama}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ===== Flash Sale ===== */}
        <section className="mp-flash">
          <h2>⚡ FLASH SALE</h2>
          <div className="mp-timer" aria-live="polite">{formatWaktu(sisa)}</div>

          {status === 'berhasil' && (
            <div className="mp-flash-grid">
              {data.flashSale.map((p) => (
                <Link key={p.id} to={`/produk?id=${p.id}`} className="mp-flash-kartu">
                  <img src={p.gambar} alt={p.nama} />
                  <div>
                    <p className="mp-nama">{p.nama}</p>
                    <p className="mp-harga-besar">{rupiah(p.harga)}</p>
                    {p.hargaAwal && <p className="mp-coret">{rupiah(p.hargaAwal)}</p>}
                    <div className="mp-bar"><span style={{ width: Math.min(Number(p.terjual) || 0, 100) + '%' }} /></div>
                    <small>{p.terjual} terjual</small>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ===== Rekomendasi ===== */}
        <section className="mp-rekom" id="rekomendasi">
          <h2>
            Rekomendasi Untukmu
            {kategoriAktif && data && (
              <span className="mp-filter"> · {data.kategori.find((k) => k.id === kategoriAktif)?.nama}</span>
            )}
          </h2>

          {/* Loading state */}
          {status === 'memuat' && (
            <div className="mp-produk-grid">
              {Array.from({ length: 5 }).map((_, i) => <div key={i} className="mp-kerangka kartu" />)}
              <p className="mp-info">Memuat produk...</p>
            </div>
          )}

          {/* Error state */}
          {status === 'gagal' && (
            <div className="mp-error" role="alert">
              <p>Gagal memuat produk. Periksa koneksi kamu.</p>
              <button onClick={muatData} className="mp-btn">Coba lagi</button>
            </div>
          )}

          {status === 'berhasil' && produk.length === 0 && (
            <p className="mp-info">Produk tidak ditemukan. Coba kata kunci atau kategori lain.</p>
          )}

          {status === 'berhasil' && (
            <div className="mp-produk-grid">
              {produk.map((p) => (
                <Link key={p.id} to={`/produk?id=${p.id}`} className="mp-produk">
                  <img src={p.gambar} alt={p.nama} />
                  <div className="mp-produk-info">
                    <p className="mp-nama">{p.nama}</p>
                    <p className="mp-harga">
                      {rupiah(p.harga)}
                      {p.hargaAwal && <s>{rupiah(p.hargaAwal)}</s>}
                    </p>
                    <p className="mp-meta"><span className="mp-bintang">★</span> {p.rating} · {p.terjual} terjual</p>
                    <p className="mp-meta"><Ikon nama="lokasi" ukuran={13} /> {p.lokasi}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ===== Echobot (chatbot AI) ===== */}
      {botBuka && (
        <div className="mp-bot-chat" role="dialog" aria-label="Echobot" style={{ width: 320, maxWidth: '90vw' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <b>Echobot AI</b>
            <button className="mp-link" onClick={() => setBotBuka(false)}>Tutup</button>
          </div>
          <div style={{ maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
            {botPesan.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? '#2e7d32' : '#f1f5f2',
                  color: m.role === 'user' ? '#fff' : '#222',
                  padding: '8px 10px',
                  borderRadius: 10,
                  fontSize: 13,
                  whiteSpace: 'pre-wrap',
                  maxWidth: '88%',
                }}
              >
                {m.content}
              </div>
            ))}
            {botLoading && <p style={{ fontSize: 12, color: '#666', margin: 0 }}>Echobot sedang mengetik...</p>}
          </div>
          <form onSubmit={kirimBot} style={{ display: 'flex', gap: 6 }}>
            <input
              type="text"
              value={botInput}
              onChange={(e) => setBotInput(e.target.value)}
              placeholder="Tanya produk daur ulang..."
              style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #ccc', fontSize: 13 }}
            />
            <button type="submit" className="mp-btn" disabled={botLoading}>Kirim</button>
          </form>
        </div>
      )}
      <button className="mp-bot" onClick={() => setBotBuka(!botBuka)} aria-label="Buka Echobot">
        <img src="/img/echobot.png" alt="" />
      </button>
    </div>
  )
}
