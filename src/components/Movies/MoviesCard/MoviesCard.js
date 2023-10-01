import { useLocation } from "react-router-dom";
import "./MoviesCard.css"

function MoviesCard({ movieCard }) {
  const location = useLocation();

  //выбор отрисовки кнопки
  function getButtonType() {
    if (location.pathname === '/saved-movies') {
      return "delete"
    }
    if (movieCard.saved) {
      return "saved"
    }
    return "enable"
  }

  const buttonType = getButtonType();

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <img src={movieCard.image} alt={movieCard.nameRu} className="movies-card__image" />
        <div className="movies-card__info">
          <div>
            <h2 className="movies-card__title">{movieCard.nameRu}</h2>
            <p className="movies-card__duration">{movieCard.duration}</p>
          </div>
          <div className="movies-card__checkbox">{
            {
              delete: <button type="button" className="movies-card__button-delete button" />,
              saved: <button type="button" className="movies-card__save-button movies-card__save-button_saved button"></button>,
              enable: <button type="button" className="movies-card__save-button button"></button>
            }[buttonType]
          }
          </div>
        </div>
      </div>
    </li>
  )
}

export default MoviesCard