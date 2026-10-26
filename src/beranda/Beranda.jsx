// Halaman Beranda EchoMarket.
// Halaman dibagi menjadi 3 bagian (komponen), urutannya dari atas ke bawah:
// Navbar -> Hero (banner) -> Kategori
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Kategori from './components/Kategori'

export default function Beranda() {
  return (
    // div pembungkus seluruh halaman, lebarnya dibatasi di CSS (.beranda)
    <div className="beranda">
      <Navbar />
      <Hero />
      <Kategori />
    </div>
  )
}
