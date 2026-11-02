
import { useRef } from 'react'
import KartuKategori from './KartuKategori'
import kategori from '../data/kategori'

export default function Kategori() {
  
  const barisRef = useRef(null)

  function geserKanan() {
    barisRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    
    <section className="kategori" id="kategori">
      <h2 className="kategori-judul">
        Temukan Barang Sesuai
        <br />
        Kebutuhanmu
      </h2>

      <div className="kartu-wadah">
        
        <div className="kartu-baris" ref={barisRef}>
          {kategori.map((item) => (
            <KartuKategori key={item.id} nama={item.nama} gambar={item.gambar} />
          ))}
        </div>

        <button className="btn-panah" onClick={geserKanan} aria-label="Geser ke kanan">
          ›
        </button>
      </div>
    </section>
  )
}
