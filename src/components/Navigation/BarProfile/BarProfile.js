import "./BarProfile.css"
import { NavLink } from "react-router-dom";

function BarProfile({burgerActive}) {

  return (
    <nav className="header__bar">
      <ul className="header__bar-list list-reset">
        {burgerActive ?
          <li className="header__bar-link-container">
            <NavLink to="/" className={({ isActive }) => `header__bar-link link ${isActive ? ' header__bar-link_active' : ''}`}
            >Главная</NavLink>
          </li> : ''}
        <li className="header__bar-link-container">
          <NavLink to="/movies" className={({ isActive }) => `header__bar-link link ${isActive ? ' header__bar-link_active' : ''}`}
          >Фильмы</NavLink>
        </li>
        <li className="header__bar-link-container-last">
          <NavLink to="/saved-movies" className={({ isActive }) => `header__bar-link link ${isActive ? ' header__bar-link_active' : ''}`}
          >Сохранённые фильмы</NavLink>
        </li>
        <li className="header__bar-account">
          <NavLink to="/profile" className="header__bar-account-link link"></NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default BarProfile