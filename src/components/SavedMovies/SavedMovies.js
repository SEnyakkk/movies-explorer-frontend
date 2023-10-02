import "./SavedMovies.css"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { movieCardList } from "../../utils/constants"

function SavedMovies() {

  const savedMoviesList = movieCardList.filter((movieCard) => movieCard.saved)

  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm />
        <MoviesCardList movieCardList={savedMoviesList} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies