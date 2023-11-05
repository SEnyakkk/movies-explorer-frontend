import "./Profile.css"
import Header from "../Header/Header";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";


function Profile({ signOut, currentUser, setCurrentUser, tokenCheck }) {
  const { values, handleChange, errors, isValid, setValues, errorMsg, setErrorMsg, setIsValid } = useFormWithValidation();
  // console.log(currentUser)
  const [isEdit, setIsEdit] = useState()

  // useEffect(() => {
  //   tokenCheck();
  // }, [])

  function toggleEdit() {
    setIsEdit(edit => !edit);
  }

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
      _id: currentUser._id
    });
  }, [setValues, currentUser.email, currentUser.name]);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsValid(false);
    }
  }, [setIsValid, values.name, values.email])

  function handleSubmit(evt) {
    evt.preventDefault();
    mainApi.editProfile(values)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
        setIsValid(false)
        toggleEdit()
        setErrorMsg('Данные обновлены успешно!')
      })
      .catch((err) => {
        if (err.includes(409)) {
          setErrorMsg("Пользователь с таким email уже существует.");
        } else if (err.includes(400)) {
          setErrorMsg("Проверьте введенные данные");
        } else if (err.includes(401)) {
          setErrorMsg("Ошибка авторизации");
        } else if (err.includes(500)) {
          setErrorMsg("На сервере произошла ошибка.");
        } else {
          setErrorMsg("При редактировании данных пользователя произошла ошибка.");
        }
      })

  }


  return (
    <>
      <Header />
      <main className="page__auth">
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form onSubmit={handleSubmit} name="profile-form" className="profile__form">
            <label className="profile__label">
              <span className='profile__input-title'>Имя</span>
              <input type="text"

                value={values.name || ''}
                onChange={handleChange}
                disabled={!isEdit}
                pattern="^[а-яА-ЯёЁa-zA-Z\-]+$"
                name="name"
                id="input-profile-name"
                className="profile__input input-focus"
                placeholder="ведите имя"
                required minLength={2}
                maxLength={30}
              />

            </label>
            <span className="profile__span-error">{errors.name}</span>

            <label className="profile__label">
              <span className='profile__input-title'>E-mail</span>
              <input type="email"
                value={values.email || ''}
                onChange={handleChange}
                disabled={!isEdit}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+[^@\s]+"
                name="email"
                id="input-profile-email"
                className="profile__input input-focus"
                placeholder="введите E-mail"
                required minLength={2}
                maxLength={30} />
            </label>
            <span className="profile__span-error">{errors.email}</span>

            <p className='profile__response-error'>
              {errorMsg}
            </p>
            <div className="profile__button-container">
              {isEdit ? <button type="submit"
                className={`button-submit ${!isValid || errorMsg ? 'button-submit_disabled' : ''} button`}
                disabled={!isValid || errorMsg}>
                Сохранить
              </button> : ''}

              <>
                <button type="button"
                  className="profile__button-edit button"
                  onClick={toggleEdit}
                >
                  {!isEdit ? `Редактировать` : ''}
                </button>

                <button type="button" onClick={signOut} className="profile__button-logout link" >
                  {!isEdit ? `Выйти из аккаунта` : ''}
                </button>
              </>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default Profile