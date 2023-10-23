import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import headerLogo from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { mainApi } from "../../utils/MainApi";
import { useState } from "react";


function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm, setValues, errorMsg, setErrorMsg } = useFormWithValidation();
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    mainApi.authorize(values.email, values.password)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((evt) => setErrorMsg(Object.values(evt).toString()))
        } else {
          return res.json()
        }
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          handleLogin(data)
          navigate('/movies', { replace: true });
        }
      })
      .catch(err => console.log(err));

    //   if (!res.ok) {
    //     return res.json().then((evt) => setErrorMsg(Object.values(evt).toString()))
    //   } else {
    //     return res.json()
    //   }
    // })
    //     .then((res) => {
    //   navigate('/login', { replace: true });
    // }
    // );
  }

  return (
    <main className="page__auth">
      <section className="auth">
        <Link to="/" className='auth__logo link'>
          <img src={headerLogo} alt="Лого" className="logo-img" />
        </Link>
        <h1 className="auth__title">Рады видеть!</h1>
        <form className="auth__form" onSubmit={handleSubmit}>

          <label className="auth__form-label" htmlFor="email">E-mail</label>
          <input
            onChange={handleChange}
            value={values.email || ''}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+[^@\s]+"
            type="email"
            name="email"
            className="auth__form-input"
            placeholder="укажите email"
            required />
          <span className="auth__form-span ">{errors.email}</span>

          <label className="auth__form-label" htmlFor="password">Пароль</label>
          <input
            onChange={handleChange}
            value={values.password || ''}
            type="password"
            name="password"
            className={`auth__form-input ${!isValid ? 'auth__form-input_invalid' : ''}`}
            placeholder="введите пароль"
            required
            minLength={2}
            maxLength={30} />
          <span className={`auth__form-span ${isValid ? '' : 'auth__form-input_invalid'}`}>
            {errors.password}</span>

          <span className="auth__form-submit-status auth__form-submit-status_type_err">
            {errorMsg}
          </span>
          <div className="auth__form-submit-login">
            <button
              type="submit"
              className={`auth__form-submit-btn ${!isValid || errorMsg ? `auth__form-submit-btn_disable`
                : ''} link`}
              disabled={!isValid || errorMsg}>
              Войти
            </button>
            <p className="auth__form-caption">
              Ещё не зарегистрированы?
              <Link to="/signup" className="auth__form-link-caption link"> Регистрация</Link>
            </p>
          </div>
        </form>
      </section>
    </main >
  )
}

export default Login