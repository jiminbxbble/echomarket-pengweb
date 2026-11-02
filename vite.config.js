import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Tiga halaman: index.html (Profil), beranda.html (Beranda), keranjang.html (Keranjang)
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        beranda: 'beranda.html',
        keranjang: 'keranjang.html',
      },
    },
  },
})
