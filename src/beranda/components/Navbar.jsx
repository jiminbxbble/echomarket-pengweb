import { Link } from 'react-router-dom'

const MENU = [
  { label: 'Beranda', href: '/', aktif: true },
  { label: 'Marketplace', href: '#produk', aktif: false },
  { label: 'Keranjang', href: '/keranjang', aktif: false },
  { label: 'Echomunity', href: '/echomunitas', aktif: false },
  { label: 'Echojualan', href: '#gabung', aktif: false },
]

export default function Navbar() {
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
        <Link to="/masuk" className="btn btn-putih">Masuk</Link>
        <Link to="/daftar" className="btn btn-hijau">Daftar</Link>
      </div>
    </header>
  )
}
