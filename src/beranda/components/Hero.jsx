// Komponen Hero
// Banner besar di bagian atas halaman, berisi judul, subjudul,
// dan tombol "Jelajahi Barang".
// Foto latar belakang tidak ditulis di sini, tapi di beranda.css (.hero)

export default function Hero() {
  return (
    <section className="hero">
      {/* Kotak transparan tempat teks hero */}
      <div className="hero-kotak">
        <h1 className="hero-judul">
          Ubah Barang Tak Terpakai
          <br />
          Jadi Keuntungan
        </h1>
        <p className="hero-sub">Daur ulang. Jual Kembali. Dukung bumi.</p>

        {/* href="#kategori" membuat halaman turun ke section dengan id="kategori" */}
        <a href="#kategori" className="btn btn-hijau hero-btn">
          Jelajahi Barang <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
