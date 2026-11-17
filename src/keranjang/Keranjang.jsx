import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { ambilToken } from "../auth/sesi";
import "./keranjang.css";

// Komponen 1: Navbar
function Navbar({ onKeKeranjang }) {
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
          <Link to="/keranjang" onClick={onKeKeranjang} style={{ textDecoration: "none", color: "inherit" }}>
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
  const navigate = useNavigate();
  const [halaman, setHalaman] = useState("keranjang"); // 'keranjang' | 'checkout' | 'qris'
  const [items, setItems] = useState([
    {
      id: 0,
      productId: 1,
      jumlah: 1,
      product: {
        id: 1,
        nama: "Tempat pensil dari kardus",
        harga: 10000,
        gambar: "/img/tempat_pensil.jpg",
      },
    },
  ]);
  const [dipilih, setDipilih] = useState(true);
  const [peringatan, setPeringatan] = useState(false);
  const [proteksi, setProteksi] = useState(false);
  const [asuransi, setAsuransi] = useState(false);
  const [alamatUtama, setAlamatUtama] = useState(null);
  const [orderDibuat, setOrderDibuat] = useState(null);
  const [memproses, setMemproses] = useState(false);

  useEffect(() => {
    if (!ambilToken()) return;
    let aktif = true;
    Promise.all([
      api.get("/cart").catch(() => null),
      api.get("/addresses").catch(() => null),
    ]).then(([cartRes, addrRes]) => {
      if (!aktif) return;
      if (cartRes?.items?.length > 0) {
        setItems(cartRes.items);
      }
      if (Array.isArray(addrRes) && addrRes.length > 0) {
        setAlamatUtama(addrRes.find((a) => a.utama) || addrRes[0]);
      }
    });
    return () => { aktif = false; };
  }, []);

  const itemUtama = items[0];
  const jumlah = itemUtama?.jumlah ?? 1;
  const totalHarga = items.reduce(
    (sum, it) => sum + (it.product?.harga ?? 10000) * it.jumlah,
    0,
  );
  const ongkir = 6500;
  const totalCheckout = totalHarga + ongkir + (proteksi ? 1000 : 0) + (asuransi ? 500 : 0);

  async function ubahJumlah(item, delta) {
    const baru = Math.max(1, item.jumlah + delta);
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, jumlah: baru } : it)),
    );
    if (ambilToken() && item.id > 0) {
      try {
        await api.patch(`/cart/${item.id}`, { jumlah: baru });
      } catch {
        /* biarkan state lokal jika gagal */
      }
    }
  }

  async function hapusItem(item) {
    setItems((prev) => prev.filter((it) => it.id !== item.id));
    if (ambilToken() && item.id > 0) {
      try {
        await api.delete(`/cart/${item.id}`);
      } catch {}
    }
  }

  const handleBeli = () => {
    if (!dipilih || items.length === 0) {
      setPeringatan(true);
    } else {
      setPeringatan(false);
      setHalaman("checkout");
    }
  };

  const handleBayarQris = async () => {
    if (!ambilToken()) {
      setHalaman("qris");
      return;
    }
    setMemproses(true);
    try {
      const alamatTeks = alamatUtama
        ? `${alamatUtama.penerima} (${alamatUtama.telepon}) - ${alamatUtama.detail}, ${alamatUtama.kota}, ${alamatUtama.provinsi}`
        : "Bojongsoang No 1, Bandung, Jawa Barat, 40257";
      const order = await api.post("/orders", {
        metodeBayar: "QRIS",
        alamatKirim: alamatTeks,
        ongkir: ongkir + (proteksi ? 1000 : 0) + (asuransi ? 500 : 0),
        items: items.map((it) => ({
          productId: it.productId || it.product?.id || 1,
          jumlah: it.jumlah,
        })),
      });
      await api.patch(`/orders/${order.id}/status`, { status: "DIBAYAR" }).catch(() => {});
      setOrderDibuat(order);
      setHalaman("qris");
    } catch (err) {
      alert(err.message || "Gagal membuat pesanan");
    } finally {
      setMemproses(false);
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
                <span>Belum ada barang yang dipilih</span>
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

                {items.length === 0 ? (
                  <p style={{ color: "#666", padding: "12px 0" }}>Keranjang belanja masih kosong.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="baris" style={{ marginBottom: 10 }}>
                      <input
                        type="checkbox"
                        checked={dipilih}
                        onChange={(e) => setDipilih(e.target.checked)}
                      />
                      <img
                        src={item.product?.gambar || "/img/tempat_pensil.jpg"}
                        alt={item.product?.nama || "Produk"}
                        className="produk-img"
                      />

                      <div style={{ flex: 1 }}>
                        <p>{item.product?.nama || "Produk EchoMarket"}</p>
                        <strong>RP {((item.product?.harga ?? 10000) * item.jumlah).toLocaleString("id-ID")}</strong>
                      </div>

                      <div className="baris">
                        <span>❤️</span>
                        <button
                          type="button"
                          onClick={() => hapusItem(item)}
                          style={{ background: "none", border: 0, cursor: "pointer", fontSize: 16 }}
                          title="Hapus"
                        >
                          🗑️
                        </button>
                        <div className="counter">
                          <button onClick={() => ubahJumlah(item, -1)}>−</button>
                          <span>{item.jumlah}</span>
                          <button onClick={() => ubahJumlah(item, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                  gambar="/img/tempat_pensil.jpg"
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
                  <img src={itemUtama?.product?.gambar || "/img/tempat_pensil.jpg"} alt="Produk" className="produk-img" style={{ width: 80, height: 80 }} />
                  <div style={{ flex: 1 }}>
                    <h4>{itemUtama?.product?.nama || "Tempat pensil dari kardus"}{items.length > 1 ? ` (+${items.length - 1} lainnya)` : ""}</h4>
                    <strong>Rp {totalHarga.toLocaleString("id-ID")}</strong>
                    <div className="baris" style={{ marginTop: "6px" }}>
                      <input type="checkbox" checked={proteksi} onChange={(e) => setProteksi(e.target.checked)} />
                      <span>🛡️ Proteksi kerusakan barang (1000)</span>
                    </div>
                  </div>

                  <div className="counter">
                    <button onClick={() => itemUtama && ubahJumlah(itemUtama, -1)}>−</button>
                    <span>{jumlah}</span>
                    <button onClick={() => itemUtama && ubahJumlah(itemUtama, 1)}>+</button>
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
                {/* Metode pembayaran lain (BCA, Mandiri, GoPay, COD) ada di halaman Pembayaran */}
                <button
                  type="button"
                  onClick={() => navigate("/pembayaran")}
                  style={{ color: "#4caf50", fontSize: "12px", background: "none", border: 0, padding: 0, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Lihat semua
                </button>
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

              <button className="btn-beli" onClick={handleBayarQris} disabled={memproses}>
                {memproses ? "Memproses..." : "Bayar sekarang"}
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
                  <strong>Order #{orderDibuat ? `EM-${orderDibuat.id}` : "EM240905001"}</strong>
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
