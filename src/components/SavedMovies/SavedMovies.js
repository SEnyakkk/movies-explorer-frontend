import "./SavedMovies.css"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";

function SavedMovies({
  onCardDelete,
  serverError, isLoading,
  // isShort, setIsShort, checkFilter,
  showMyMovies, setMyVideoToShow, currentUser, myVideoToShow,
  setFilterText, videoToShow, setVideoToShow, setVideoAll, filterText }) {

  const [isShort, setIsShort] = useState(false)
  const [fitervideo, setFiltervideo] = useState()
  // const [isLoading, setIsLoading] = useState(false)
  // const [myVideoToShow, setMyVideoToShow] = useState()
  // const [serverError, setServerError] = useState('')

  useEffect(() => {
    showMyMovies()
    // if(myVideoToShow){onSerch(filterText)}

  }, [])

  function onSerch(filterText) {
    filter(myVideoToShow, filterText, isShort)
  }

  function filter(myVideoToShow, filterText, isShort) {
    let fitervideo = myVideoToShow
    setFiltervideo(fitervideo.filter((video) => {
      if (!isShort) {
        const serchResult = video.nameRU.toLowerCase().includes(filterText.toLowerCase())
        return serchResult
      } else {
        const serchResult = video.nameRU.toLowerCase().includes(filterText.toLowerCase()) && video.duration <= "40"
        return serchResult
      }
    }))
  }

  const checkFilter = (fitervideo) => {
    if (!fitervideo) {
      return
    }
    if (isShort) {
      setIsShort(false);
      filter(myVideoToShow, filterText, false)
    }
    if (!isShort) {
      setIsShort(true);
      filter(myVideoToShow, filterText, true)
    }
  }

  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm
          isShort={isShort}
          onSerch={onSerch}
          setFilterText={setFilterText}
          checkFilter={checkFilter}
          serverError={serverError}
        />

        {isLoading ? <Preloader /> :
          <MoviesCardList
            myVideoToShow={myVideoToShow}
            fitervideo={fitervideo}
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