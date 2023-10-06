import "./BarLogin.css"
import { Link } from "react-router-dom";

function BarLogin() {
  return (
    <nav className="bar-login bar-login__container">
      <ul className="bar-login__links list-reset">
        <li>
          <button className="bar-login__button" type="button">
            <Link to="/signup" className="bar-login__link link">Регистрация</Link>
          </button>
        </li>
        <li>
          <button className="bar-login__button" type="button">
            <Link to="/signin" className="bar-login__link bar-login__link-login link">Войти</Link>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default BarLogin