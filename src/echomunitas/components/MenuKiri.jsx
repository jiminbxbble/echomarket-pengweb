import { Link } from 'react-router-dom'
import Ikon from './Ikon'

const MENU = [
  { label: 'Jelajahi barang', ikon: 'toko', href: '/#produk' },
  { label: 'Echomunitas', ikon: 'dunia', href: '/echomunitas', aktif: true },
  { label: 'Echojualan', ikon: 'troli', href: '/#gabung' },
  { label: 'Daftar sebagai penjual', ikon: 'daftarToko', href: '/daftar' },
]

export default function MenuKiri() {
  return (
    <aside className="em-menu">
      <h2>Echomunitas</h2>
      <nav>
        {MENU.map((m) => (
          m.href.includes('#') ? (
            <a key={m.label} href={m.href} className={m.aktif ? 'aktif' : ''}>
              <Ikon nama={m.ikon} />
              {m.label}
            </a>
          ) : (
            <Link key={m.label} to={m.href} className={m.aktif ? 'aktif' : ''}>
              <Ikon nama={m.ikon} />
              {m.label}
            </Link>
          )
        ))}
      </nav>
    </aside>
  )
}
