// Halaman Masuk (Login) – frame "Login page" di Figma
import { useState } from 'react'
import { InputPassword, TombolSosial, Kembali, Toast, emailValid } from '../auth/components/Bagian'

export default function Masuk() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [toast, setToast] = useState('')

  function tampilkan(pesan) {
    setToast(pesan)
    setTimeout(() => setToast(''), 2200)
  }

  // Dipanggil saat form dikirim
  function handleSubmit(e) {
    e.preventDefault()
    const err = {}
    if (!emailValid(email)) err.email = 'Format email belum benar'
    if (password.length < 8) err.password = 'Password minimal 8 karakter'
    setError(err)

    // Kalau tidak ada error, anggap berhasil masuk (belum ada backend)
    if (Object.keys(err).length === 0) {
      tampilkan('Berhasil masuk ✓')
      setTimeout(() => (window.location.href = '/beranda.html'), 900)
    }
  }

  return (
    <main className="auth-tengah">
      <Kembali />

      <form className="auth-kartu" onSubmit={handleSubmit} noValidate>
        <h1 className="auth-judul">Masuk sekarang</h1>
        <p className="auth-sub">
          Belum punya akun Echomarket? <a href="/daftar.html">Daftar</a>
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

        <a href="/lupa-password.html" className="link-tengah">
          Lupa password?
        </a>

        <div className="atau">atau</div>
        <TombolSosial onKlik={(nama) => tampilkan(`Masuk dengan ${nama} belum tersedia`)} />
      </form>

      <Toast pesan={toast} />
    </main>
  )
}
