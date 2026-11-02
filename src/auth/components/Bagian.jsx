import { useState } from 'react'
import { Link } from 'react-router-dom'

function IkonMata({ tutup }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" fill="#000" />
      {tutup && <line x1="3" y1="3" x2="21" y2="21" />}
    </svg>
  )
}

export function InputPassword({ value, onChange, placeholder, salah }) {
  const [lihat, setLihat] = useState(false)
  return (
    <div className="input-wadah">
      <input
        className={'input' + (salah ? ' salah' : '')}
        type={lihat ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="btn-mata"
        onClick={() => setLihat(!lihat)}
        aria-label={lihat ? 'Sembunyikan password' : 'Lihat password'}
      >
        <IkonMata tutup={lihat} />
      </button>
    </div>
  )
}

export function TombolSosial({ onKlik }) {
  return (
    <>
      <button type="button" className="btn-sosial" onClick={() => onKlik('Google')}>
        <svg viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-4z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41 35.3 44 30 44 24c0-1.3-.1-2.7-.4-4z" />
        </svg>
        Google
      </button>
      <button type="button" className="btn-sosial" onClick={() => onKlik('Facebook')}>
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path fill="#fff" d="M15.1 15.5l.5-3.5h-3.3V9.8c0-1 .5-1.9 2-1.9h1.5V5c0 0-1.4-.2-2.7-.2-2.8 0-4.6 1.7-4.6 4.7V12h-3v3.5h3V24h3.8v-8.5h2.8z" />
        </svg>
        Facebook
      </button>
    </>
  )
}

export function Kembali() {
  return (
    <Link to="/" className="kembali">
      <img src="/img/logo-ikon.png" alt="" />
      EchoMarket
    </Link>
  )
}

export function Toast({ pesan }) {
  return pesan ? <div className="toast">{pesan}</div> : null
}

export function emailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function simpan(kunci, nilai) {
  try {
    sessionStorage.setItem(kunci, nilai)
  } catch {}
}

export function ambil(kunci) {
  try {
    return sessionStorage.getItem(kunci) || ''
  } catch {
    return ''
  }
}
