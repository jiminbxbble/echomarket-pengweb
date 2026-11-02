import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Dua halaman: index.html (Profil) dan beranda.html (Beranda)
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        beranda: 'beranda.html',
      },
    },
  },
})
