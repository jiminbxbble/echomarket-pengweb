import { useState } from "react";
import "./keranjang.css";

// Komponen 1: Navbar
function Navbar() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="baris">
          <img src="/logo.png" alt="Logo" className="logo" />
          <strong>EchoMarket</strong>
        </div>

        <div className="search-box">
          <span>🔍</span>
          <input type="text" placeholder="Pencarian" />
        </div>

        <div className="baris">
          <span>🛍️</span>
          <span>🔔</span>
          <span>💬</span>
          <span>❤️</span>
          <img src="/avatar.png" alt="Profil" className="avatar" />
        </div>
      </nav>

      <div className="lokasi">📍 Bojongsoang, Bandung</div>
    </header>
  );
}

// Komponen 2: Kartu Rekomendasi 
function KartuRekomendasi({ nama, harga, rating, terjual, lokasi, gambar }) {
  return (
    <div className="kartu">
      <img src={gambar} alt={nama} />
      <div className="kartu-isi">
        <h4>{nama}</h4>
        <strong>{harga}</strong>
        <p>⭐ {rating} &nbsp; 🛒 {terjual}</p>
        <p>📍 {lokasi}</p>
      </div>
    </div>
  );
}

// Komponen Utama: Halaman Keranjang
function Keranjang() {
  const [jumlah, setJumlah] = useState(1);
  const [dipilih, setDipilih] = useState(false);

  const hargaSatuan = 10000;
  const totalHarga = hargaSatuan * jumlah;

  return (
    <div className="halaman-keranjang">
      <Navbar />

      <main className="kontainer-utama">
        <h1 className="judul-halaman">Keranjang</h1>

        <div className="keranjang-layout">
          {/* Bagian Kiri: Daftar Item Keranjang */}
          <div className="keranjang-kiri">
            <div className="kotak-putih baris">
              <input
                type="checkbox"
                checked={dipilih}
                onChange={(e) => setDipilih(e.target.checked)}
              />
              <strong>Pilih Semua</strong>
            </div>

            <div className="kotak-putih">
              <div className="baris" style={{ marginBottom: "14px" }}>
                <input
                  type="checkbox"
                  checked={dipilih}
                  onChange={(e) => setDipilih(e.target.checked)}
                />
                <span>🛍️</span>
                <strong>Halilintar Store</strong>
              </div>

              <div className="baris">
                <input
                  type="checkbox"
                  checked={dipilih}
                  onChange={(e) => setDipilih(e.target.checked)}
                />
                <img
                  src="/tempat_pensil.jpg"
                  alt="Tempat pensil dari kardus"
                  className="produk-img"
                />

                <div style={{ flex: 1 }}>
                  <p>Tempat pensil dari kardus</p>
                  <strong>RP 10.000</strong>
                </div>

                <div className="baris">
                  <span>❤️</span>
                  <span>🗑️</span>
                  <div className="counter">
                    <button onClick={() => jumlah > 1 && setJumlah(jumlah - 1)}>−</button>
                    <span>{jumlah}</span>
                    <button onClick={() => setJumlah(jumlah + 1)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Ringkasan Total Belanja */}
          <div className="kotak-putih total-box">
            <h4>Total Belanja Kamu</h4>

            <p>
              Total:{" "}
              <strong>
                {dipilih ? `Rp ${totalHarga.toLocaleString("id-ID")}` : "—"}
              </strong>
            </p>

            <button className="btn-promo">
              <span>🏷️ Pakai promo lebih hemat</span>
              <span>❯</span>
            </button>

            <button className="btn-beli">Beli</button>
          </div>
        </div>

        {/* Bagian Bawah: Rekomendasi Produk */}
        <section>
          <h3>Rekomendasi untuk kamu</h3>

          <div className="grid-rekomendasi">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <KartuRekomendasi
                key={id}
                nama="Tempat pensil..."
                harga="Rp 10.000"
                rating="4.9"
                terjual="10rb+ terjual"
                lokasi="Bandung"
                gambar="/tempat_pensil.jpg"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Keranjang;
