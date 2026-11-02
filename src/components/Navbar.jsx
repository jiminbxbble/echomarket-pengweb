import Icon from './Icon'

export default function Navbar() {
  return (
    <header>
      <a href="/beranda.html" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Icon name="cart" size={34} color="var(--green-d)" />
        EchoMarket
      </a>
      <div className="search">
        <Icon name="search" />
        <input placeholder="Pencarian" />
      </div>
      <div className="icons">
        <a href="/keranjang.html" title="Keranjang" style={{ color: 'inherit', display: 'flex', textDecoration: 'none' }}>
          <Icon name="basket" />
        </a>
        <Icon name="bell" color="#f5b301" />
        <Icon name="chat" color="var(--green)" />
        <Icon name="heart" color="#e53935" />
        <a href="/" title="Profil Saya" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="av-s">M K</div>
        </a>
      </div>
    </header>
  )
}
