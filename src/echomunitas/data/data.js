// Data dummy halaman Echomunitas (belum dari database)

export const pengguna = { nama: 'Fauzein', avatar: '/img/avatar-saya.webp' }

export const cerita = [
  { id: 1, nama: 'Riki', foto: '/img/cerita.webp', avatar: '/img/avatar-riki.webp' },
  { id: 2, nama: 'Uan', foto: '/img/post-kerajinan.webp', avatar: '/img/avatar-uan.webp' },
  { id: 3, nama: 'Wowo', foto: '/img/post-kardus.webp', avatar: '/img/avatar-wowo.webp' },
  { id: 4, nama: 'Riki', foto: '/img/cerita.webp', avatar: '/img/avatar-riki.webp' },
  { id: 5, nama: 'Uan', foto: '/img/post-lem.webp', avatar: '/img/avatar-uan.webp' },
]

export const tutorKomunitas = [
  { id: 1, judul: 'Sejak tau cara ini kardus sepatu ga langsung dibuang', gambar: '/img/tutor.webp' },
  { id: 2, judul: 'Sejak tau cara ini kardus sepatu ga langsung dibuang', gambar: '/img/produk.webp' },
  { id: 3, judul: 'Sejak tau cara ini kardus sepatu ga langsung dibuang', gambar: '/img/tutor.webp' },
  { id: 4, judul: 'Kerajinan lucu dari botol plastik bekas', gambar: '/img/post-kerajinan.webp' },
]

export const postinganAwal = [
  {
    id: 1,
    nama: 'Fauzein',
    avatar: '/img/avatar-fauzein.webp',
    teks: 'Halo teman teman, rekomendasiin aku cara membuat daur ulang dari kardus bekas',
    gambar: ['/img/post-kardus.webp'],
    suka: 1000,
    dibagikan: 10,
    komentar: [
      { id: 1, nama: 'Riki', avatar: '/img/avatar-riki.webp', teks: 'Kamu bisa buat tempat pensil dari kardus tersebut, itu jadi rekomendasi dari gw', waktu: '1 hari' },
      { id: 2, nama: 'Uan', avatar: '/img/avatar-uan.webp', teks: 'Bisa juga jadi rak buku mini, gampang kok', waktu: '5 Jam' },
    ],
  },
  {
    id: 2,
    nama: 'Uan',
    avatar: '/img/avatar-uan.webp',
    teks: 'Halo teman teman, Aku mau share tentang kerajinan yang aku Buat hari ini nih. Bahan bahannya cat akrilik, lem tembak, dan botol plastik bekas yang sudah dibersihkan.',
    gambar: ['/img/post-kerajinan.webp', '/img/post-lem.webp', '/img/post-lem.webp'],
    suka: 1000,
    dibagikan: 10,
    komentar: [],
  },
  {
    id: 3,
    nama: 'Wowo',
    avatar: '/img/avatar-wowo.webp',
    teks: 'Hasil tempat pensil dari kardus bekas, lumayan buat dipakai sendiri atau dijual di EchoJualan 😄',
    gambar: ['/img/produk.webp'],
    suka: 1000,
    dibagikan: 10,
    komentar: [],
  },
]

export const misiAwal = {
  harian: [
    { id: 'h1', judul: 'Beli produk ramah lingkungan', ket: 'Beli minimal 1 produk Echomarket', progres: 1, target: 1, hadiah: 'Hadiah Telah diperoleh' },
    { id: 'h2', judul: 'Berbagi di Echomunitas', ket: 'Posting 1 konten di komunitas', progres: 0, target: 1, hadiah: 'Voucher Diskon Rp 5.000', voucher: true },
  ],
  mingguan: [
    { id: 'm1', judul: 'Beli produk ramah lingkungan', ket: 'Beli minimal 1 produk Echomarket', progres: 1, target: 1, hadiah: 'Hadiah Telah diperoleh' },
    { id: 'm2', judul: 'Berbagi di Echomunitas', ket: 'Posting 3 konten di komunitas', progres: 0, target: 3, hadiah: 'Voucher Diskon Rp 5.000', voucher: true },
    { id: 'm3', judul: 'Komentar di postingan', ket: 'Beri 5 komentar di komunitas', progres: 0, target: 5, hadiah: 'Voucher Diskon Rp 5.000', voucher: true },
  ],
}

// 1000 -> "1K"
export function singkat(angka) {
  return angka >= 1000 ? (angka / 1000).toFixed(angka % 1000 === 0 ? 0 : 1) + 'K' : String(angka)
}
