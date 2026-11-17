import { Link } from 'react-router-dom'
import Ikon from './Ikon'
import { pengguna } from '../data/data'

export default function Header({ cari, setCari }) {
  return (
    <header className="em-header">
      <Link to="/" className="em-logo">
        <img src="/img/logo-ikon.png" alt="" />
        EchoMarket
      </Link>

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
          <Link to="/keranjang" aria-label="Keranjang"><Ikon nama="keranjang" /></Link>
          <a href="#" aria-label="Notifikasi" className="kuning"><Ikon nama="lonceng" /></a>
          <a href="#" aria-label="Pesan" className="hijau"><Ikon nama="chat" /></a>
          <a href="#" aria-label="Favorit" className="merah"><Ikon nama="hati" /></a>
          <Link to="/profil" aria-label="Profil saya"><img src={pengguna.avatar} alt="" className="em-avatar" /></Link>
        </div>
        <p className="em-lokasi"><Ikon nama="lokasi" ukuran={16} /> Bojongsoang, Bandung</p>
      </div>
    </header>
  )
}
