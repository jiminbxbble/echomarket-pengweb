import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Setiap halaman punya file HTML sendiri (multi-page)
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Profil
        beranda: 'beranda.html',
        masuk: 'masuk.html',
        daftar: 'daftar.html',
        otp: 'otp.html',
        lupaPassword: 'lupa-password.html',
        echomunitas: 'echomunitas.html',
      },
    },
  },
})
