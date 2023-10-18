import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import useSearch from "../../hooks/useSearch";
import { useContext, useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { MOVIES_URL, SHORT_MOVIE } from "../../utils/constants";
import { WindowSizeContext } from "../../context/WindowSizeContext";
import { showMovieCards } from "../../utils/config";

function Movies({ moviesList, setMoviesList }) {
  const screenType = useContext(WindowSizeContext);
  const { search, setSearch, handleChange, handleCheckboxChange } = useSearch();
  const [sortMovies, setSortMovies] = useState([]);
  const [showCount, setShowCount] = useState(showMovieCards.desktop.initCount);
  const [isEmptyList, setIsEmptyList] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState(false);

  const [isShowMore, setIsShowMore] = useState(false);

  function updateStorages(movie) {
    setMoviesList(moviesList.map((obj) => (obj.id === movie.id) ? movie : obj))
    const localFilteredMoviesList = localStorage.getItem('filteredMoviesList');
    if (localFilteredMoviesList) {
      const newFilteredMoviesList = JSON.parse(localFilteredMoviesList).map((obj) => (obj.id === movie.id) ? movie : obj)
      setSortMovies(newFilteredMoviesList)
      localStorage.setItem('filteredMoviesList', JSON.stringify(newFilteredMoviesList))
    }
  }

  function saveMovie(movie) {
    setServerError(false)
    return mainApi.selectMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIES_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIES_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then((res) => {
        movie.saved = true
        movie.movieUID = res['_id']
        updateStorages(movie);
        return true
      })
      .catch(err => {
        setServerError(true)
        console.log(err)
        return false
      })
  }

  function deleteMovie(movie) {
    setServerError(false)
    return mainApi.deleteMyMovie(movie.movieUID)
      .then(() => {
        movie.saved = false
        updateStorages(movie);
        return true
      })
      .catch(err => {
        setServerError(true)
        console.log(err)
        return false
      })
  }

  async function handleSearchSubmit(searchMovies) {
    setServerError(false)
    if (moviesList.length === 0) {
      setIsLoading(true);
      try {
        const allMovies = await moviesApi.getMovies();
        const myMovies = await mainApi.getMyMovies();
        const result = addMoviesList(allMovies, myMovies);
        filterMovies(searchMovies, result)
        setMoviesList(result);
      } catch (err) {
        setServerError(true)
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    } else {
      filterMovies(searchMovies, moviesList);
    }
  }

  function filterMovies(searchMovies, movies) {
    setShowCount(showMovieCards[screenType].initCount);
    setSearch(searchMovies);
    localStorage.setItem('searchMovies', JSON.stringify(searchMovies))
    const filterMoviesList = movies.filter((movie) => {
      const match = movie.nameRU.toLowerCase().includes(searchMovies.text.toLowerCase())
      return searchMovies.isShort ? (movie.duration <= SHORT_MOVIE && match) : match
    })
    if (filterMoviesList.length === 0) {
      setIsEmptyList(true);
    } else {
      setIsEmptyList(false);
    }
    setSortMovies(filterMoviesList)
    localStorage.setItem('filterMoviesList', JSON.stringify(filterMoviesList))
    const isMore = showMovieCards[screenType].initCount < filterMoviesList.length
    setIsShowMore(isMore);
  }

  function addMoviesList(sourceMovies, savedMovies) {
    return sourceMovies.map((movie) => {
      const result = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)
      return (result)
        ? { ...movie, saved: true, movieUID: result['_id'] }
        : { ...movie, saved: false }
    })
  }

  const handleShowMore = () => {
    const totalMovies = sortMovies.length;
    const screenSizeConfig = showMovieCards[screenType];
    if (showCount + screenSizeConfig.moreCount < totalMovies) {
      setShowCount(showCount + screenSizeConfig.moreCount);
      setIsShowMore(true);
    } else if (showCount < totalMovies) {
      setShowCount(showCount + screenSizeConfig.moreCount);
      setIsShowMore(false);
    } else {
      setShowCount(totalMovies);
      setIsShowMore(false);
    }
  };

  useEffect(() => {
    const localSearchMovies = localStorage.getItem('searchMovies');
    const localFilterMoviesList = localStorage.getItem('filterMoviesList');
    if (localSearchMovies && localFilterMoviesList) {
      filterMovies(JSON.parse(localSearchMovies), JSON.parse(localFilterMoviesList))
    }
    setShowCount(showMovieCards[screenType].initCount);
  }, [screenType])

  return (
    <>
      <Header />
      <main className="page__main">
        <SearchForm
          onSearch={handleSearchSubmit}
          search={search}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange} />
        {sortMovies &&
          <MoviesCardList
            movieCardList={sortMovies.slice(0, showCount)}
            onMore={handleShowMore}
            isMoreButtonPresent={isShowMore}
            hasNetError={serverError}
            isNoData={isEmptyList}
            onSave={saveMovie}
            onDelete={deleteMovie}
            isLoading={isLoading}
          />}
      </main>
      <Footer />
    </>
  )
}

export default Movies