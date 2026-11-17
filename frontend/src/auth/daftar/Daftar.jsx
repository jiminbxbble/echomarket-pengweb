
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputPassword, TombolSosial, Kembali, Toast, emailValid, simpan } from '../components/Bagian'
import { masukkanSesi } from '../sesi'
import { api } from '../../lib/api'
import '../auth.css'


// Komponen untuk halaman Daftar (Register) yang digunakan untuk membuat akun pengguna baru.
export default function Daftar() {
  const navigate = useNavigate()
  const [langkah, setLangkah] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [konfirmasi, setKonfirmasi] = useState('')
  const [error, setError] = useState({})
  const [toast, setToast] = useState('')

  // Fungsi untuk menampilkan pesan toast sementara kepada pengguna.
  function tampilkan(pesan) {
    setToast(pesan)
    setTimeout(() => setToast(''), 2200)
  }
// Fungsi untuk menangani pengiriman form email. Validasi format email dilakukan di sini.
  function kirimEmail(e) {
    e.preventDefault()
    if (!emailValid(email)) {
      setError({ email: 'Isi Email anda terlebih dahulu!' })
      return
    }
    setError({})
    setLangkah(2)
  }
// Fungsi untuk menangani pengiriman form password. Validasi panjang password dan kesamaan password dilakukan di sini.
  async function kirimPassword(e) {
    e.preventDefault()
    const err = {}
    if (password.length < 8) err.password = 'Password minimal 8 karakter'
    if (konfirmasi !== password) err.konfirmasi = 'Konfirmasi password tidak sama'
    setError(err)
    if (Object.keys(err).length === 0) {
      try {
        const nama = email.split('@')[0] || 'Pengguna'
        const res = await api.post('/auth/register', { nama, email, password })
        masukkanSesi(email, res.accessToken, res.user)
        simpan('email-daftar', email)
        navigate('/otp')
      } catch (errApi) {
        tampilkan(errApi.message || 'Gagal mendaftar')
      }
    }
  }
// Render halaman Daftar dengan form input untuk email, password baru, dan konfirmasi password, serta menampilkan pesan toast sesuai dengan langkah yang sedang dilakukan.
  return (
    <main className="auth-dua">
      <Kembali />

      <div className="auth-kiri">
        {langkah === 1 ? (
          <img className="logo-besar" src="/img/logo.png" alt="Logo EchoMarket" />
        ) : (
          <img src="/img/ilustrasi-daftar.webp" alt="Anak-anak memilah sampah daur ulang" />
        )}
      </div>

      <div className="auth-kanan">
        {langkah === 1 ? (
          <form className="auth-kartu" onSubmit={kirimEmail} noValidate>
            <h1 className="auth-judul">Daftar sekarang</h1>
            <p className="auth-sub">
              Sudah punya akun Echomarket? <Link to="/masuk">Masuk</Link>
            </p>

            <TombolSosial onKlik={(nama) => tampilkan(`Daftar dengan ${nama} belum tersedia`)} />
            <div className="atau">atau</div>

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
            {/* Tombol daftar, mengirim form email. */}
            <button type="submit" className="btn-utama">Daftar</button>

            <p className="syarat">
              Dengan mendaftar, anda menyetujui
              <br />
              <a href="#">Syarat dan Ketentuan</a> serta <a href="#">Kebijakan dan Privasi Echomarket</a>
            </p>
          </form>
        ) : (
          <form className="auth-kartu" onSubmit={kirimPassword} noValidate>
            <h1 className="auth-judul">Buat password kamu</h1>
            <p className="auth-sub">
              Mendaftar sebagai <b>{email}</b>{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setLangkah(1) }}>Ubah</a>
            </p>

            <div className="field">
              <InputPassword value={password} onChange={setPassword} placeholder="Masukkan Password" salah={error.password} />
              <p className={error.password ? 'pesan-salah' : 'petunjuk'}>{error.password || 'Password'}</p>
            </div>

            <div className="field">
              <InputPassword value={konfirmasi} onChange={setKonfirmasi} placeholder="Masukkan Password" salah={error.konfirmasi} />
              <p className={error.konfirmasi ? 'pesan-salah' : 'petunjuk'}>{error.konfirmasi || 'Konfirmasi Password'}</p>
            </div>

            <button type="submit" className="btn-utama">Daftar</button>
          </form>
        )}
      </div>

      <Toast pesan={toast} />
    </main>
  )
}

// belum terhubung ke backend, jadi tombol google/facebook dan proses autentikasi tidak benar-benar terjadi. Ini hanya untuk tujuan demonstrasi.