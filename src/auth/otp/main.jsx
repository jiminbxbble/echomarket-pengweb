// Titik awal React untuk halaman Otp
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Otp from './Otp.jsx'
import '../auth.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Otp />
  </StrictMode>
)
