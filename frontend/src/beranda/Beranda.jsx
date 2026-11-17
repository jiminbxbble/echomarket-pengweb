
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Kategori from './components/Kategori'
import GabungEcho from './components/GabungEcho'
import ProdukTrending from './components/ProdukTrending'
import EchoTutor from './components/EchoTutor'
import Footer from './components/Footer'
import './beranda.css'

export default function Beranda() {
  return (
    
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
