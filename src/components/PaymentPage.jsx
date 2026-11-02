import { useState } from "react";
import "./PaymentPage.css";

// data sementara, nanti diganti dari halaman Keranjang & Alamat
const ADDRESS = {
  label: "Rumah",
  nama: "Petrus",
  telepon: "081234567890",
  alamat: "Jl. Contoh No. 12, Sukapura, Dayeuhkolot, Kab. Bandung, Jawa Barat 40267",
};

const ITEMS = [
  { id: 1, nama: "Tumbler Stainless 500ml", harga: 85000, jumlah: 1 },
  { id: 2, nama: "Tote Bag Kanvas", harga: 45000, jumlah: 2 },
];

const METHODS = [
  { id: "transfer", nama: "Transfer Bank", info: "BCA, BNI, Mandiri" },
  { id: "ewallet", nama: "E-Wallet", info: "GoPay, OVO, DANA" },
  { id: "cod", nama: "Bayar di Tempat (COD)", info: "Bayar saat barang sampai" },
];

const ONGKIR = 15000;
const BIAYA_ADMIN = 2000;
const VOUCHER = { kode: "ECHO10", persen: 10 };

const rupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

function OrderItem({ item }) {
  return (
    <li className="pay-item">
      <div>
        <p className="pay-item-name">{item.nama}</p>
        <p className="pay-muted">
          {item.jumlah} x {rupiah(item.harga)}
        </p>
      </div>
      <p>{rupiah(item.harga * item.jumlah)}</p>
    </li>
  );
}

function MethodOption({ method, checked, onChange }) {
  return (
    <label className={`pay-method${checked ? " is-selected" : ""}`}>
      <input
        type="radio"
        name="metode"
        value={method.id}
        checked={checked}
        onChange={() => onChange(method.id)}
      />
      <span>
        <span className="pay-method-name">{method.nama}</span>
        <span className="pay-muted">{method.info}</span>
      </span>
    </label>
  );
}

export default function PaymentPage({ onPay }) {
  const [method, setMethod] = useState("");
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherOk, setVoucherOk] = useState(false);
  const [voucherMsg, setVoucherMsg] = useState("");
  const [error, setError] = useState("");
  const [orderCode, setOrderCode] = useState("");

  const subtotal = ITEMS.reduce((sum, item) => sum + item.harga * item.jumlah, 0);
  const diskon = voucherOk ? (subtotal * VOUCHER.persen) / 100 : 0;
  const total = subtotal - diskon + ONGKIR + BIAYA_ADMIN;
  const paid = orderCode !== "";

  const applyVoucher = () => {
    if (voucherInput.trim().toUpperCase() === VOUCHER.kode) {
      setVoucherOk(true);
      setVoucherMsg(`Voucher berhasil dipakai, diskon ${VOUCHER.persen}%`);
    } else {
      setVoucherOk(false);
      setVoucherMsg("Kode voucher tidak valid");
    }
  };

  const handlePay = () => {
    if (!method) {
      setError("Pilih metode pembayaran dulu ya");
      return;
    }
    setError("");
    const payload = { method, total };
    onPay ? onPay(payload) : console.log("Pembayaran:", payload);
    setOrderCode("EM-" + Date.now().toString().slice(-6));
  };

  const selectedMethod = METHODS.find((m) => m.id === method);

  return (
    <div className="pay-page">
      <header className="pay-header">
        <a className="pay-brand" href="/">
          <span className="pay-logo" aria-hidden="true">♻</span>
          EchoMarket
        </a>
        <div className="pay-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input type="search" placeholder="Pencarian" aria-label="Pencarian" />
        </div>
        <nav className="pay-icons" aria-label="Menu akun">
          <button type="button" aria-label="Keranjang">🛒</button>
          <button type="button" aria-label="Notifikasi">🔔</button>
          <button type="button" aria-label="Pesan">💬</button>
          <button type="button" aria-label="Favorit">♡</button>
          <span className="pay-avatar" aria-label="Profil">MK</span>
        </nav>
      </header>

      <main className="pay-main">
        <h1>Pembayaran</h1>

        <div className="pay-layout">
          <div className="pay-col">
            <section className="pay-card" aria-labelledby="judul-alamat">
              <div className="pay-card-head">
                <h2 id="judul-alamat">Alamat Pengiriman</h2>
                <a href="/" className="pay-link">Ubah</a>
              </div>
              <p className="pay-strong">
                {ADDRESS.nama} <span className="pay-tag">{ADDRESS.label}</span>
              </p>
              <p className="pay-muted">{ADDRESS.telepon}</p>
              <p>{ADDRESS.alamat}</p>
            </section>

            <fieldset className="pay-card pay-fieldset">
              <legend>Metode Pembayaran</legend>
              {METHODS.map((m) => (
                <MethodOption
                  key={m.id}
                  method={m}
                  checked={method === m.id}
                  onChange={setMethod}
                />
              ))}
            </fieldset>
          </div>

          <div className="pay-col">
            <section className="pay-card" aria-labelledby="judul-pesanan">
              <h2 id="judul-pesanan">Ringkasan Pesanan</h2>
              <ul className="pay-list">
                {ITEMS.map((item) => (
                  <OrderItem key={item.id} item={item} />
                ))}
              </ul>

              <div className="pay-voucher">
                <label htmlFor="voucher">Kode Voucher</label>
                <div className="pay-voucher-row">
                  <input
                    id="voucher"
                    type="text"
                    placeholder="Contoh: ECHO10"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyVoucher()}
                  />
                  <button type="button" className="pay-btn-outline" onClick={applyVoucher}>
                    Pakai
                  </button>
                </div>
                {voucherMsg && (
                  <small className={voucherOk ? "pay-ok" : "pay-err"} role="status">
                    {voucherMsg}
                  </small>
                )}
              </div>

              <dl className="pay-rows">
                <div><dt>Subtotal</dt><dd>{rupiah(subtotal)}</dd></div>
                {diskon > 0 && (
                  <div className="pay-ok"><dt>Diskon voucher</dt><dd>- {rupiah(diskon)}</dd></div>
                )}
                <div><dt>Ongkos kirim</dt><dd>{rupiah(ONGKIR)}</dd></div>
                <div><dt>Biaya admin</dt><dd>{rupiah(BIAYA_ADMIN)}</dd></div>
                <div className="pay-total"><dt>Total Bayar</dt><dd>{rupiah(total)}</dd></div>
              </dl>

              {error && <p className="pay-error" role="alert">{error}</p>}

              {paid ? (
                <p className="pay-success" role="status">
                  Pembayaran berhasil. Pesanan <strong>{orderCode}</strong> via{" "}
                  {selectedMethod.nama} sebesar {rupiah(total)} sudah kami terima.
                </p>
              ) : (
                <button type="button" className="pay-btn-primary" onClick={handlePay}>
                  Bayar Sekarang
                </button>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
