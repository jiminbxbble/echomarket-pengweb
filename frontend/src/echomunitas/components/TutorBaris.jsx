import { useEffect, useState } from 'react'
import Ikon from './Ikon'
import { tutorKomunitas } from '../data/data'
import { api } from '../../lib/api'

export default function TutorBaris() {
  const [tutors, setTutors] = useState(tutorKomunitas)

  useEffect(() => {
    let aktif = true
    api.get('/community/tutorials')
      .then((data) => {
        if (aktif && Array.isArray(data) && data.length > 0) {
          setTutors(data)
        }
      })
      .catch(() => {
        /* fallback ke tutorKomunitas jika server offline */
      })
    return () => { aktif = false }
  }, [])

  return (
    <section className="em-kotak em-tutor">
      <h3><Ikon nama="tutor" ukuran={26} /> EchoTutor</h3>
      <div className="em-tutor-baris">
        {tutors.map((t) => (
          <a key={t.id} href="#" className="em-tutor-kartu" onClick={(e) => e.preventDefault()}>
            <img src={t.gambar || '/img/tutor.webp'} alt={t.judul} />
            <span className="em-tutor-play">▶</span>
            <p>{t.judul}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
