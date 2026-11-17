import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputPassword, TombolSosial, Kembali, Toast, emailValid } from '../components/Bagian'
import { masukkanSesi } from '../sesi'
import { api } from '../../lib/api'
import '../auth.css'

// Komponen untuk halaman Masuk (Login) yang digunakan untuk autentikasi pengguna.
export default function Masuk() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [toast, setToast] = useState('')
  const [memuat, setMemuat] = useState(false)

  function tampilkan(pesan) {
    setToast(pesan)
    setTimeout(() => setToast(''), 2200)
  }
// Fungsi untuk menangani pengiriman form masuk. Validasi email dan password dilakukan di sini.
  async function handleSubmit(e) {
    e.preventDefault()
    const err = {}
    if (!emailValid(email)) err.email = 'Format email belum benar'
    if (password.length < 8) err.password = 'Password minimal 8 karakter'
    setError(err)

    if (Object.keys(err).length === 0) {
      setMemuat(true)
      try {
        const res = await api.post('/auth/login', { email, password })
        masukkanSesi(email, res.accessToken, res.user)
        tampilkan('Berhasil masuk ✓')
        setTimeout(() => navigate('/marketplace'), 700)
      } catch (errApi) {
        tampilkan(errApi.message || 'Gagal masuk, periksa email dan password')
      } finally {
        setMemuat(false)
      }
    }
  }
// Render halaman Masuk dengan form input untuk email dan password, tombol masuk, serta tautan untuk daftar dan lupa password.
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
        {/* Render input password dengan tombol lihat/sembunyikan, dan menampilkan pesan kesalahan jika ada. */}
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

        <button type="submit" className="btn-utama" disabled={memuat}>
          {memuat ? 'Memproses...' : 'Selanjutnya'}
        </button>

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

// belum terhubung ke backend, jadi proses autentikasi tidak benar-benar terjadi. Ini hanya untuk tujuan demonstrasi.