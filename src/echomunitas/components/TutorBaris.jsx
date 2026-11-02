// Kotak EchoTutor berisi video tutorial yang bisa digeser ke samping
import Ikon from './Ikon'
import { tutorKomunitas } from '../data/data'

export default function TutorBaris() {
  return (
    <section className="em-kotak em-tutor">
      <h3><Ikon nama="tutor" ukuran={26} /> EchoTutor</h3>
      <div className="em-tutor-baris">
        {tutorKomunitas.map((t) => (
          <a key={t.id} href="#" className="em-tutor-kartu">
            <img src={t.gambar} alt="" />
            <span className="em-tutor-play">▶</span>
            <p>{t.judul}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
