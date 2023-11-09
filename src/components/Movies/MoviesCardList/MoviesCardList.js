import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"
import { useLocation } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";
import { useEffect, useState } from "react";


function MoviesCardList({ onCardDelete, onCardLike, videoToShow, currentUser, myVideoToShow, isLoading, fitervideo }) {
  const location = useLocation()
  const [sliceEnd, SetSliceEnd] = useState('')
  const cardList = ((location.pathname === '/movies' && videoToShow)
    ? videoToShow.slice(0, sliceEnd)
    : (location.pathname === '/saved-movies' && myVideoToShow) ? (fitervideo ? fitervideo : myVideoToShow) : '')

  function renderCards() {
    const config = { show: 16, more: 4 }
    if (window.innerWidth < 1280) {
      config.show = 12
      config.more = 3
    }
    if (window.innerWidth < 1135) {
      config.show = 8
      config.more = 2
    }
    if (window.innerWidth < 619) {
      config.show = 5
      config.more = 2
    }
    return config
  }

  function showMore() {
    SetSliceEnd(sliceEnd + renderCards().more)
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      function resizeRender() {
        if (window.innerWidth >= 1280) {
          SetSliceEnd(renderCards().show)
        }
        if (window.innerWidth < 1280) {
          SetSliceEnd(renderCards().show)
        }
        if (window.innerWidth < 1135) {
          SetSliceEnd(renderCards().show)
        }
        if (window.innerWidth < 619) {
          SetSliceEnd(renderCards().show)
        }
      }

      SetSliceEnd(renderCards().show)

      window.addEventListener('resize', () => {
        setTimeout(resizeRender, 1000)
      })
      return () => window.removeEventListener('resize', () => {
        setTimeout(resizeRender, 1000)
      })
    }
  }, [location])

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
              : (location.pathname === '/movies' && sliceEnd < videoToShow.length
                ?
                <button
                  onClick={showMore}
                  type="button"
                  className="movies__more-button button">Еще</button>
                : ''))
            : ''}

        </div>
      </section>
  )
}

export default MoviesCardList