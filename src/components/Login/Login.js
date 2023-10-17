import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import headerLogo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";
import { useEffect } from "react";
import { validateEmail, validateName } from "../../utils/constants";


function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useFormValidation();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password);
  };

  return (
    <main className="page__auth">
      <section className="auth">
        <Link to="/" className='auth__logo link'>
          <img src={headerLogo} alt="Лого" className="auth__logo-img" />
        </Link>
        <h1 className="auth__title">Рады видеть!</h1>
        <form onSubmit={onSubmit} className="auth__form">

          <label className="auth__form-label">E-mail</label>
          <input type="email" className="auth__form-input"
            name="email"
            value={values.email || ''}
            placeholder="укажите email"
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required />
          <span className="auth__form-span">{errors.email} {validateEmail(values.email).message}</span>

          <label className="auth__form-label">Пароль</label>
          <input type="password" className={`auth__form-input ${!isValid ? 'auth__form-input_invalid' : ''}`}
            name="password"
            value={values.password || ''}
            placeholder="введите пароль"
            onChange={handleChange}
            minLength={6}
            maxLength={30}
            required />
          <span className={`auth__form-span ${isValid ? '' : 'auth__form-input_invalid'}`}>{errors.password}</span>

          <div className="auth__form-submit-login">
            <button
              type="submit"
              className={`auth__form-submit-btn ${!isValid || validateEmail(values.email).invalid ? `auth__form-submit-btn_disable` : ''} link`}
              disabled={
                !isValid ||
                validateEmail(values.email).invalid}>
              Войти
            </button>

            <p className="auth__form-caption">
              {'Ещё не зарегистрированы? '}
              <Link to="/signup" className="auth__form-link-caption link">Регистрация</Link>
            </p>
          </div>
        </form>
      </section>
    </main >
  )
}

export default Login