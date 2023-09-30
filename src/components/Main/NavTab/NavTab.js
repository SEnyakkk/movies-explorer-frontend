import { HashLink } from "react-router-hash-link"
import "./NavTab.css"

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__container list-reset">
        <li><HashLink smooth to="/#about-project" className="nav-tab__link link">О проекте</HashLink></li>
        <li><HashLink smooth to="/#techs" className="nav-tab__link link">Технологии</HashLink></li>
        <li><HashLink smooth to="/#about-me" className="nav-tab__link link">Студент</HashLink></li>
      </ul>
    </nav>
  )
}

export default NavTab