// Titik awal React untuk halaman Lupa Password
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LupaPassword from './LupaPassword.jsx'
import '../auth/auth.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LupaPassword />
  </StrictMode>
)
