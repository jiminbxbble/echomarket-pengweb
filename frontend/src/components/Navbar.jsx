import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function Navbar() {
  return (
    <header>
      <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Icon name="cart" size={34} color="var(--green-d)" />
        EchoMarket
      </Link>
      <div className="search">
        <Icon name="search" />
        <input placeholder="Pencarian" />
      </div>
      <div className="icons">
        <Link to="/keranjang" title="Keranjang" style={{ color: 'inherit', display: 'flex', textDecoration: 'none' }}>
          <Icon name="basket" />
        </Link>
        <Icon name="bell" color="#f5b301" />
        <Icon name="chat" color="var(--green)" />
        <Icon name="heart" color="#e53935" />
        <Link to="/profil" title="Profil Saya" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="av-s">M K</div>
        </Link>
      </div>
    </header>
  )
}
