// Komponen KartuKategori
// Menampilkan satu kartu berisi foto dan label nama kategori.
// Data nama dan gambar dikirim dari komponen Kategori lewat props.

export default function KartuKategori({ nama, gambar }) {
  return (
    <a href="#" className="kartu">
      <img src={gambar} alt={nama} />
      {/* label putih di bagian bawah kartu */}
      <span className="kartu-label">{nama}</span>
    </a>
  )
}
