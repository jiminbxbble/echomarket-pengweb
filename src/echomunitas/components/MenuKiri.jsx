// Menu samping kiri halaman Echomunitas
import Ikon from './Ikon'

const MENU = [
  { label: 'Jelajahi barang', ikon: 'toko', href: '/beranda.html#produk' },
  { label: 'Echomunitas', ikon: 'dunia', href: '/echomunitas.html', aktif: true },
  { label: 'Echojualan', ikon: 'troli', href: '/beranda.html#gabung' },
  { label: 'Daftar sebagai penjual', ikon: 'daftarToko', href: '/daftar.html' },
]

export default function MenuKiri() {
  return (
    <aside className="em-menu">
      <h2>Echomunitas</h2>
      <nav>
        {MENU.map((m) => (
          <a key={m.label} href={m.href} className={m.aktif ? 'aktif' : ''}>
            <Ikon nama={m.ikon} />
            {m.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
