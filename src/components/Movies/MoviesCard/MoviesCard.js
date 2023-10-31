import { useLocation } from "react-router-dom";
import "./MoviesCard.css"

function MoviesCard({ movieCard }) {
  const location = useLocation();
  const myMovies = location.pathname === '/saved-movies'
  const srcImage = myMovies ? movieCard.image : `${`https://api.nomoreparties.co`}${movieCard.image.url}`;


  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <img src={srcImage} alt={movieCard.nameRU} className="movies-card__image" />
        <div className="movies-card__info">
          <div>
            <h2 className="movies-card__title">{movieCard.nameRU}</h2>
            <p className="movies-card__duration">{movieCard.duration}</p>
          </div>
          <div className="movies-card__checkbox">
            {location.pathname === '/saved-movies' &&
              <button type="button" className="movies-card__button-delete button" />}
            {location.pathname === '/movies' &&
              <>{movieCard.saved
                ?
                <button type="button" className="movies-card__save-button movies-card__save-button_saved button"></button>
                :
                <button type="button" className="movies-card__save-button button"></button>}
              </>
            }
          </div>
        </div>
      </div>
    </li>
  )
}

export default MoviesCard