export default function Header() {
  return (
    <header className="header-bar">
      <div className="header-title">MFT Shop</div>
      <div className="header-cart">
        <span role="img" aria-label="cart" className="cart-icon">🛒</span>
        <span className="cart-count">0</span>
      </div>
    </header>
  )
}
