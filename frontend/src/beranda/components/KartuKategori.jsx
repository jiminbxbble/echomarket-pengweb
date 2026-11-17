
export default function KartuKategori({ nama, gambar }) {
  return (
    <a href="#" className="kartu">
      <img src={gambar} alt={nama} />
      
      <span className="kartu-label">{nama}</span>
    </a>
  )
}
