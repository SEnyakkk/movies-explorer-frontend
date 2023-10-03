import { Link, useLocation } from "react-router-dom"
import "./Navigation.css"


function Navigation() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ?
        <nav className="header__links_login">
          <Link to="/signup" className="header__link link">Регистрация</Link>
          <Link to="/signin" className="header__link header__link_login link">Войти</Link>
        </nav>
        :
        <>
          <nav className="header__links">
            <div className="header__links_movies">
              <Link to="/movies" className={`header__link header__link_movies header__link_movies_1st link ${location.pathname === '/movies' ? 'header__link_active' : ''}`}
              >Фильмы</Link>
              <Link to="/saved-movies" className={`header__link header__link_movies link ${location.pathname === '/saved-movies' ? 'header__link_active' : ''}`}
              >Сохранённые фильмы</Link>
            </div>
            <Link to="/profile" className="header__link header__link_user link"
            ></Link>
          </nav>
        </>
      }
    </>
  )
}

export default Navigation