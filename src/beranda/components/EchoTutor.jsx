// Komponen EchoTutor
// Grid kartu video tutorial daur ulang (2 baris x 3 kartu)
import { tutorial } from '../data/produk'

export default function EchoTutor() {
  return (
    <section className="tutor">
      <h2 className="judul-bagian">EchoTutor</h2>

      <div className="tutor-grid">
        {tutorial.map((t) => (
          <a key={t.id} href="/echomunitas.html" className="tutor-kartu">
            <div className="tutor-foto">
              <img src={t.gambar} alt="" />
              <span className="tutor-play" aria-hidden="true">▶</span>
            </div>
            <span className="tutor-kategori">{t.kategori}</span>
            <p className="tutor-judul">{t.judul}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
