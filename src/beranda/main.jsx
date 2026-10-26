// Titik awal React untuk halaman Beranda.
// File ini dipanggil dari beranda.html, lalu menampilkan komponen Beranda.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Beranda from './Beranda.jsx'
import './beranda.css' // semua styling halaman beranda

// Ambil <div id="root"> di beranda.html sebagai tempat menampilkan halaman
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Beranda />
  </StrictMode>
)
