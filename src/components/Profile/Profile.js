import "./Profile.css"
import Header from "../Header/Header";


function Profile() {

  return (
    <>
      <Header />
      <main className="page__auth">
        <section className="profile">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form name="profile-form" className="profile__form">
            <label className="profile__label">
              <span className='profile__input-title'>Имя</span>
              <input type="text" name="profileName" id="input-profile-name" className="profile__input input-focus" placeholder="" required />
            </label>
            <span className="profile__span-error"></span>
            <label className="profile__label">
              <span className='profile__input-title'>E-mail</span>
              <input type="email" name="profileEmail" id="input-profile-email" className="profile__input input-focus" placeholder="" required />
            </label>
            <span className="profile__span-error">что-то пошло не так...</span>
            <p className='profile__response-error'>
              При обновлении профиля произошла ошибка.
            </p>
            <div className="profile__button-container">
              <button type="submit" className="button-submit button-submit_disabled button">
                Сохранить
              </button>
              <>
                <button type="button" className="profile__button-edit button" >
                  Редактировать
                </button>
                <button type="button" className="profile__button-logout button" >
                  Выйти из аккаунта
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