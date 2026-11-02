// Header halaman Echomunitas: logo, kolom pencarian, ikon menu, dan lokasi
import Ikon from './Ikon'
import { pengguna } from '../data/data'

export default function Header({ cari, setCari }) {
  return (
    <header className="em-header">
      <a href="/beranda.html" className="em-logo">
        <img src="/img/logo-ikon.png" alt="" />
        EchoMarket
      </a>

      <label className="em-cari">
        <Ikon nama="cari" />
        <input
          placeholder="Pencarian"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
        />
      </label>

      <div className="em-kanan">
        <div className="em-ikon">
          <a href="#" aria-label="Keranjang"><Ikon nama="keranjang" /></a>
          <a href="#" aria-label="Notifikasi" className="kuning"><Ikon nama="lonceng" /></a>
          <a href="#" aria-label="Pesan" className="hijau"><Ikon nama="chat" /></a>
          <a href="#" aria-label="Favorit" className="merah"><Ikon nama="hati" /></a>
          <a href="/index.html" aria-label="Profil saya"><img src={pengguna.avatar} alt="" className="em-avatar" /></a>
        </div>
        <p className="em-lokasi"><Ikon nama="lokasi" ukuran={16} /> Bojongsoang, Bandung</p>
      </div>
    </header>
  )
}
