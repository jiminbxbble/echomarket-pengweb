// Komponen Navbar
// Berisi logo EchoMarket di kiri, menu navigasi di tengah,
// dan tombol Masuk & Daftar di kanan.
const MENU = [
  { label: 'Beranda', href: '/beranda.html', aktif: true },
  { label: 'Marketplace', href: '#', aktif: false },
  { label: 'Echomunity', href: '#', aktif: false },
  { label: 'Echojualan', href: '#', aktif: false },
]

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Logo: ikon keranjang (SVG) + nama EchoMarket */}
      <a className="logo" href="/beranda.html">
        <svg className="logo-ikon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
          <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" />
        </svg>
        EchoMarket
      </a>

      {/* Menu navigasi, dibuat dari array MENU menggunakan map() */}
      <nav className="nav-menu">
        {MENU.map((item) => (
          // menu yang aktif diberi class "aktif" supaya ada garis bawahnya
          <a key={item.label} href={item.href} className={item.aktif ? 'aktif' : ''}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Tombol di kanan: Masuk (putih) dan Daftar (hijau) */}
      <div className="nav-tombol">
        <a href="#" className="btn btn-putih">Masuk</a>
        <a href="#" className="btn btn-hijau">Daftar</a>
      </div>
    </header>
  )
}
