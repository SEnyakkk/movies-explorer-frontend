import "./SavedMovies.css"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { movieCardList } from "../../utils/constants"
import { useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";

function SavedMovies() {

  // const [movieCardList, setMovieCardList] = useState()


  // const onSerch = (evt) => {
  //   evt.preventDefault();
  //   if (!localStorage.getItem('localMovies')) {
  //     moviesApi.getMovies()
  //       .then((data) => {
  //         const video =  localStorage.setItem('localMovies', JSON.stringify(data))

  //         setMovieCardList(video)

  //       })

  //       .catch(err => console.log(err))
  //   } else { }

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