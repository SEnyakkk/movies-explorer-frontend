import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"
import Preloader from "../../Preloader/Preloader";


function MoviesCardList({ movieCardList,
  isMoreButtonPresent,
  onMore,
  hasNetError,
  isNoData,
  onSave,
  onDelete,
  isLoading }) {

  return (
    <section className="movies" aria-label="Фильмы">
      {hasNetError &&
        <p className="movies__response movies__response_type_error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Попробуйте позднее.
        </p>
      }
      {isLoading
        ? <Preloader />
        :
        <ul className="movies__list">
          {movieCardList.map(card => (<MoviesCard
            key={card['id'] || card['movieId']}
            movieCard={card}
            onSave={onSave}
            onDelete={onDelete}
          />))}
        </ul>}
      {isNoData &&
        <p className="movies__response movies__response_type_success">
          Ничего не найдено
        </p>
      }
      <div className="movies__more-button-container">
        {isMoreButtonPresent && (
          <button type="button" className="movies__more-button button"
            onClick={onMore}
          >Еще</button>)}
      </div>
    </section>
  )
}

export default MoviesCardList