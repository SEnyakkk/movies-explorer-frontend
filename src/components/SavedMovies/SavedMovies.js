import "./SavedMovies.css"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

function SavedMovies({isLoading}) {
  // const [isLoading, setIsLoading] = useState(false)
  // const [myVideoToShow, setMyVideoToShow] = useState()
  // const [serverError, setServerError] = useState('')

  // useEffect(() => {
  //   showMyMovies()

  // }, [])

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

        {isLoading ? <Preloader /> :
          <MoviesCardList
            // myVideoToShow={myVideoToShow}
            // serverError={serverError}
          />
        }
      </main>
      <Footer />
    </>
  )
}


export default SavedMovies