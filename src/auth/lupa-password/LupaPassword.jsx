
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputPassword, Kembali, emailValid } from '../components/Bagian'
import '../auth.css'

function IkonEmail() {
  return (
    <svg viewBox="0 0 120 100" width="110" aria-hidden="true">
      <path d="M10 40 L60 8 L110 40 V92 H10 Z" fill="#f4b400" />
      <rect x="26" y="18" width="68" height="56" rx="4" fill="#f5f5f5" />
      <circle cx="60" cy="44" r="16" fill="#4caf50" />
      <path d="M52 44 l6 6 l11 -12" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 40 L60 72 L110 40 V92 H10 Z" fill="#fbc02d" />
      <path d="M10 92 L52 62 M110 92 L68 62" stroke="#f9a825" strokeWidth="2" />
    </svg>
  )
}

function IkonPerisai() {
  return (
    <svg viewBox="0 0 80 90" width="70" aria-hidden="true">
      <path d="M40 4 L74 16 V44 C74 66 58 80 40 86 C22 80 6 66 6 44 V16 Z" fill="#2e6b4f" />
      <path d="M40 12 L66 21 V44 C66 61 54 72 40 77 C26 72 14 61 14 44 V21 Z" fill="#a5d6c0" />
      <circle cx="40" cy="40" r="7" fill="#1e3a2f" />
      <path d="M36 44 h8 l-2 16 h-4 z" fill="#1e3a2f" />
    </svg>
  )
}

export default function LupaPassword() {
  const [langkah, setLangkah] = useState(1)
  const [popup, setPopup] = useState('') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ulang, setUlang] = useState('')
  const [error, setError] = useState({})

  function kirimEmail(e) {
    e.preventDefault()
    if (!emailValid(email)) {
      setError({ email: 'Format email belum benar' })
      return
    }
    setError({})
    setPopup('email')
  }

  function lanjutKePassword() {
    setPopup('')
    setLangkah(2)
  }

  function kirimPassword(e) {
    e.preventDefault()
    const err = {}
    if (password.length < 8) err.password = 'Password minimal 8 karakter'
    if (ulang !== password) err.ulang = 'Password tidak sama'
    setError(err)
    if (Object.keys(err).length === 0) setPopup('berhasil')
  }

  return (
    <main className="auth-tengah">
      <Kembali />

      {langkah === 1 ? (
        <form className="auth-kartu" onSubmit={kirimEmail} noValidate>
          <h1 className="auth-judul">Lupa Password</h1>
          <p className="auth-sub kutip">
            "Masukkan email Anda, kami akan mengirimkan link untuk reset password."
          </p>

          <div className="field">
            <input
              className={'input' + (error.email ? ' salah' : '')}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email ? (
              <p className="pesan-salah">{error.email}</p>
            ) : (
              <p className="petunjuk">Contoh: email@Echomarket.com</p>
            )}
          </div>

          <button type="submit" className="btn-utama">Reset Password</button>

          <p className="link-tengah ingat">
            Ingat password? <Link to="/masuk">Masuk di sini</Link>
          </p>
        </form>
      ) : (
        <form className="auth-kartu" onSubmit={kirimPassword} noValidate>
          <h1 className="auth-judul">Masukkan Password</h1>
          <p className="auth-sub kutip">"Masukkan password baru anda untuk reset password."</p>

          <div className="field">
            <InputPassword value={password} onChange={setPassword} placeholder="Password baru" salah={error.password} />
            <p className={error.password ? 'pesan-salah' : 'petunjuk'}>{error.password || 'Masukkan Password'}</p>
          </div>

          <div className="field">
            <InputPassword value={ulang} onChange={setUlang} placeholder="Ulangi password" salah={error.ulang} />
            <p className={error.ulang ? 'pesan-salah' : 'petunjuk'}>{error.ulang || 'Masukkan Ulang Password'}</p>
          </div>

          <button type="submit" className="btn-utama">Reset Password</button>

          <p className="link-tengah ingat">
            Ingat password? <Link to="/masuk">Masuk di sini</Link>
          </p>
        </form>
      )}

      {popup === 'email' && (
        <div className="popup-latar">
          <div className="popup" role="dialog" aria-label="Periksa email">
            <IkonEmail />
            <h2>
              Silakan periksa <span>Email</span> Anda untuk <span>link</span> reset password
            </h2>
            <p>
              Klik link yang kami kirimkan ke <b>{email}</b> untuk mengatur ulang password Anda. Jika tidak
              menemukan email, periksa folder spam/sampah.
            </p>
            <button className="btn-utama" onClick={lanjutKePassword}>Selanjutnya</button>
          </div>
        </div>
      )}

      {popup === 'berhasil' && (
        <div className="popup-latar">
          <div className="popup" role="dialog" aria-label="Password berhasil di reset">
            <IkonPerisai />
            <h2>Password Berhasil di Reset</h2>
            <p>Silahkan Masuk Kembali</p>
            <Link to="/masuk" className="btn-utama popup-btn">Masuk</Link>
          </div>
        </div>
      )}
    </main>
  )
}
