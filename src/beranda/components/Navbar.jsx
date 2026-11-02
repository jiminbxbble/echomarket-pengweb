// Komponen Navbar
// Berisi logo EchoMarket di kiri, menu navigasi di tengah,
// dan tombol Masuk & Daftar di kanan.
const MENU = [
  { label: 'Beranda', href: '/beranda.html', aktif: true },
  { label: 'Marketplace', href: '#produk', aktif: false },
  { label: 'Echomunity', href: '/echomunitas.html', aktif: false },
  { label: 'Echojualan', href: '#gabung', aktif: false },
]

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Logo: gambar logo dari Figma + nama EchoMarket */}
      <a className="logo" href="/beranda.html">
        <img className="logo-ikon" src="/img/logo-ikon.png" alt="" />
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
        <a href="/masuk.html" className="btn btn-putih">Masuk</a>
        <a href="/daftar.html" className="btn btn-hijau">Daftar</a>
      </div>
    </header>
  )
}
