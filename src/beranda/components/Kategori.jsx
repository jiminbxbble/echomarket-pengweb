// Komponen Kategori
// Menampilkan judul "Temukan Barang Sesuai Kebutuhanmu",
// deretan kartu kategori, dan tombol panah untuk menggeser kartu.
import { useRef } from 'react'
import KartuKategori from './KartuKategori'
import kategori from '../data/kategori'

export default function Kategori() {
  // useRef dipakai untuk mengakses elemen div baris kartu secara langsung
  const barisRef = useRef(null)

  // Dipanggil saat tombol panah diklik, menggeser kartu ke kanan 300px
  function geserKanan() {
    barisRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    // id="kategori" dipakai sebagai tujuan tombol "Jelajahi Barang" di Hero
    <section className="kategori" id="kategori">
      <h2 className="kategori-judul">
        Temukan Barang Sesuai
        <br />
        Kebutuhanmu
      </h2>

      <div className="kartu-wadah">
        {/* Setiap data kategori diubah menjadi satu KartuKategori */}
        <div className="kartu-baris" ref={barisRef}>
          {kategori.map((item) => (
            <KartuKategori key={item.id} nama={item.nama} gambar={item.gambar} />
          ))}
        </div>

        {/* Tombol panah di sebelah kanan kartu */}
        <button className="btn-panah" onClick={geserKanan} aria-label="Geser ke kanan">
          ›
        </button>
      </div>
    </section>
  )
}
