import { useCallback, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProfileForm from './components/ProfileForm'
import AddressPage from './components/AddressPage'

const INITIAL_PROFILE = {
  username: 'Tamu10',
  nama: '',
  telepon: '',
  toko: '',
  gender: '',
  tglLahir: '',
  photo: null,
}

export default function App() {
  const [profile, setProfile] = useState(INITIAL_PROFILE)
  // Halaman yang sedang tampil di sebelah sidebar: 'profil' atau 'alamat'
  // Bisa dibuka langsung lewat /index.html#alamat
  const [page, setPage] = useState(() => (window.location.hash === '#alamat' ? 'alamat' : 'profil'))
  const [toast, setToast] = useState('')
  const timer = useRef(null)
  const namaRef = useRef(null)

  const notify = useCallback((msg) => {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 2200)
  }, [])

  // Dipanggil saat menu di sidebar diklik (Akun saya / Alamat)
  const handleNavigate = (tujuan) => {
    setPage(tujuan)
    window.location.hash = tujuan === 'profil' ? '' : tujuan
    window.scrollTo(0, 0)
  }

  const handleSave = (data) => {
    setProfile(data)
    notify('Perubahan berhasil disimpan ✓')
  }

  return (
    <>
      <Navbar />
      <div className="wrap">
        <Sidebar
          name={profile.nama || 'Fauzein'}
          photo={profile.photo}
          onEditProfile={() => {
            handleNavigate('profil')
            setTimeout(() => namaRef.current?.focus(), 0)
          }}
          page={page}
          onNavigate={handleNavigate}
        />
        {page === 'alamat' ? (
          <AddressPage />
        ) : (
          <ProfileForm profile={profile} onSave={handleSave} onNotify={notify} namaRef={namaRef} />
        )}
      </div>
      <div id="toast" className={toast ? 'show' : ''}>{toast}</div>
    </>
  )
}
