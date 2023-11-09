import './App.css';
import '../../index.css'
import Main from '../Main/Main';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import { moviesApi } from '../../utils/MoviesApi';


function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isAppReady, setisAppReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [myVideoToShow, setMyVideoToShow] = useState()
  const [serverError, setServerError] = useState('')
  const location = useLocation()
  const path = location.pathname
  const [isShort, setIsShort] = useState(false)
  const [videoAll, setVideoAll] = useState()
  const [filterText, setFilterText] = useState('')
  const [videoToShow, setVideoToShow] = useState()

  useEffect(() => {
    tokenCheck()

  }, [])

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      setisAppReady(true)
      mainApi.getContent(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate(path)
          setCurrentUser(res)
          setisAppReady(false)
        }
      });
    }
  };

  function handleLogin() {
    setLoggedIn(true);
    navigate('/movies', { replace: true });
  }

  const signOut = () => {
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
    setVideoAll()
    setVideoToShow()
  }

  const showMyMovies = () => {
    setIsLoading(true)
    mainApi.getMyMovies()
      .then((data) => {
        setMyVideoToShow(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setServerError(`Во время запроса произошла ошибка. Возможно, проблема с
      соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`)
        setIsLoading(false)
      })
  }

  const onCardDelete = (cardToDelete) => {
    mainApi.deleteMovie(cardToDelete, localStorage.token)
      .then(() => {
        setMyVideoToShow((cards) => cards.filter((i) => i._id !== cardToDelete))
      })
      .catch(console.error);
  }

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

  return (
    isAppReady ? (<Preloader />) : (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>

            <Route path="/movies" element={<ProtectedRoute
              element={Movies}
              loggedIn={loggedIn}
              showMyMovies={showMyMovies}
              myVideoToShow={myVideoToShow}
              setMyVideoToShow={setMyVideoToShow}
              onCardDelete={onCardDelete}
              currentUser={currentUser}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              serverError={serverError}
              checkFilter={checkFilter}
              isShort={isShort}
              setIsShort={setIsShort}
              videoToShow={videoToShow}
              setVideoToShow={setVideoToShow}
              setVideoAll={setVideoAll}
              onSerch={onSerch}
              setFilterText={setFilterText}
            />}
            />

            <Route path="/saved-movies" element={<ProtectedRoute
              element={SavedMovies}
              path={"/saved-movies"}
              showMyMovies={showMyMovies}
              myVideoToShow={myVideoToShow}
              setMyVideoToShow={setMyVideoToShow}
              onCardDelete={onCardDelete}
              loggedIn={loggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              filterText={filterText}
            />}
            />

            <Route path="/profile" element={<ProtectedRoute
              element={Profile}
              path={"/profile"}
              loggedIn={loggedIn}
              signOut={signOut}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              tokenCheck={tokenCheck}
            />}
            />

            <Route path="/signup" element={
              loggedIn
                ? <Navigate to='/' replace />
                : <Register handleLogin={handleLogin} />}
            />

            <Route path="/signin" element={
              loggedIn
                ? <Navigate to='/' replace />
                : <Login handleLogin={handleLogin} />}
            />

            <Route path="/" element={<Main
              path={"/"}
              loggedIn={loggedIn} />}
            />

            <Route path="*" element={<ErrorPage />}
            />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
    ));

}

export default App;
