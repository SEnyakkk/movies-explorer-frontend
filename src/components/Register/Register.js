import "./Register.css"
import { Link } from "react-router-dom"
import headerLogo from "../../images/logo.svg";


function Register() {


  return (
    <main className="page__auth">
      <section className="auth">
        <Link to="/" className='auth__logo link'>
          <img src={headerLogo} alt="Лого" className="logo-img" />
        </Link>
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form className="auth__form">
          <label className="auth__form-label">Имя</label>
          <input type="text" name="auth-name" className="auth__form-input" placeholder="Ваше имя" required minLength={2}
            maxLength={30} />
          <span className="auth__form-span auth__form-span_valid">Что-то пошло не так...</span>
          <label className="auth__form-label">E-mail</label>
          <input type="email" name="auth-email" className="auth__form-input" placeholder="укажите email" required />
          <span className="auth__form-span auth__form-span_valid">Что-то пошло не так...</span>
          <label className="auth__form-label">Пароль</label>
          <input type="password" name="auth-password" className="auth__form-input auth__form-input_invalid" placeholder="введите пароль" required minLength={2}
            maxLength={30} />
          <span className="auth__form-span">Что-то пошло не так...</span>
          <span className="auth__form-submit-status auth__form-submit-status_type_err">ошибка регистрации</span>
          <div className="auth__form-submit">
            <Link to="/movies" className="auth__form-submit-btn auth__form-submit-btn_disable link ">
              Зарегистрироваться
            </Link>
            <p className="auth__form-caption">
              Уже зарегистрированы?
              <Link to="/signin" className="auth__form-link-caption link "> Войти</Link>
            </p>
          </div>
        </form>
      </section>
    </main >
  )
}

export default Register