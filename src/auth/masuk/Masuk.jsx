import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputPassword, TombolSosial, Kembali, Toast, emailValid } from '../components/Bagian'
import '../auth.css'

export default function Masuk() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [toast, setToast] = useState('')

  function tampilkan(pesan) {
    setToast(pesan)
    setTimeout(() => setToast(''), 2200)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const err = {}
    if (!emailValid(email)) err.email = 'Format email belum benar'
    if (password.length < 8) err.password = 'Password minimal 8 karakter'
    setError(err)

    if (Object.keys(err).length === 0) {
      tampilkan('Berhasil masuk ✓')
      setTimeout(() => navigate('/'), 900)
    }
  }

  return (
    <main className="auth-tengah">
      <Kembali />

      <form className="auth-kartu" onSubmit={handleSubmit} noValidate>
        <h1 className="auth-judul">Masuk sekarang</h1>
        <p className="auth-sub">
          Belum punya akun Echomarket? <Link to="/daftar">Daftar</Link>
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

        <div className="field">
          <InputPassword
            value={password}
            onChange={setPassword}
            placeholder="Password"
            salah={error.password}
          />
          {error.password ? (
            <p className="pesan-salah">{error.password}</p>
          ) : (
            <p className="petunjuk">Masukkan Password Kamu</p>
          )}
        </div>

        <button type="submit" className="btn-utama">Selanjutnya</button>

        <Link to="/lupa-password" className="link-tengah">
          Lupa password?
        </Link>

        <div className="atau">atau</div>
        <TombolSosial onKlik={(nama) => tampilkan(`Masuk dengan ${nama} belum tersedia`)} />
      </form>

      <Toast pesan={toast} />
    </main>
  )
}
