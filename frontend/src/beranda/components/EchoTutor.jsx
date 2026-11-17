import { Link } from 'react-router-dom'
import { tutorial } from '../data/produk'

export default function EchoTutor() {
  return (
    <section className="tutor">
      <h2 className="judul-bagian">EchoTutor</h2>

      <div className="tutor-grid">
        {tutorial.map((t) => (
          <Link key={t.id} to="/echomunitas" className="tutor-kartu">
            <div className="tutor-foto">
              <img src={t.gambar} alt="" />
              <span className="tutor-play" aria-hidden="true">▶</span>
            </div>
            <span className="tutor-kategori">{t.kategori}</span>
            <p className="tutor-judul">{t.judul}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
