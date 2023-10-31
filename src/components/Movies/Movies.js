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

  const [videoToShow, setVideoToShow] = useState()
  const [filterText, setFilterText] = useState('b');
  const [isShort, setIsShort] = useState(false);
  console.log(videoToShow)




  const onSerch = (evt) => {
    evt.preventDefault();
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
    localStorage.setItem('serchresult', JSON.stringify(videoAll.filter((video) => {
      const serchresult = video.nameRU.toLowerCase().includes(filterText.toLowerCase())
      return serchresult
    })
    ))
  }

  useEffect(() => {
    if (localStorage.localMovies) {
      setVideoAll(JSON.parse(localStorage.localMovies))
    }
    if (localStorage.serchresult) {
      setVideoToShow(JSON.parse(localStorage.serchresult))
    }

  }, [localStorage.serchresult])


  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm
          onSerch={onSerch}
          filterText={filterText}
          isShort={isShort} />
        {isLoading ? <Preloader /> :
          <MoviesCardList
            movieCardList={videoToShow}
            filterText={filterText}
            isShort={isShort}

          />
        }
      </main>
      <Footer />
    </>
  )
}

export default Movies