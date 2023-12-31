import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"


function MoviesCardList({ movieCardList, isMoreButtonPresent, onMore }) {

  return (
    <section className="movies" aria-label="Фильмы">
      <ul className="movies__list">
        {movieCardList.map(card => (<MoviesCard key={card['id']} movieCard={card} />))}
      </ul>
      <div className="movies__more-button-container">
        <button type="button"
          className="movies__more-button button">Еще</button>
      </div>
    </section>
  )
}

export default MoviesCardList