// Panel kanan: Tantangan, streak, misi harian & misi mingguan
import Ikon from './Ikon'

function KartuMisi({ misi, onKlaim }) {
  const selesai = misi.progres >= misi.target
  const persen = Math.min(100, (misi.progres / misi.target) * 100)
  return (
    <div className={'em-misi' + (selesai ? ' selesai' : '')}>
      <div className="em-misi-judul">
        <b>{misi.judul}</b>
        {selesai && <span className="em-centang"><Ikon nama="centang" ukuran={12} strokeWidth={3} /></span>}
        {!selesai && misi.voucher && <span className="em-label">+1 Voucher</span>}
      </div>
      <p>{misi.ket}</p>
      <div className="em-bar">
        <div style={{ width: persen + '%' }} />
        <span>{misi.progres}/{misi.target}</span>
      </div>
      <div className="em-hadiah">
        <Ikon nama="hadiah" ukuran={16} />
        {selesai && misi.voucher && !misi.diklaim ? (
          <button className="em-btn-hijau kecil" onClick={() => onKlaim(misi.id)}>Klaim Hadiah</button>
        ) : (
          <span>{selesai && misi.voucher ? 'Hadiah Telah diperoleh' : misi.hadiah}</span>
        )}
      </div>
    </div>
  )
}

export default function Tantangan({ misi, streak, onKlaim }) {
  return (
    <aside className="em-tantangan">
      <h2>Tantangan</h2>
      <p className="em-tantangan-sub">Selesaikan Misi untuk rewards!</p>

      <div className="em-streak">
        <strong>{streak} 🔥</strong>
        <span>
          {streak > 0 ? 'Streak telah dibuat, pertahankan ya...' : 'Belum ada streak, yuk buat langkah pertamamu!'}
        </span>
      </div>

      <h3>🌱 Misi harian</h3>
      {misi.harian.map((m) => <KartuMisi key={m.id} misi={m} onKlaim={onKlaim} />)}

      <h3>🌳 Misi Mingguan</h3>
      {misi.mingguan.map((m) => <KartuMisi key={m.id} misi={m} onKlaim={onKlaim} />)}
    </aside>
  )
}
