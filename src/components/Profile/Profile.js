import "./Profile.css"
import Header from "../Header/Header";
import useFormValidation from "../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { validateEmail, validateName } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";


function Profile({ setCurrentUser }) {
  const { values, handleChange, isValid, setValues, setIsValid } = useFormValidation();
  const user = useContext(CurrentUserContext);
  const [submitBtn, setSubmitBtn] = useState(false);
  const [res, setRes] = useState({ type: 'default', msg: '' });
  const navigate = useNavigate();

  useEffect(() => {
    setValues({
      name: user.name,
      email: user.email
    });
  }, [setValues, user.email, user.name]);

  function handleUpdateUser(e) {
    e.preventDefault();
    mainApi.setUserInfo(values.name, values.email)
      .then(({ name, email }) => {
        setCurrentUser((user) => ({
          ...user,
          name: name,
          email: email
        }));
        setSubmitBtn(false)
        setRes({ type: 'success', msg: 'Данные пользователя обновлены успешно.' });
        setIsValid(false);
      })
      .catch((error) => {
        setRes({ type: 'error', msg: 'При обновлении профиля произошла ошибка.' });
        setIsValid(false);
      });
  };

  function handleChangeInputs(e) {
    handleChange(e);
    const { name, value } = e.target
    if (name === "name" && value === user.name) {
      setIsValid(false);
    }
    if (name === "email" && value === user.email) {
      setIsValid(false);
    }
  }

  function toggleSubmitBtn() {
    setSubmitBtn(show => !show);
    setRes({ type: 'default', msg: '' });
  }

  function handleSignOut() {
    localStorage.clear();
    setCurrentUser(() => ({ name: "", email: "", isLoggedIn: false }));
    mainApi.setToken('')
    navigate('/', { replace: true });
  };

  return (
    <>
      <Header />
      <main className="page__auth">
        <section className="profile">
          <h1 className="profile__title">Привет, {user.name}!</h1>
          <form onSubmit={handleUpdateUser} name="profile-form" className="profile__form" noValidate>

            <label className="profile__label">
              <span className='profile__input-title'>Имя</span>
              <input type="text" className="profile__input input-focus" id="input-profile-name"
                name="name"
                value={values.name || ''}
                placeholder="Введите имя"
                onChange={handleChangeInputs}
                minLength={2}
                maxLength={30}
                required
                disabled={!submitBtn}
              />
            </label>
            <span className="profile__span-error">{validateName(values.name).message}</span>

            <label className="profile__label">
              <span className='profile__input-title'>E-mail</span>
              <input type="email" className="profile__input input-focus" id="input-profile-email"
                name="email"
                value={values.email || ''}
                placeholder="E-mail"
                onChange={handleChangeInputs}
                minLength={2}
                maxLength={30}
                required
                disabled={!submitBtn}
              />
            </label>
            <span className="profile__span-error">{validateEmail(values.email).message}</span>

            {{
              success:
                <p className='profile__response-error profile__response-success'>
                  {!isValid && res.msg}
                </p>,
              error:
                <p className='profile__response-error'>
                  {!isValid && res.msg}
                </p>,
              default:
                <p className='profile__response-error' />
            }[res.type]}

            < div className="profile__button-container">
              {submitBtn ? (
                <button
                  type="submit"
                  className={`button-submit ${!isValid || validateEmail(values.email).invalid ? `button-submit_disabled` : ''}  button`}
                  disabled={
                    !isValid ||
                    (values.name === user.name &&
                      values.email === user.email) ||
                    validateEmail(values.email).invalid ||
                    validateName(values.name).invalid
                  }
                >Сохранить</button>)
                : (<button type="button" className="profile__button-edit button"
                  onClick={toggleSubmitBtn}>
                  Редактировать
                </button>
                )}

              <button onClick={handleSignOut} className="profile__button-logout link">
                Выйти из аккаунта
              </button>

            </div>
          </form>
        </section>
      </main >
    </>
  )
}

export default Profile