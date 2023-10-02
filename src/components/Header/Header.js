import Logo from "../Logo/Logo"
import Navigation from "../Navigation/Navigation"
import "./Header.css"

function Header() {

  return (
    <header className="header header_theme_promo ">
      <div className="header__container">
        <Logo name={'header'}/>
        <Navigation />
      </div>
    </header>
  )
}

export default Header