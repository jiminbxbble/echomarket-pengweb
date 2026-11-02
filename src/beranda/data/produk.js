// Data dummy untuk bagian Produk trending dan EchoTutor di Beranda
export const produkTrending = [
  { id: 1, nama: 'Tempat Pensil', harga: 10000, rating: 4.9, gambar: '/img/produk.webp' },
  { id: 2, nama: 'Tempat Pensil', harga: 10000, rating: 4.9, gambar: '/img/produk.webp' },
  { id: 3, nama: 'Tempat Pensil', harga: 10000, rating: 4.9, gambar: '/img/produk.webp' },
  { id: 4, nama: 'Tempat Pensil', harga: 10000, rating: 4.9, gambar: '/img/produk.webp' },
]

export const tutorial = [
  { id: 1, kategori: 'Fashion', judul: 'Tutorial Membuat Baju dari Barang Bekas', gambar: '/img/tutor.webp' },
  { id: 2, kategori: 'Fashion', judul: 'Tutorial Membuat Baju dari Barang Bekas', gambar: '/img/tutor.webp' },
  { id: 3, kategori: 'Fashion', judul: 'Tutorial Membuat Baju dari Barang Bekas', gambar: '/img/tutor.webp' },
  { id: 4, kategori: 'Fashion', judul: 'Tutorial Membuat Baju dari Barang Bekas', gambar: '/img/tutor.webp' },
  { id: 5, kategori: 'Fashion', judul: 'Tutorial Membuat Baju dari Barang Bekas', gambar: '/img/tutor.webp' },
  { id: 6, kategori: 'Fashion', judul: 'Tutorial Membuat Baju dari Barang Bekas', gambar: '/img/tutor.webp' },
]

// Mengubah angka 10000 menjadi "Rp. 10.000"
export function rupiah(angka) {
  return 'Rp. ' + angka.toLocaleString('id-ID')
}
