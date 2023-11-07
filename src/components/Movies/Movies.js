import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";


function Movies({ currentUser, showMyMovies, myVideoToShow, setMyVideoToShow,
  onCardDelete, isLoading, serverError, checkFilter, isShort, setIsShort,
  setFilterText, videoToShow, setVideoToShow, setVideoAll, onSerch,
}) {
console.log()
  const [isLiked, setIsLiked] = useState()
  const [cardToDelete, setCardToDelet] = useState()

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

  const onCardLike = (movieCard) => {
    setIsLiked(myVideoToShow.some(i => movieCard.id === i.movieId))
    if (isLiked) {
      setCardToDelet(myVideoToShow.find(i => movieCard.id === i.movieId))
      onCardDelete(cardToDelete._id)
    } else {
      mainApi.addMovie(
        movieCard,
        localStorage.token
      )
        .then(data => {
          setMyVideoToShow([data, ...myVideoToShow])
        })
        .catch(console.error);
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
            videoToShow={videoToShow}
            myVideoToShow={myVideoToShow}
            setMyVideoToShow={setMyVideoToShow}
            currentUser={currentUser}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            showMyMovies={showMyMovies}
            isLoading={isLoading}

          />
        }
      </main>
      <Footer />
    </>
  )
}

export default Movies