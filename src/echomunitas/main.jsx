// Titik awal React untuk halaman Echomunitas
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Echomunitas from './Echomunitas.jsx'
import './echomunitas.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Echomunitas />
  </StrictMode>
)
