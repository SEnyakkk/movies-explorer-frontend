import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";


function Movies({ }) {

  const [videoAll, setVideoAll] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [videoToShow, setVideoToShow] = useState()

  const [isShort, setIsShort] = useState(false);
  console.log(videoToShow)




  const onSerch = (filterText) => {
    setIsLoading(true)
    if (!localStorage.getItem('localMovies')) {
      moviesApi.getMovies()
        .then((data) => {
          localStorage.setItem('localMovies', JSON.stringify(data))
          filter(data, filterText)
          setIsLoading(false)
        })
        .catch(err => console.log(err))
    } else {
      filter(videoAll, filterText)
      setIsLoading(false)

    }
  }

  function filter(videoAll, filterText) {
    localStorage.setItem('serchResult', JSON.stringify(videoAll.filter((video) => {
      const serchResult = video.nameRU.toLowerCase().includes(filterText.toLowerCase())
      return serchResult
    })
    ))
  }

  useEffect(() => {
    if (localStorage.localMovies) {
      setVideoAll(JSON.parse(localStorage.localMovies))
    }
    if (localStorage.serchResult) {
      setVideoToShow(JSON.parse(localStorage.serchResult))
    }

  }, [localStorage.serchResult])


  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm
          onSerch={onSerch}
          setFilterText={setFilterText}
          isShort={isShort} />
        {isLoading ? <Preloader /> :
          <MoviesCardList
            movieCardList={videoToShow}
            isShort={isShort}

          />
        }
      </main>
      <Footer />
    </>
  )
}

export default Movies