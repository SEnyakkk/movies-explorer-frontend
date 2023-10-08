import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import { movieCardList } from "../../utils/constants";

function Movies() {

  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm />
        <MoviesCardList
          movieCardList={movieCardList}

        />
      </main>
      <Footer />
    </>
  )
}

export default Movies