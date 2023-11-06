import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"
import { mainApi } from "../../../utils/MainApi";
import { useLocation } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";


function MoviesCardList({ onCardDelete, onCardLike, videoToShow, currentUser, myVideoToShow, setMyVideoToShow, showMyMovies }) {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  // console.log(myVideoToShow)

  const cardList = (location.pathname === '/movies') ? videoToShow : myVideoToShow

  // function onCardLike(movieCard) {
  //   const isLiked = myVideoToShow.some(card => movieCard.id === card.movieId)
  //   console.log(isLiked)
  //   const seachMycard = myVideoToShow.filter((card) => {
  //     return card.movieId === movieCard.id
  //   })
  //   console.log(seachMycard)
  //   if (isLiked) {
  //     onCardDelete(seachMycard[0]._id)
  //   } else {
  //     mainApi.addMovie(
  //       movieCard,
  //       localStorage.token
  //     )
  //       .then((newCard) => {
  //         // setMyVideoToShow(...myVideoToShow, newCard)
  //       })
  //       .catch(console.error);
  //   }
  // }

  // function onCardDelete(cardToDelete) {
  //   mainApi.deleteMovie(cardToDelete, localStorage.token)
      // .then(() => {
      //   setMyVideoToShow((cards) => cards.filter((i) => i._id !== cardToDelete))
  //     })
  //     .catch(console.error);
  // }

  useEffect(() => {
    // if (location.pathname === '/saved-movies') {
      // showMyMovies()
    // }

  }, [])

  return (
    isLoading ? <Preloader /> :
      <section className="movies" aria-label="Фильмы">

        <ul className="movies__list">
          {cardList ? cardList.map(card =>
          (<MoviesCard
            key={
              location.pathname === '/movies'
                ? card.id
                : card._id
            }
            movieCard={card}
            onCardLike={onCardLike}
            currentUser={currentUser}
            onCardDelete={onCardDelete}
            myVideoToShow={myVideoToShow}
            setMyVideoToShow={setMyVideoToShow}

          />)) : ''}
        </ul>

        <div className="movies__more-button-container">
          {cardList ?
            (cardList.length === 0 ?
              <span className="search__form-input-error">{location.pathname === '/movies' ? 'Ничего не найдено' : 'Нет сохраненных видео'}</span>
              : <button type="button" className="movies__more-button button">Еще</button>
            )
            : ''}

        </div>
      </section>
  )
}

export default MoviesCardList