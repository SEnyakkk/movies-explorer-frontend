import "./SavedMovies.css"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react";

function SavedMovies({ showMyMovies, myVideoToShow, setMyVideoToShow, onCardDelete, isLoading }) {

  useEffect(() => {
    showMyMovies()
  }, [])



  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm
          // isShort={isShort}
          // onSerch={onSerch}
        />

        {isLoading ? <Preloader /> :
          <MoviesCardList
            myVideoToShow={myVideoToShow}
            setMyVideoToShow={setMyVideoToShow}
            showMyMovies={showMyMovies}
            onCardDelete={onCardDelete}
            isLoading={isLoading}

          />
        }
      </main>
      <Footer />
    </>
  )
}


export default SavedMovies