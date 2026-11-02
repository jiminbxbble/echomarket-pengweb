// Halaman Beranda EchoMarket.
// Halaman dibagi menjadi beberapa bagian (komponen), urutannya dari atas ke bawah:
// Navbar -> Hero (banner) -> Kategori -> Gabung (EchoJualan & Echomunitas)
// -> Produk trending -> EchoTutor -> Footer
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Kategori from './components/Kategori'
import GabungEcho from './components/GabungEcho'
import ProdukTrending from './components/ProdukTrending'
import EchoTutor from './components/EchoTutor'
import Footer from './components/Footer'

export default function Beranda() {
  return (
    // div pembungkus seluruh halaman, lebarnya dibatasi di CSS (.beranda)
    <div className="beranda">
      <Navbar />
      <Hero />
      <Kategori />
      <GabungEcho />
      <ProdukTrending />
      <EchoTutor />
      <Footer />
    </div>
  )
}
