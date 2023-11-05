import { useLocation } from "react-router-dom";
import "./MoviesCard.css"
import { mainApi } from "../../../utils/MainApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../../context/CurrentUserContext";

function MoviesCard({ movieCard, currentUser, onCardDelete, onCardLike, saved }) {
  const location = useLocation();

   const srcImage = location.pathname === '/saved-movies' ? movieCard.image : `${`https://api.nomoreparties.co`}${movieCard.image.url}`
  const [likedMovies, setLikedMovies] = useState([])

  const saveButtonClass = `movies-card__save-button ${saved ? `movies-card__save-button_saved` : ''} button`
  const [cards, setCards] = useState([])


  // console.log(likedMovies)
  // console.log(movieCard)
  // console.log(currentUser)

  const handleDeleteCard = () => onCardDelete(movieCard._id)
  const handleMovieLike = () => onCardLike(movieCard)

  useEffect(() => {
    // if (movieCard.owner)
    //   setSaved(true)
    // setLikedMovies(mainApi.getMyMovies(localStorage.token))
    // setSaved(likedMovies.some(i => movieCard.id === i.movieId))
  }, [])

  function durationHours(duration) {
    const m = duration % 60;
    const h = (duration - m) / 60;
    return h.toString() + "ч" + (m < 10 ? "0" : "") + m.toString() + "м";
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
              <button type="button" className="movies-card__button-delete button" onClick={handleDeleteCard} />}
            {location.pathname === '/movies' &&
              <button type="button" className={saveButtonClass}
                onClick={handleMovieLike}
              ></button>
            }
          </div>
        </div>
      </div>
    </li >
  )
}

export default MoviesCard