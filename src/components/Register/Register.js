import "./Register.css"
import { Link, useNavigate } from "react-router-dom"
import headerLogo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";
import { useEffect } from "react";
import { validateEmail, validateName } from "../../utils/constants";


function Register({ onRegister, isLoggedIn, }) {
  const { values, handleChange, errors, isValid } = useFormValidation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn]);

  return (
    <main className="page__auth">
      <section className="auth">
        <Link to="/" className='auth__logo link'>
          <img src={headerLogo} alt="Лого" className="logo-img" />
        </Link>
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          onRegister(values);
        }} className="auth__form">

          <label className="auth__form-label">Имя</label>
          <input type="text" className="auth__form-input"
            name="name"
            value={values.name || ''}
            placeholder="ваше имя"
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required />
          <span className="auth__form-span">{errors.name}{validateName(values.name).message}</span>

          <label className="auth__form-label">E-mail</label>
          <input type="email" className="auth__form-input"
            name="email"
            value={values.email || ''}
            placeholder="укажите email"
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required />
          <span className="auth__form-span">{errors.email}{validateEmail(values.email).message}</span>

          <label className="auth__form-label">Пароль</label>
          <input type="password" className="auth__form-input"
            name="password"
            value={values.password || ''}
            placeholder="введите пароль"
            onChange={handleChange}
            minLength={6}
            maxLength={30}
            required />
          <span className={`auth__form-span ${isValid ? '' : 'auth__form-input_invalid'}`}>{errors.password}</span>

          <div className="auth__form-submit">
            <button
              type="submit"
              className={`auth__form-submit-btn ${validateEmail(values.email).invalid ? `auth__form-submit-btn_disable` : ''} link`}
              disabled={
                !isValid ||
                validateEmail(values.email).invalid}>
              Зарегистрироваться
            </button>

            <p className="auth__form-caption">
              {'Уже зарегистрированы? '}
              <Link to="/signin" className="auth__form-link-caption link ">Войти</Link>
            </p>
          </div>
        </form>
      </section>
    </main >
  )
}

export default Register