// Halaman Daftar (Register) – frame "Signup page" lalu "Daftar" di Figma
// Langkah 1: isi email. Langkah 2: buat password. Setelah itu pindah ke halaman OTP.
import { useState } from 'react'
import { InputPassword, TombolSosial, Kembali, Toast, emailValid, simpan } from '../components/Bagian'

export default function Daftar() {
  const [langkah, setLangkah] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [konfirmasi, setKonfirmasi] = useState('')
  const [error, setError] = useState({})
  const [toast, setToast] = useState('')

  function tampilkan(pesan) {
    setToast(pesan)
    setTimeout(() => setToast(''), 2200)
  }

  // Langkah 1 -> cek email
  function kirimEmail(e) {
    e.preventDefault()
    if (!emailValid(email)) {
      setError({ email: 'Isi Email anda terlebih dahulu!' })
      return
    }
    setError({})
    setLangkah(2)
  }

  // Langkah 2 -> cek password, lalu ke halaman OTP
  function kirimPassword(e) {
    e.preventDefault()
    const err = {}
    if (password.length < 8) err.password = 'Password minimal 8 karakter'
    if (konfirmasi !== password) err.konfirmasi = 'Konfirmasi password tidak sama'
    setError(err)
    if (Object.keys(err).length === 0) {
      simpan('email-daftar', email) // ditampilkan di halaman OTP
      window.location.href = '/otp.html'
    }
  }

  return (
    <main className="auth-dua">
      <Kembali />

      {/* Kiri: logo (langkah 1) atau ilustrasi (langkah 2) */}
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
              Sudah punya akun Echomarket? <a href="/masuk.html">Masuk</a>
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
