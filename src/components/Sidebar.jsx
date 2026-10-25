import Avatar from './Avatar'
import Icon from './Icon'

const MENU = [
  { icon: 'user', label: 'Akun saya', page: 'profil' },
  { icon: 'bank', label: 'Bank' },
  { icon: 'pin', label: 'Alamat', page: 'alamat' },
  { icon: 'bell', label: 'Pengataturan Notifikasi' },
  { icon: 'lock', label: 'Pengataturan Privasi' },
  { icon: 'box', label: 'Pesanan saya' },
  { icon: 'ticket', label: 'Voucher saya' },
]

export default function Sidebar({ name, photo, onEditProfile, page, onNavigate }) {
  return (
    <aside>
      <div className="me">
        <Avatar src={photo} />
        <div>
          <b>{name}</b>
          <a onClick={onEditProfile}>
            <Icon name="pencil" /> Ubah profil
          </a>
        </div>
      </div>
      <h4>Akun</h4>
      <nav className="menu">
        {MENU.map((m) => (
          <a
            key={m.label}
            className={m.page === page ? 'on' : ''}
            onClick={() => m.page && onNavigate(m.page)}
          >
            <span><Icon name={m.icon} /></span>
            {m.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
