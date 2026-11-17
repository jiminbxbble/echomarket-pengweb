// Mengisi database dengan data yang sebelumnya ada di frontend (public/data/marketplace.json).
// Jalankan: npx prisma db seed
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const kategori = [
  { id: 'sepatu', nama: 'Sepatu', ikon: '/img/kat-sepatu.png' },
  { id: 'plastik', nama: 'Plastik', ikon: '/img/kat-plastik.png' },
  { id: 'kardus', nama: 'Kardus', ikon: '/img/kat-kardus.png' },
  { id: 'diy', nama: 'DIY', ikon: '/img/kat-diy.png' },
  { id: 'mainan', nama: 'Mainan Bekas', ikon: '/img/kat-mainan.png' },
  { id: 'fashion', nama: 'Fashion', ikon: '/img/kat-fashion.png' },
  { id: 'aksesoris', nama: 'Aksesoris', ikon: '/img/kat-aksesoris.png' },
];

const produk = [
  {
    nama: 'Tempat pensil dari kardus',
    kategoriId: 'kardus',
    harga: 10000,
    hargaAwal: null,
    rating: 4.9,
    terjual: 10000,
    lokasi: 'Bandung',
    gambar: '/img/produk.webp',
  },
  {
    nama: 'Kotak penyimpanan kardus',
    kategoriId: 'kardus',
    harga: 15000,
    hargaAwal: 20000,
    rating: 4.8,
    terjual: 2000,
    lokasi: 'Bandung',
    gambar: '/img/post-kardus.webp',
  },
  {
    nama: 'Kardus bekas tebal (5 pcs)',
    kategoriId: 'kardus',
    harga: 8000,
    hargaAwal: null,
    rating: 4.7,
    terjual: 5000,
    lokasi: 'Jakarta',
    gambar: '/img/kardus.jpg',
  },
  {
    nama: 'Jaket daur ulang',
    kategoriId: 'fashion',
    harga: 85000,
    hargaAwal: 120000,
    rating: 4.9,
    terjual: 900,
    lokasi: 'Surakarta',
    gambar: '/img/fashion.jpg',
  },
  {
    nama: 'Sepatu sneakers bekas',
    kategoriId: 'sepatu',
    harga: 75000,
    hargaAwal: null,
    rating: 4.6,
    terjual: 1000,
    lokasi: 'Bandung',
    gambar: '/img/sepatu.jpg',
  },
  {
    nama: 'Paket bahan DIY kreatif',
    kategoriId: 'diy',
    harga: 25000,
    hargaAwal: 30000,
    rating: 4.8,
    terjual: 3000,
    lokasi: 'Jakarta',
    gambar: '/img/diy.jpg',
  },
  {
    nama: 'Hiasan dari botol plastik',
    kategoriId: 'plastik',
    harga: 12000,
    hargaAwal: null,
    rating: 4.7,
    terjual: 1000,
    lokasi: 'Bandung',
    gambar: '/img/post-kerajinan.webp',
  },
  {
    nama: 'Lem tembak bekas',
    kategoriId: 'diy',
    harga: 20000,
    hargaAwal: 35000,
    rating: 4.5,
    terjual: 500,
    lokasi: 'Surakarta',
    gambar: '/img/post-lem.webp',
  },
  {
    nama: 'Kotak pensil daur ulang',
    kategoriId: 'kardus',
    harga: 10000,
    hargaAwal: 15000,
    rating: 4.9,
    terjual: 8000,
    lokasi: 'Bandung',
    gambar: '/img/kotak_pensil.jpg',
  },
  {
    nama: 'Tempat pensil plastik',
    kategoriId: 'plastik',
    harga: 9000,
    hargaAwal: null,
    rating: 4.6,
    terjual: 4000,
    lokasi: 'Jakarta',
    gambar: '/img/tempat_pensil.jpg',
  },
  // flash sale
  {
    nama: 'Tempat pensil kardus',
    kategoriId: 'kardus',
    harga: 5000,
    hargaAwal: 10000,
    rating: 4.8,
    terjual: 80,
    lokasi: 'Bandung',
    gambar: '/img/produk.webp',
    flashSale: true,
  },
  {
    nama: 'Kotak serbaguna',
    kategoriId: 'kardus',
    harga: 7500,
    hargaAwal: 15000,
    rating: 4.7,
    terjual: 65,
    lokasi: 'Bandung',
    gambar: '/img/post-kardus.webp',
    flashSale: true,
  },
  {
    nama: 'Hiasan botol plastik',
    kategoriId: 'plastik',
    harga: 6000,
    hargaAwal: 12000,
    rating: 4.6,
    terjual: 45,
    lokasi: 'Jakarta',
    gambar: '/img/post-kerajinan.webp',
    flashSale: true,
  },
  {
    nama: 'Sepatu bekas layak pakai',
    kategoriId: 'sepatu',
    harga: 45000,
    hargaAwal: 90000,
    rating: 4.5,
    terjual: 30,
    lokasi: 'Bandung',
    gambar: '/img/sepatu.jpg',
    flashSale: true,
  },
];

async function main() {
  for (const k of kategori) {
    await prisma.category.upsert({ where: { id: k.id }, update: k, create: k });
  }

  // Akun admin & pengguna demo. Password diambil dari env agar tidak tertulis di kode.
  const passwordAdmin = process.env.SEED_ADMIN_PASSWORD ?? 'admin12345';
  await prisma.user.upsert({
    where: { email: 'admin@echomarket.id' },
    update: {},
    create: {
      nama: 'Admin EchoMarket',
      email: 'admin@echomarket.id',
      password: await bcrypt.hash(passwordAdmin, 10),
      avatar: '/img/avatar.png',
      role: 'ADMIN',
    },
  });

  const passwordUser = await bcrypt.hash('user12345', 10);
  const fauzein = await prisma.user.upsert({
    where: { email: 'fauzein@echomarket.id' },
    update: {},
    create: {
      nama: 'Fauzein',
      email: 'fauzein@echomarket.id',
      password: passwordUser,
      telepon: '081234567890',
      avatar: '/img/avatar-fauzein.webp',
      role: 'USER',
    },
  });

  const riki = await prisma.user.upsert({
    where: { email: 'riki@echomarket.id' },
    update: {},
    create: {
      nama: 'Riki',
      email: 'riki@echomarket.id',
      password: passwordUser,
      avatar: '/img/avatar-riki.webp',
      role: 'USER',
    },
  });

  const uan = await prisma.user.upsert({
    where: { email: 'uan@echomarket.id' },
    update: {},
    create: {
      nama: 'Uan',
      email: 'uan@echomarket.id',
      password: passwordUser,
      avatar: '/img/avatar-uan.webp',
      role: 'USER',
    },
  });

  const wowo = await prisma.user.upsert({
    where: { email: 'wowo@echomarket.id' },
    update: {},
    create: {
      nama: 'Wowo',
      email: 'wowo@echomarket.id',
      password: passwordUser,
      avatar: '/img/avatar-wowo.webp',
      role: 'USER',
    },
  });

  if ((await prisma.address.count({ where: { userId: fauzein.id } })) === 0) {
    await prisma.address.create({
      data: {
        userId: fauzein.id,
        label: 'Rumah',
        penerima: 'Fauzein',
        telepon: '081234567890',
        provinsi: 'Jawa Barat',
        kota: 'Kab. Bandung',
        kecamatan: 'Bojongsoang',
        detail: 'Jl. Telekomunikasi No. 1, Terusan Buahbatu',
        utama: true,
      },
    });
  }

  if ((await prisma.product.count()) === 0) {
    await prisma.product.createMany({
      data: produk.map((p) => ({
        ...p,
        stok: 50,
        penjualId: fauzein.id,
        deskripsi: `${p.nama} - produk daur ulang ramah lingkungan.`,
      })),
    });
  }

  if ((await prisma.post.count()) === 0) {
    const post1 = await prisma.post.create({
      data: {
        userId: fauzein.id,
        teks: 'Halo teman teman, rekomendasiin aku cara membuat daur ulang dari kardus bekas',
        gambar: ['/img/post-kardus.webp'],
        suka: 1000,
      },
    });

    await prisma.comment.createMany({
      data: [
        {
          postId: post1.id,
          userId: riki.id,
          teks: 'Kamu bisa buat tempat pensil dari kardus tersebut, itu jadi rekomendasi dari gw',
        },
        {
          postId: post1.id,
          userId: uan.id,
          teks: 'Bisa juga jadi rak buku mini, gampang kok',
        },
      ],
    });

    await prisma.post.create({
      data: {
        userId: uan.id,
        teks: 'Halo teman teman, Aku mau share tentang kerajinan yang aku Buat hari ini nih. Bahan bahannya cat akrilik, lem tembak, dan botol plastik bekas yang sudah dibersihkan.',
        gambar: ['/img/post-kerajinan.webp', '/img/post-lem.webp'],
        suka: 1000,
      },
    });

    await prisma.post.create({
      data: {
        userId: wowo.id,
        teks: 'Hasil tempat pensil dari kardus bekas, lumayan buat dipakai sendiri atau dijual di EchoJualan',
        gambar: ['/img/produk.webp'],
        suka: 1000,
      },
    });
  }

  if ((await prisma.tutorial.count()) === 0) {
    await prisma.tutorial.createMany({
      data: [
        {
          judul: 'Tutorial Membuat Baju dari Barang Bekas',
          kategori: 'Fashion',
          gambar: '/img/tutor.webp',
          konten: 'Panduan langkah demi langkah mengubah pakaian lama menjadi desain baru.',
        },
        {
          judul: 'Tempat Pensil dari Kardus Sepatu',
          kategori: 'Kardus',
          gambar: '/img/produk.webp',
          konten: 'Potong kardus sepatu, lapisi kertas daur ulang, dan hias sesuai selera.',
        },
        {
          judul: 'Kerajinan Lucu dari Botol Plastik',
          kategori: 'Plastik',
          gambar: '/img/post-kerajinan.webp',
          konten: 'Bersihkan botol plastik bekas lalu bentuk menjadi pot tanaman hias.',
        },
      ],
    });
  }

  const produkPertama = await prisma.product.findFirst({ orderBy: { id: 'asc' } });
  if (produkPertama && (await prisma.order.count()) === 0) {
    await prisma.order.create({
      data: {
        userId: fauzein.id,
        total: produkPertama.harga + 6500,
        ongkir: 6500,
        status: 'DIBAYAR',
        metodeBayar: 'QRIS',
        alamatKirim: 'Jl. Telekomunikasi No. 1, Bojongsoang, Kab. Bandung',
        items: {
          create: [
            {
              productId: produkPertama.id,
              jumlah: 1,
              harga: produkPertama.harga,
            },
          ],
        },
      },
    });
  }

  console.log('Seed selesai.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
