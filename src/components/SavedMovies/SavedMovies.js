import "./SavedMovies.css"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";
import { useEffect, useState } from "react";

function SavedMovies({showMyMovies, myVideoToShow, setMyVideoToShow, onCardDelete}) {
  // const [isLoading, setIsLoading] = useState(false)
  // const [myVideoToShow, setMyVideoToShow] = useState()
  // const [serverError, setServerError] = useState('')

  useEffect(() => {
    showMyMovies()

  }, [])

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

  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm
          // serverError={serverError}
        />


          <MoviesCardList
            myVideoToShow={myVideoToShow}
            setMyVideoToShow={setMyVideoToShow}
            showMyMovies={showMyMovies}
            onCardDelete={onCardDelete}
            // serverError={serverError}
          />

      </main>
      <Footer />
    </>
  )
}


export default SavedMovies