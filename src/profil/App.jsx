import { useCallback, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from './components/Sidebar'
import ProfileForm from './components/ProfileForm'
import AddressPage from './components/AddressPage'
import './index.css'

const INITIAL_PROFILE = {
  username: 'Tamu10',
  nama: '',
  telepon: '',
  toko: '',
  gender: '',
  tglLahir: '',
  photo: null,
}

export default function Profil() {
  const [profile, setProfile] = useState(INITIAL_PROFILE)
  const [currentPage, setCurrentPage] = useState('profil')
  const [toast, setToast] = useState('')
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
          page={currentPage}
          onNavigate={setCurrentPage}
          onEditProfile={() => {
            setCurrentPage('profil')
            setTimeout(() => namaRef.current?.focus(), 50)
          }}
        />
        {currentPage === 'alamat' ? (
          <AddressPage />
        ) : (
          <ProfileForm profile={profile} onSave={handleSave} onNotify={notify} namaRef={namaRef} />
        )}
      </div>
      <div id="toast" className={toast ? 'show' : ''}>{toast}</div>
    </>
  )
}
