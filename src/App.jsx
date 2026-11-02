import { Routes, Route, Navigate } from 'react-router-dom'
import Beranda from './beranda/Beranda'
import Profil from './profil/App'
import Keranjang from './keranjang/Keranjang'
import Echomunitas from './echomunitas/Echomunitas'
import Masuk from './auth/masuk/Masuk'
import Daftar from './auth/daftar/Daftar'
import Otp from './auth/otp/Otp'
import LupaPassword from './auth/lupa-password/LupaPassword'
import BuyPage from './produk/BuyPage'
import PaymentPage from './pembayaran/PaymentPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/beranda" element={<Navigate to="/" replace />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/keranjang" element={<Keranjang />} />
      <Route path="/echomunitas" element={<Echomunitas />} />
      <Route path="/masuk" element={<Masuk />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/lupa-password" element={<LupaPassword />} />
      <Route path="/produk" element={<BuyPage />} />
      <Route path="/pembayaran" element={<PaymentPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
