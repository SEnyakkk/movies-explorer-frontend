import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"
import { useLocation } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";


function MoviesCardList({ onCardDelete, onCardLike, videoToShow, currentUser, myVideoToShow, setMyVideoToShow, isLoading, fitervideo }) {
  const location = useLocation()
  const cardList = (location.pathname === '/movies') ? videoToShow : (fitervideo ? fitervideo : myVideoToShow)

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
            isLoading={isLoading}
          />)) : ''}
        </ul>

        <div className="movies__more-button-container">
          {cardList
            ?
            (cardList.length === 0
              ?
              <span className="search__form-input-error">{location.pathname === '/movies'
                ? 'Ничего не найдено'
                : 'Нет сохраненных видео'}</span>
              : (location.pathname === '/movies'
                ?
                <button type="button" className="movies__more-button button">Еще</button>
                : ''))
            : ''}

        </div>
      </section>
  )
}

export default MoviesCardList