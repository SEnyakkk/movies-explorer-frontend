import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";


function Movies({ currentUser, showMyMovies, myVideoToShow, setMyVideoToShow, onCardDelete }) {
  const [serverError, setServerError] = useState('')
  const [isShort, setIsShort] = useState(false);
  const [videoAll, setVideoAll] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [videoToShow, setVideoToShow] = useState()
  // const [myVideoToShow, setMyVideoToShow] = useState()

  useEffect(() => {
    showMyMovies()
    setIsShort(localStorage.filterCheckbox === "true")
    if (localStorage.localMovies) {
      setVideoAll(JSON.parse(localStorage.localMovies))
    }
    if (localStorage.serchResult) {
      setVideoToShow(JSON.parse(localStorage.serchResult))
    }

  }, [localStorage.serchResult])

  const onSerch = (filterText) => {
    setIsLoading(true)
    if (!localStorage.getItem('localMovies')) {
      moviesApi.getMovies()
        .then((data) => {
          localStorage.setItem('localMovies', JSON.stringify(data))
          filter(data, filterText, isShort)
          setIsLoading(false)
        })
        .catch(err => {
          console.error(err)
          setServerError(`Во время запроса произошла ошибка. Возможно, проблема с
         соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`)
          setIsLoading(false)
        })
    } else {
      filter(videoAll, filterText, isShort)
      setIsLoading(false)
    }
  }

  function checkFilter() {
    if (!videoToShow) {
      return
    }
    if (isShort) {
      setIsShort(false);
      localStorage.setItem('filterCheckbox', false)
      filter(videoAll, localStorage.filterText, false)
    }
    if (!isShort) {
      setIsShort(true);
      localStorage.setItem('filterCheckbox', true)
      filter(videoAll, localStorage.filterText, true)
    }
  }

  function filter(videoAll, filterText, isShort) {

    localStorage.setItem('serchResult', JSON.stringify(videoAll.filter((video) => {
      if (!isShort) {
        const serchResult = video.nameRU.toLowerCase().includes(filterText.toLowerCase())
        return serchResult
      } else {
        const serchResult = video.nameRU.toLowerCase().includes(filterText.toLowerCase()) && video.duration <= "40"
        return serchResult
      }
    })
    ))
  }

  const onCardLike = (movieCard) => {
    const isLiked = myVideoToShow ? myVideoToShow.some(i => movieCard.id === i.movieId) : ''
    if (isLiked) {
      const card = myVideoToShow.find(i => movieCard.id === i.movieId)
      onCardDelete(card._id)
    } else {
      mainApi.addMovie(
        movieCard,
        localStorage.token
      )
      .then(data => {
        setMyVideoToShow([data, ...myVideoToShow])
        // .then((data) => {
          // setMyVideoToShow(data)
          // setMyVideoToShow([...myVideoToShow, data])
          // setMyVideoToShow(...myVideoToShow, (data) => data.filter((c) => c._id !== movieCard))
        })
        .catch(console.error);
    }
  }

  // const onCardDelete = (cardToDelete) => {
  //   mainApi.deleteMovie(cardToDelete, localStorage.token)

  //     .catch(console.error);
  // }
  // console.log(onCardDelete)

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
            videoToShow={videoToShow}
            myVideoToShow={myVideoToShow}
            setMyVideoToShow={setMyVideoToShow}
            currentUser={currentUser}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            showMyMovies={showMyMovies}
          />
        }
      </main>
      <Footer />
    </>
  )
}

export default Movies