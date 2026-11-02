// Komponen ProdukTrending
// 4 kartu produk: foto, nama, harga, dan rating bintang
import { produkTrending, rupiah } from '../data/produk'

export default function ProdukTrending() {
  return (
    <section className="produk" id="produk">
      <h2 className="judul-bagian">Produk trending</h2>

      <div className="produk-grid">
        {produkTrending.map((p) => (
          <a key={p.id} href="#" className="produk-kartu">
            <img src={p.gambar} alt={p.nama} />
            <div className="produk-info">
              <p className="produk-nama">{p.nama}</p>
              <p className="produk-harga">{rupiah(p.harga)}</p>
              <p className="produk-rating">
                <span aria-hidden="true">★</span> {p.rating}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
