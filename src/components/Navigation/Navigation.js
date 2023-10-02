import { Link } from "react-router-dom"
import "./Navigation.css"


function Navigation() {

  return (
    <>
      <div className="navigation">
        <Link to="/signup" className="auth__form-link-caption link"><button className="navigation__registration-button">Регистрация</button></Link>
        {/* <button className="navigation__registration-button">Регистрация</button> */}
        {/* <button className="navigation__login-button">Войти</button> */}
        <Link to="/signin" className="auth__form-link-caption link"><button className="navigation__login-button">Войти</button></Link>
      </div>
    </>
  )
}

export default Navigation