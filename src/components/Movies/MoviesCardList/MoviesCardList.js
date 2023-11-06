import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"
import { mainApi } from "../../../utils/MainApi";
import { useLocation } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";


function MoviesCardList({ videoToShow, currentUser, myVideoToShow, setMyVideoToShow, showMyMovies }) {
  // const [saved, setSaved] = useState(false)
  // const [cards, setCards] = useState([])
  const location = useLocation()

  // const [isLiked, setIsLiked] = useState()
  const [isLoading, setIsLoading] = useState(false)
  // const [myVideoToShow, setMyVideoToShow] = useState([])
  const [serverError, setServerError] = useState('')

  // const showMyMovies = () => {
  //   setIsLoading(true)
  //   mainApi.getMyMovies()
  //     .then((data) => {
  //       setMyVideoToShow(data)
  //       // console.log(data)
  //       setIsLoading(false)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       setServerError(`Во время запроса произошла ошибка. Возможно, проблема с
  //     соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`)
  //     })
  // }

  console.log(myVideoToShow)

  const cardList = (location.pathname === '/movies') ? videoToShow : myVideoToShow
  // const saved = myVideoToShow.some(card => videoToShow.id === card.movieId)

  // console.log(cards)
  // console.log(videoToShow)

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
  //         // setMyVideoToShow((cards) => cards.filter((c) => c._id !== movieCard))
  //       })
  //       .catch(console.error);
  //   }
  // }

  // function onCardDelete(cardToDelete) {
  //   mainApi.deleteMovie(cardToDelete, localStorage.token)
  //     .then(() => {
  //       setMyVideoToShow((cards) => cards.filter((c) => c._id !== cardToDelete))
  //     })
  //     .catch(console.error);
  // }

  useEffect(() => {
    // setIsLiked(myVideoToShow.some(i => movieCard.id === i.movieId))
    // console.log(myVideoToShow)
  }, [])

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      showMyMovies()
    }

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
            // saved={saved}
            // onCardLike={onCardLike}
            currentUser={currentUser}
            // onCardDelete={onCardDelete}
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