// Titik awal React untuk halaman Daftar
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Daftar from './Daftar.jsx'
import '../auth.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Daftar />
  </StrictMode>
)
