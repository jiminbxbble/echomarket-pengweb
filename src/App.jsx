import { useCallback, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProfileForm from './components/ProfileForm'
import AddressPage from "./components/AddressPage";

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
  const [toast, setToast] = useState('')
  const [page, setPage] = useState('profil') // halaman yang sedang dibuka: 'profil' atau 'alamat'
  const timer = useRef(null)
  const namaRef = useRef(null)

  const notify = useCallback((msg) => {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 2200)
  }, [])

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
            setPage('profil')
            setTimeout(() => namaRef.current?.focus(), 0)
          }}
          page={page}
          onNavigate={setPage}
        />
        {page === 'profil' && (
          <ProfileForm profile={profile} onSave={handleSave} onNotify={notify} namaRef={namaRef} />
        )}
        {page === 'alamat' && <AddressPage />}
      </div>
      <div id="toast" className={toast ? 'show' : ''}>{toast}</div>
    </>
  )
}
