
const dasar = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const PATH = {
  cari: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  keranjang: <><path d="M5 8h14l-1.5 11h-11z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  lonceng: <><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 21h4" /></>,
  chat: <><path d="M4 5h16v11H8l-4 4z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>,
  hati: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  lokasi: <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  toko: <><path d="M3 9l2-5h14l2 5" /><path d="M4 9v11h16V9" /><path d="M3 9h18" /><path d="M9 20v-6h6v6" /></>,
  dunia: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  troli: <><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" /><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" /><path d="M13 9v4M11 11h4" /></>,
  daftarToko: <><path d="M3 9l2-5h14l2 5" /><path d="M4 9v11h9" /><path d="M3 9h18" /><path d="M18 14v6M15 17h6" /></>,
  foto: <><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  tambah: <path d="M12 5v14M5 12h14" />,
  suka: <><path d="M7 11v9H4v-9z" /><path d="M7 11l4-7a2 2 0 0 1 3 2l-1 4h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7" /></>,
  komentar: <><rect x="3" y="4" width="18" height="14" rx="1" /><path d="M7 9h10M7 13h6" /></>,
  bagikan: <path d="M14 5l7 7-7 7v-4c-5 0-8 1.5-11 5 1-5 4-10 11-11z" />,
  tutor: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4l2 5M14 4l2 5" /><path d="M10 12.5v5l4.5-2.5z" /></>,
  centang: <path d="M5 12l5 5 9-10" />,
  hadiah: <><rect x="4" y="9" width="16" height="11" /><path d="M2 9h20M12 9v11M12 9c-2-4-6-4-6-1.5S10 9 12 9c2 0 6 1 6-1.5S14 5 12 9z" /></>,
  tutup: <path d="M6 6l12 12M18 6L6 18" />,
  kirim: <path d="M3 11l18-8-8 18-2-8z" />,
}

export default function Ikon({ nama, ukuran = 22, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={ukuran} height={ukuran} {...dasar} {...props} aria-hidden="true">
      {PATH[nama]}
    </svg>
  )
}
