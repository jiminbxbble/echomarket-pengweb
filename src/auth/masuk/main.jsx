// Titik awal React untuk halaman Masuk
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Masuk from './Masuk.jsx'
import '../auth.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Masuk />
  </StrictMode>
)
