import "./Register.css"
import { Link, useLocation } from "react-router-dom"
import headerLogo from "../../images/logo.svg";


function Register() {
  const location = useLocation();

  return (
    <main className="page__auth">
      <section className="auth__container">
        <Link to="/" className='auth__logo link'>
          <img src={headerLogo} alt="Лого" className="logo__img" />
        </Link>
        <h2 className="auth__title">{location.pathname === '/signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h2>
        <form className="auth__form">
          <label className="auth__form_label">Имя</label>
          <input type="text" name="auth-name" className="auth__form_input" placeholder="" required />
          <span className="auth__form_span auth__form_span_valid">Что-то пошло не так...</span>
          <label className="auth__form_label">E-mail</label>
          <input type="email" name="auth-email" className="auth__form_input" placeholder="" required />
          <span className="auth__form_span auth__form_span_valid">Что-то пошло не так...</span>
          <label className="auth__form_label">Пароль</label>
          <input type="password" name="auth-password" className="auth__form_input auth__form_input_invalid" placeholder="" required />
          <span className="auth__form_span">Что-то пошло не так...</span>
          <div className="auth__form-submit">
            <Link to="/movies" ><button type="submit" className="auth__form_submit auth__form_submit_disable link "> {location.pathname === '/signin' ? 'Войти' : 'Зарегистрироваться'} </button></Link>
            <p className="auth__form-caption">
              {location.pathname === '/signin' ? 'Ещё не зарегистрированы? ' : 'Уже зарегистрированы? '}

              {/* <Link to="/signup" className="auth__form-link-caption link">Регистрация</Link> */}

              <Link to="/signin" className="auth__form-link-caption link ">Войти</Link>
            </p>
          </div>
        </form>
      </section>
    </main >
  )
}

export default Register