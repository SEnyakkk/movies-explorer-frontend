import './App.css';
import '../../index.css'
import Main from '../Main/Main';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import { useEffect, useState } from 'react';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../context/CurrentUserContext';
import useWindowSize from '../../hooks/useWindowSize';
import { WindowSizeContext } from '../../context/WindowSizeContext';

function App() {
  const [moviesList, setMoviesList] = useState([])
  const screenType = useWindowSize();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    isLoggedIn: !!localStorage.getItem('jwt')
  });

  function handleLogin(email, password) {
    return mainApi.loginUser(email, password)
      .then(({ token }) => {
        localStorage.setItem('jwt', token)
        mainApi.setToken(token)
        return mainApi.getUserInfo()
      })
      .then(({ name, email }) => {
        setCurrentUser((user) => ({
          ...user,
          name: name,
          email: email,
          isLoggedIn: true
        }))
        navigate('/movies', { replace: true });
        return true
      })
  }

  function handleRegister(name, email, password) {
    return mainApi.registerUser(name, email, password)
      .then(() => handleLogin(email, password))
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.setToken(jwt);
      mainApi.getUserInfo()
        .then(({ name, email }) => {
          setCurrentUser((user) => ({
            ...user,
            name: name,
            email: email,
            isLoggedIn: true
          }))
        })
        .catch((error) => console.log(error))
    }
  }, [])


  return (
    <div className="page">
      <WindowSizeContext.Provider value={screenType}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="*" element={<ErrorPage />} />

            <Route path="/" element={<Main />} />

            <Route path="/signup"
              element={<Register onRegister={handleRegister} />} />

            <Route path="/signin"
              element={<Login onLogin={handleLogin} />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/movies"
                element={<Movies moviesList={moviesList} setMoviesList={setMoviesList} />} />
              <Route path="/saved-movies" element={<SavedMovies />} />
              <Route path="/profile"
                element={<Profile setCurrentUser={setCurrentUser} />} />
            </Route>
          </Routes>
        </CurrentUserContext.Provider>
      </WindowSizeContext.Provider>
    </div >
  );
}

export default App;
