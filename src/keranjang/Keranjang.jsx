import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./keranjang.css";

function Navbar() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <Link to="/" className="baris" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
          <img src="/img/logo-ikon.png" alt="Logo" className="logo" />
          <strong>EchoMarket</strong>
        </Link>

        <div className="search-box">
          <span>🔍 </span>
          <input type="text" placeholder="Pencarian" />
        </div>

        <div className="baris">
          <Link to="/keranjang" style={{ textDecoration: "none", color: "inherit" }}>
            <span>🛍️ </span>
          </Link>
          <span>🔔</span>
          <span>💬</span>
          <span>❤️</span>
          <Link to="/profil" title="Profil Saya" style={{ display: "flex", alignItems: "center" }}>
            <img src="/img/avatar.png" alt="Profil" className="avatar" />
          </Link>
        </div>
      </nav>

      <div className="lokasi">📍 Bojongsoang, Bandung</div>
    </header>
  );
}

function KartuRekomendasi({ nama, harga, rating, terjual, lokasi, gambar }) {
  return (
    <div className="kartu">
      <img src={gambar} alt={nama} />
      <div className="kartu-isi">
        <h4>{nama}</h4>
        <strong>{harga}</strong>
        <p>⭐ {rating} &nbsp; 🛍️ {terjual}</p>
        <p>📍 {lokasi}</p>
      </div>
    </div>
  );
}

function Keranjang() {
  const navigate = useNavigate();
  const [jumlah, setJumlah] = useState(1);
  const [dipilih, setDipilih] = useState(false);
  const [peringatan, setPeringatan] = useState(false);
  const [proteksi, setProteksi] = useState(false);
  const [asuransi, setAsuransi] = useState(false);

  const hargaSatuan = 10000;
  const totalHarga = hargaSatuan * jumlah;
  const ongkir = 6500; // Rp 7.000 sudah dipotong diskon kupon Rp 500
  const totalCheckout = totalHarga + ongkir + (proteksi ? 1000 : 0) + (asuransi ? 500 : 0);

  const handleBeli = () => {
    if (!dipilih) {
      setPeringatan(true);
    } else {
      setPeringatan(false);
      setHalaman("checkout");
    }
  };

  return (
    <div className="halaman-keranjang">
      <Navbar onKeKeranjang={() => setHalaman("keranjang")} />

      {/* 1. HALAMAN KERANJANG */}
      {halaman === "keranjang" && (
        <main className="kontainer-utama">
          <div className="baris" style={{ gap: "30px", marginBottom: "18px" }}>
            <h1 className="judul-halaman" style={{ marginBottom: 0 }}>Keranjang</h1>

            {peringatan && (
              <div className="baris-antara toast-hitam">
                <span>Belum ada baarang yang dipilih</span>
                <button onClick={() => setPeringatan(false)}>Oke</button>
              </div>
            )}
          </div>

          <div className="keranjang-layout">
            
            <div className="keranjang-kiri">
              <div className="kotak-putih baris">
                <input
                  type="checkbox"
                  checked={dipilih}
                  onChange={(e) => {
                    setDipilih(e.target.checked);
                    if (e.target.checked) setPeringatan(false);
                  }}
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
                  <span>🛍️ </span>
                  <strong>Halilintar Store</strong>
                </div>

                <div className="baris">
                  <input
                    type="checkbox"
                    checked={dipilih}
                    onChange={(e) => setDipilih(e.target.checked)}
                  />
                  <img
                    src="/img/tempat_pensil.jpg"
                    alt="Tempat pensil dari kardus"
                    className="produk-img"
                  />

                  <div style={{ flex: 1 }}>
                    <p>Tempat pensil dari kardus</p>
                    <strong>RP {totalHarga.toLocaleString("id-ID")}</strong>
                  </div>

                  <div className="baris">
                    <span>❤️</span>
                    <span>🗑️ </span>
                    <div className="counter">
                      <button onClick={() => jumlah > 1 && setJumlah(jumlah - 1)}>−</button>
                      <span>{jumlah}</span>
                      <button onClick={() => setJumlah(jumlah + 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                <span>›</span>
              </button>

            <button
              className="btn-beli"
              onClick={() => {
                navigate("/pembayaran");
              }}
            >
              Beli
            </button>
          </div>
        </div>

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
                gambar="/img/tempat_pensil.jpg"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Keranjang;
