import { useCallback, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProfileForm from './components/ProfileForm'
import BuyPage from './BuyPage'

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
      <BuyPage />
    </>
  )
}
