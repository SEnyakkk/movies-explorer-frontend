import { useLocation } from "react-router-dom";
import "./MoviesCard.css"
import { mainApi } from "../../../utils/MainApi";
import { useState } from "react";
import { Link } from "react-router-dom";

function MoviesCard({ movieCard }) {
  const location = useLocation();
  const myMovies = location.pathname === '/saved-movies'
  const srcImage = myMovies ? movieCard.image : `${`https://api.nomoreparties.co`}${movieCard.image.url}`;
  const [cards, setCards] = useState([])

  function durationHours(duration) {
    const m = duration % 60;
    const h = (duration - m) / 60;
    return h.toString() + "ч" + (m < 10 ? "0" : "") + m.toString() + "м";
  }

    // country,
    // director,
    // duration,
    // year,
    // description,
    // image,
    // trailerLink,
    // thumbnail,
    // movieId,
    // nameRU,
    // nameEN


  function handleMovieLike(card) {
    const isLiked = cards.some(i => card.id === i.movieId);

    if (!isLiked) {
      mainApi.addMovie(card, localStorage.token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    } else {
      mainApi.deleteMovie(card._id, localStorage.token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    }
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        {/* <Link to={movieCard.trailerLink} target='_blank'> */}
          <img src={srcImage} alt={movieCard.nameRU} className="movies-card__image" />
        {/* </Link > */}
        <div className="movies-card__info">
          <div>
            <h2 className="movies-card__title">{movieCard.nameRU}</h2>
            <p className="movies-card__duration">{durationHours(movieCard.duration)}</p>
          </div>
          <div className="movies-card__checkbox">
            {location.pathname === '/saved-movies' &&
              <button type="button" className="movies-card__button-delete button" />}
            {location.pathname === '/movies' &&
              <>{movieCard.saved
                ?
                <button type="button" className="movies-card__save-button movies-card__save-button_saved button"
                onClick={handleMovieLike}
                ></button>
                :
                <button type="button" className="movies-card__save-button button"
                  onClick={handleMovieLike}
                ></button>}
              </>
            }
          </div>
        </div>
      </div>
    </li>
  )
}

export default MoviesCard