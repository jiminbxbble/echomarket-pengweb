
import { cerita, pengguna } from '../data/data'

export default function Cerita() {
  return (
    <section className="em-cerita">
      <button className="em-cerita-kartu em-cerita-saya">
        <img src="/img/cerita-saya.webp" alt="" />
        <span className="em-cerita-plus">+</span>
        <b>Buat Cerita</b>
      </button>

      {cerita.map((c) => (
        <a key={c.id} href="#" className="em-cerita-kartu">
          <img src={c.foto} alt={`Cerita ${c.nama}`} />
          <img src={c.avatar} alt="" className="em-cerita-avatar" />
          <b className="em-cerita-nama">{c.nama}</b>
        </a>
      ))}
      <span className="sr-only">{pengguna.nama}</span>
    </section>
  )
}
