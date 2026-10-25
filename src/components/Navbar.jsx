import Icon from './Icon'

export default function Navbar() {
  return (
    <header>
      <div className="logo">
        <Icon name="cart" size={34} color="var(--green-d)" />
        EchoMarket
      </div>
      <div className="search">
        <Icon name="search" />
        <input placeholder="Pencarian" />
      </div>
      <div className="icons">
        <Icon name="basket" />
        <Icon name="bell" color="#f5b301" />
        <Icon name="chat" color="var(--green)" />
        <Icon name="heart" color="#e53935" />
        <div className="av-s">M K</div>
      </div>
    </header>
  )
}
