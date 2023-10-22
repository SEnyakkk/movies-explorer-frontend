import "./Register.css"
import { Link, useNavigate } from "react-router-dom"
import headerLogo from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { mainApi } from "../../utils/MainApi";


function Register() {
  const { values, handleChange, errors, isValid, resetForm, setValues, errorMsg, setErrorMsg } = useFormWithValidation();
  const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    mainApi.register(values.name, values.email, values.password)
      // https://dev.to/miriamfark/display-backend-errors-to-the-frontend-4hoa
      .then((r) => {
        if (!r.ok) {
          return r.json().then((e) => setErrorMsg(Object.values(e).toString()))
        } else {
          return r.json(r)
        }
      })

  }



  return (
    <main className="page__auth">
      <section className="auth">
        <Link to="/" className='auth__logo link'>
          <img src={headerLogo} alt="Лого" className="logo-img" />
        </Link>
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form className="auth__form" onSubmit={handleSubmit}>

          <label className="auth__form-label" htmlFor="username">Имя</label>
          <input
            onChange={handleChange}
            value={values.name || ''}
            pattern="^[а-яА-ЯёЁa-zA-Z\-]+$"
            type="text"
            name="name"
            className="auth__form-input"
            placeholder="Ваше имя"
            required
            minLength={2}
            maxLength={30} />
          <span className="auth__form-span">{errors.name}</span>

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
          <span className="auth__form-span">{errors.email}</span>

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
          <div className="auth__form-submit">
            <button
              type="submit"
              className={`auth__form-submit-btn ${!isValid ? `auth__form-submit-btn_disable`
                : ''} link`}
              disabled={!isValid}>
              Зарегистрироваться
            </button>
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