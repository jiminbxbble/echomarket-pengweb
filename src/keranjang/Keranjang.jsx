import { useState } from "react";
import "./keranjang.css";

// Komponen 1: Navbar
function Navbar({ onKeKeranjang }) {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <a href="/beranda.html" className="baris" style={{ textDecoration: "none", color: "inherit" }}>
          <img src="/logo.png" alt="Logo" className="logo" />
          <strong>EchoMarket</strong>
        </a>

        <div className="search-box">
          <span>🔍 </span>
          <input type="text" placeholder="Pencarian" />
        </div>

        <div className="baris">
          <span onClick={onKeKeranjang} style={{ cursor: "pointer" }}>🛍️ </span>
          <span>🔔</span>
          <span>💬</span>
          <span>❤️</span>
          <a href="/">
            <img src="/avatar.png" alt="Profil" className="avatar" />
          </a>
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
        <p>⭐ {rating} &nbsp; 🛍️ {terjual}</p>
        <p>📍 {lokasi}</p>
      </div>
    </div>
  );
}

// Komponen Utama: Halaman Keranjang, Checkout, & Pembayaran
function Keranjang() {
  const [halaman, setHalaman] = useState("keranjang"); // 'keranjang' | 'checkout' | 'qris'
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
            {/* Bagian Kiri: Daftar Item Keranjang */}
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
                    src="/tempat_pensil.jpg"
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
                <span>›</span>
              </button>

              <button className="btn-beli" onClick={handleBeli}>Beli</button>
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
      )}

      {/* 2. HALAMAN CHECKOUT */}
      {halaman === "checkout" && (
        <main className="kontainer-utama">
          <h1 className="judul-halaman">Checkout</h1>

          <div className="keranjang-layout">
            <div className="keranjang-kiri">
              {/* Kotak Alamat */}
              <div className="kotak-putih">
                <div className="baris-antara">
                  <strong>Alamat pengiriman</strong>
                  <span style={{ color: "#4caf50", textDecoration: "underline" }}>Ubah</span>
                </div>
                <p style={{ margin: "8px 0" }}>📍 <strong>Kost Fauzein</strong></p>
                <p style={{ color: "#444", marginBottom: "8px" }}>
                  Bojongsoang No 1, RT 12/ RW 01, Citeureup, Bandung, Jawa Barat, 40257
                </p>
                <p><strong>Fauzein</strong> | <strong>+62 888888888</strong></p>
              </div>

              {/* Kotak Produk & Pengiriman */}
              <div className="kotak-putih">
                <p style={{ marginBottom: "12px" }}>🛍️ <strong>Halilintar Store</strong></p>

                <div className="baris">
                  <img src="/tempat_pensil.jpg" alt="Produk" className="produk-img" style={{ width: 80, height: 80 }} />
                  <div style={{ flex: 1 }}>
                    <h4>Tempat pensil dari kardus</h4>
                    <strong>Rp {totalHarga.toLocaleString("id-ID")}</strong>
                    <div className="baris" style={{ marginTop: "6px" }}>
                      <input type="checkbox" checked={proteksi} onChange={(e) => setProteksi(e.target.checked)} />
                      <span>🛡️ Proteksi kerusakan barang (1000)</span>
                    </div>
                  </div>

                  <div className="counter">
                    <button onClick={() => jumlah > 1 && setJumlah(jumlah - 1)}>−</button>
                    <span>{jumlah}</span>
                    <button onClick={() => setJumlah(jumlah + 1)}>+</button>
                  </div>
                </div>

                <div className="box-ongkir">
                  <p><strong>Reguler (Rp 6500 <del style={{ color: "#888" }}>7000</del>)</strong></p>
                  <p style={{ marginBottom: "8px" }}>Estimasi tiba 9 - 12 Agustus</p>
                  <div className="baris-antara">
                    <span>🛡️ <u>Asuransi Pengiriman</u> (Rp 500)</span>
                    <input type="checkbox" checked={asuransi} onChange={(e) => setAsuransi(e.target.checked)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Kotak Kanan: Metode Pembayaran */}
            <div className="kotak-putih total-box">
              <div className="baris-antara">
                <strong>Metode pembayaran</strong>
                <span style={{ color: "#4caf50", fontSize: "12px" }}>Lihat semua</span>
              </div>

              <div className="baris-antara">
                <span><strong>[QRIS]</strong> Qris</span>
                <input type="checkbox" checked readOnly />
              </div>
              <div className="baris-antara" style={{ opacity: 0.5 }}>
                <span>[BRIVA] BRI Virtual Account</span>
                <input type="checkbox" disabled />
              </div>
              <div className="baris-antara" style={{ opacity: 0.5 }}>
                <span>[BCA] BCA Virtual Account</span>
                <input type="checkbox" disabled />
              </div>
              <div className="baris-antara" style={{ opacity: 0.5 }}>
                <span>[MEGA] Bank Mega</span>
                <input type="checkbox" disabled />
              </div>

              <div className="btn-promo">
                <span>🎟️ 1 Kupon promo dipakai (Diskon Rp 500)</span>
                <span>›</span>
              </div>

              <h4>Cek ringkasan transaksimu, yuk</h4>
              <div className="baris-antara">
                <span>Total transaksi</span>
                <strong>Rp {totalCheckout.toLocaleString("id-ID")}</strong>
              </div>

              <button className="btn-beli" onClick={() => setHalaman("qris")}>
                Bayar sekarang
              </button>
            </div>
          </div>
        </main>
      )}

      {/* 3. HALAMAN PEMBAYARAN QRIS */}
      {halaman === "qris" && (
        <main className="kontainer-utama">
          <div className="keranjang-layout" style={{ marginTop: "20px" }}>
            <div className="keranjang-kiri">
              <div className="kotak-putih" style={{ textAlign: "center" }}>
                <div className="baris-antara">
                  <strong>Order #EM240905001</strong>
                  <span className="badge-hijau">Pembayaran Berhasil</span>
                </div>

                <h1 style={{ color: "#2c8c7c", fontSize: "34px", margin: "24px 0 4px" }}>
                  Rp {totalCheckout.toLocaleString("id-ID")}
                </h1>
                <p style={{ color: "#777", marginBottom: "20px" }}>Total Pembayaran</p>

                <div className="baris-antara" style={{ justifyContent: "space-around" }}>
                  <div>
                    <p style={{ color: "#777" }}>Metode Pembayaran</p>
                    <strong>QRIS</strong>
                  </div>
                  <div>
                    <p style={{ color: "#777" }}>Toko</p>
                    <strong>Fauzein Store</strong>
                  </div>
                </div>
              </div>

              <div className="kotak-hijau">
                <h3 style={{ marginBottom: "10px" }}>Keuntungan Pembayaran Digital</h3>
                <ol style={{ paddingLeft: "18px", lineHeight: "1.8" }}>
                  <li>Transaksi cepat dan mudah</li>
                  <li>Keamanan tingkat tinggi</li>
                  <li>Tanpa perlu uang tunai</li>
                  <li>Cashback dan promo menarik</li>
                </ol>
              </div>
            </div>

            <div className="kotak-putih total-box" style={{ alignItems: "center", textAlign: "center" }}>
              <h3>Scan Kode QR Berikut</h3>
              <p style={{ color: "#777" }}>Gunakan Aplikasi E-Wallet / Mbanking</p>
              <strong style={{ fontSize: "20px", letterSpacing: "2px" }}>QRIS</strong>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=EchoMarket-QRIS"
                alt="QR Code"
                style={{ width: 180, height: 180, margin: "8px 0" }}
              />
              <strong style={{ color: "#4caf50", fontSize: "18px" }}>10:00</strong>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default Keranjang;
