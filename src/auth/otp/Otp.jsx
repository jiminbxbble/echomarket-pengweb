
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Kembali, Toast, ambil } from '../components/Bagian'
import '../auth.css'

const PANJANG = 4

export default function Otp() {
  const navigate = useNavigate()
  const [kode, setKode] = useState(Array(PANJANG).fill(''))
  const [detik, setDetik] = useState(30)
  const [toast, setToast] = useState('')
  const kotakRef = useRef([])
  const email = ambil('email-daftar')

  useEffect(() => {
    if (detik === 0) return
    const t = setTimeout(() => setDetik(detik - 1), 1000)
    return () => clearTimeout(t)
  }, [detik])

  function tampilkan(pesan) {
    setToast(pesan)
    setTimeout(() => setToast(''), 2200)
  }

  function ubahKotak(i, nilai) {
    const angka = nilai.replace(/\D/g, '').slice(-1)
    const baru = [...kode]
    baru[i] = angka
    setKode(baru)
    if (angka && i < PANJANG - 1) kotakRef.current[i + 1].focus()
  }

  function tombolKotak(i, e) {
    if (e.key === 'Backspace' && !kode[i] && i > 0) kotakRef.current[i - 1].focus()
  }

  function tempel(e) {
    const angka = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, PANJANG)
    if (!angka) return
    e.preventDefault()
    setKode(angka.padEnd(PANJANG, '').split('').slice(0, PANJANG))
    kotakRef.current[Math.min(angka.length, PANJANG) - 1].focus()
  }

  function kirimUlang() {
    setDetik(30)
    setKode(Array(PANJANG).fill(''))
    tampilkan('Kode OTP baru sudah dikirim')
  }

  function verifikasi(e) {
    e.preventDefault()
    if (kode.join('').length < PANJANG) {
      tampilkan('Lengkapi 4 digit kode OTP')
      return
    }
    tampilkan('Verifikasi berhasil, akun kamu sudah aktif ✓')
    setTimeout(() => navigate('/'), 1000)
  }

  const mm = '00'
  const ss = String(detik).padStart(2, '0')

  return (
    <main className="auth-tengah">
      <Kembali />

      <form className="auth-kartu" onSubmit={verifikasi}>
        <h1 className="auth-judul">Masukkan kode OTP</h1>
        <p className="auth-sub" style={{ marginTop: 14 }}>
          Kode OTP telah dikirim ke email {email ? <b>{email}</b> : 'kamu'}.
          <br />
          Silakan masukkan untuk verifikasi.
        </p>

        <div className="otp-kotak" onPaste={tempel}>
          {kode.map((isi, i) => (
            <input
              key={i}
              ref={(el) => (kotakRef.current[i] = el)}
              value={isi}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => ubahKotak(i, e.target.value)}
              onKeyDown={(e) => tombolKotak(i, e)}
            />
          ))}
        </div>

        <p className="kirim-ulang">
          Belum dapat kode?{' '}
          {detik > 0 ? (
            <>Kirim ulang dalam <span style={{ color: 'var(--hijau)' }}>{mm}:{ss}</span></>
          ) : (
            <button type="button" onClick={kirimUlang}>Kirim ulang</button>
          )}
        </p>

        <button type="submit" className="btn-utama" style={{ marginTop: 46, fontWeight: 500 }}>
          Verifikasi OTP
        </button>
      </form>

      <Toast pesan={toast} />
    </main>
  )
}
