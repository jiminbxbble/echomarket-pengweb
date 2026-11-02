// Komponen GabungEcho
// Bagian gelap berisi 2 kartu fitur (EchoJualan & Echomunitas),
// judul "Gabung & Jelajahi Dunia EchoMarket", dan angka statistik.

const STATISTIK = [
  { angka: '10K+', label: 'Pengguna Aktif' },
  { angka: '5K+', label: 'Produk Terjual' },
  { angka: '100+', label: 'Tutorial Interaktif' },
]

export default function GabungEcho() {
  return (
    <section className="gabung" id="gabung">
      <div className="fitur-grid">
        {/* Kartu hijau: EchoJualan */}
        <div className="fitur fitur-hijau">
          <span className="fitur-ikon">
            {/* ikon keranjang + */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" />
              <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" /><path d="M13 9v4M11 11h4" />
            </svg>
          </span>
          <h3>EchoJualan</h3>
          <p>Ubah limbah jadi penghasilan.</p>
          <a href="/daftar.html" className="fitur-btn">Gabung Sekarang</a>
        </div>

        {/* Kartu biru: Echomunitas */}
        <div className="fitur fitur-biru">
          <span className="fitur-ikon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
          </span>
          <h3>Echomunitas</h3>
          <p>Interaksi seru, peluang tanpa batas.</p>
          <a href="/echomunitas.html" className="fitur-btn">Gabung Sekarang</a>
        </div>
      </div>

      <h2 className="gabung-judul">Gabung &amp; Jelajahi Dunia EchoMarket</h2>
      <p className="gabung-sub">
        Bergabunglah dengan ribuan pengguna yang telah memilih gaya hidup berkelanjutan untuk masa depan
        yang lebih hijau.
      </p>

      <div className="statistik">
        {STATISTIK.map((s) => (
          <div key={s.label}>
            <strong>{s.angka}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
