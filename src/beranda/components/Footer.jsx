import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link className="footer-logo" to="/">
            <span><img src="/img/logo-ikon.png" alt="" /></span>
            EchoMarket
          </Link>
          <p>Bergabung &amp; Jelajahi Dunia EchoMarket untuk masa depan yang lebih hijau dan berkelanjutan</p>

          <div className="footer-stat">
            <div><strong>10K+</strong><small>Pengguna aktif</small></div>
            <div><strong>5K+</strong><small>Produk Terjual</small></div>
            <div><strong>100+</strong><small>Tutorial Interaktif</small></div>
          </div>

          <h4>Selamatkan Bumi !!</h4>
          <p>Ubah barang bekasmu menjadi berharga untuk selamatkan bumi</p>
          <Link to="/daftar" className="fitur-btn footer-btn">Gabung Sekarang</Link>

          <div className="lencana">
            <span>♻ Zero Waste</span>
            <span>🍃 Echo Certified</span>
          </div>
        </div>

        <div>
          <h4>Navigasi</h4>
          <Link to="/">Beranda</Link>
          <Link to="/echomunitas">Echomunitas</Link>
          <a href="#gabung">EchoJualan</a>
          <a href="#">Tentang kami</a>

          <h4 className="jarak">Temui Kami di Sosial Media</h4>
          <a href="#">@EchoMarket_Telu (Instagram)</a>
          <a href="#">@EchoMarket_Telu (TikTok)</a>
          <a href="#">+62 888-1934-839</a>
        </div>

        <div>
          <h4>Kategori Produk</h4>
          <a href="#kategori">Kardus Bekas</a>
          <a href="#kategori">Craft &amp; Handmade</a>
          <a href="#kategori">Fashion Daur Ulang</a>
          <a href="#kategori">Aksesoris Daur Ulang</a>

          <h4 className="jarak">Download Echomarket Mobile</h4>
          <div className="toko-app">
            <a href="#">▶ Google Play</a>
            <a href="#"> App Store</a>
          </div>
        </div>
      </div>

      <hr />
      <p className="hak-cipta">© 2025 EcoMarket. Semua hak dilindungi. Bersama membangun Indonesia yang lebih hijau.</p>
      <div className="footer-link">
        <a href="#">Kebijakan Privasi</a>
        <a href="#">Syarat &amp; Ketentuan</a>
        <a href="#">Hubungi Kami</a>
        <a href="#">FAQ</a>
      </div>
    </footer>
  )
}
