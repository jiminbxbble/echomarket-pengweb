import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ambilSesi, keluarSesi } from '../../auth/sesi'

const MENU = [
  { label: 'Beranda', href: '/', aktif: true },
  { label: 'Marketplace', href: '/marketplace', aktif: false },
  { label: 'Keranjang', href: '/keranjang', aktif: false },
  { label: 'Echomunity', href: '/echomunitas', aktif: false },
  { label: 'Echojualan', href: '#gabung', aktif: false },
]

export default function Navbar() {
  // Kalau sudah masuk, tombol Masuk/Daftar diganti avatar + Keluar
  const [sesi, setSesi] = useState(ambilSesi())

  function keluar() {
    keluarSesi()
    setSesi(null)
  }

  return (
    <header className="navbar">
      
      <Link className="logo" to="/">
        <img className="logo-ikon" src="/img/logo-ikon.png" alt="" />
        EchoMarket
      </Link>

      <nav className="nav-menu">
        {MENU.map((item) => (
          item.href.startsWith('#') ? (
            <a key={item.label} href={item.href} className={item.aktif ? 'aktif' : ''}>
              {item.label}
            </a>
          ) : (
            <Link key={item.label} to={item.href} className={item.aktif ? 'aktif' : ''}>
              {item.label}
            </Link>
          )
        ))}
      </nav>

      <div className="nav-tombol">
        {sesi ? (
          <>
            <Link to="/profil" className="nav-avatar" title={sesi.email}>
              <img src="/img/avatar-saya.webp" alt="Profil saya" />
            </Link>
            <button type="button" className="btn btn-putih" onClick={keluar}>Keluar</button>
          </>
        ) : (
          <>
            <Link to="/masuk" className="btn btn-putih">Masuk</Link>
            <Link to="/daftar" className="btn btn-hijau">Daftar</Link>
          </>
        )}
      </div>
    </header>
  )
}
