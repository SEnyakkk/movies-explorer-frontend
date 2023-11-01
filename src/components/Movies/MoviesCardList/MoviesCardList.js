import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"


function MoviesCardList({ movieCardList }) {
  // console.log(movieCardList)


  return (
    <section className="movies" aria-label="Фильмы">
      <ul className="movies__list">
        {movieCardList ? movieCardList.map(card =>
          (<MoviesCard key={card.id} movieCard={card} />)) : ''}
      </ul>

      <div className="movies__more-button-container">
        {movieCardList ?
          (movieCardList.length === 0 ?
            <span className="search__form-input-error">Ничего не найдено</span>
            : <button type="button" className="movies__more-button button">Еще</button>
          )
          : ''}

      </div>
    </section>
  )
}

export default MoviesCardList