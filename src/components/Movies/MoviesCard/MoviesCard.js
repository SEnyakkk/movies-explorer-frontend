import { useLocation } from "react-router-dom";
import "./MoviesCard.css"
import { mainApi } from "../../../utils/MainApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../../context/CurrentUserContext";

function MoviesCard({ movieCard, currentUser,
  onCardDelete, onCardLike,
  myVideoToShow, setMyVideoToShow }) {
  const location = useLocation();

  const srcImage = location.pathname === '/saved-movies' ? movieCard.image : `${`https://api.nomoreparties.co`}${movieCard.image.url}`

  // const [isLiked, setIsLiked] = useState()
  const isLiked = myVideoToShow ? myVideoToShow.some(i => movieCard.id === i.movieId) : ''
  const saveButtonClass = `movies-card__save-button ${isLiked ? `movies-card__save-button_saved` : ''} button`
  // const [card, setCard] = useState([])


  // console.log()
  // console.log(movieCard)
  console.log(myVideoToShow)

  const handleDeleteCard = () => onCardDelete(movieCard._id)

  const handleMovieLike = () => {
    if (isLiked) {
      let card = myVideoToShow.find(i => movieCard.id === i.movieId)
      onCardDelete(card._id)
    } else {
      onCardLike(movieCard)
    }
  }


  // useEffect(() => {
  //   setIsLiked(myVideoToShow.some(i => movieCard.id === i.movieId))
  //   console.log(myVideoToShow)

  // }, [myVideoToShow])


  // console.log(card)

  function durationHours(duration) {
    const m = duration % 60;
    const h = (duration - m) / 60;
    return h.toString() + "ч" + (m < 10 ? "0" : "") + m.toString() + "м";
  }

  // const onCardLike = (movieCard) => {
  //   // let isLiked = myVideoToShow.some(i => movieCard.id === i.movieId)
  //   if (isLiked) {
  //     let card = myVideoToShow.find(i => movieCard.id === i.movieId)
  //     console.log(card)
  //     onCardDelete(card._id)
  //   } else {
  //     mainApi.addMovie(
  //       movieCard,
  //       localStorage.token
  //     )
  //       .then((data) => {
  //         // setMyVideoToShow(data)
  //       })
  //       .catch(console.error);
  //   }
  // }

  // const onCardDelete = (cardToDelete) => {
  //   mainApi.deleteMovie(cardToDelete, localStorage.token)

  //     .catch(console.error);
  // }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <Link to={movieCard.trailerLink} target='_blank'>
          <img src={srcImage} alt={movieCard.nameRU} className="movies-card__image" />
        </Link >
        <div className="movies-card__info">
          <div>
            <h2 className="movies-card__title">{movieCard.nameRU}</h2>
            <p className="movies-card__duration">{durationHours(movieCard.duration)}</p>
          </div>
          <div className="movies-card__checkbox">

            {location.pathname === '/saved-movies' &&
              <button type="button"
                className="movies-card__button-delete button"
                onClick={handleDeleteCard} />}

            {location.pathname === '/movies' &&
              <button type="button"
                className={saveButtonClass}
                onClick={handleMovieLike} />}

          </div>
        </div>
      </div>
    </li >
  )
}

export default MoviesCard