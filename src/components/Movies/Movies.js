import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";


function Movies({ }) {
  const [searchError, setSerchError] = useState('')
  const [isShort, setIsShort] = useState(false);
  const [videoAll, setVideoAll] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [videoToShow, setVideoToShow] = useState()

  console.log(searchError)
  // serchResult.length===0 setSerchError('Ничего не найдено')

  useEffect(() => {

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
        .catch(err => console.log(err))
    } else {
      filter(videoAll, filterText, isShort)
      setIsLoading(false)
    }
  }

  function checkFilter() {
    if (!videoToShow) {
      // setSerchError('Ничего не найдено')
      return
    }
    if (isShort) {
      setIsShort(false);
      localStorage.setItem('filterCheckbox', false)
      filter(videoAll, filterText, false)
    }
    if (!isShort) {
      setIsShort(true);
      localStorage.setItem('filterCheckbox', true)
      filter(videoAll, filterText, true)
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


  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm
          isShort={isShort}
          onSerch={onSerch}
          setFilterText={setFilterText}
          checkFilter={checkFilter}
        />

        {searchError ?
          <span className="search__form-input-error">{searchError}</span> : ''}

        {isLoading ? <Preloader /> :
          <MoviesCardList
            movieCardList={videoToShow}

          />
        }
      </main>
      <Footer />
    </>
  )
}

export default Movies