import './App.css';
import '../../index.css'
import Main from '../Main/Main';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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


function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isAppReady, setisAppReady] = useState(false)
  const location = useLocation()
  const path = location.pathname
  // console.log(loggedIn)

  useEffect(() => {
    tokenCheck();
  }, [localStorage.token])

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
  }

  return (
    isAppReady ? (<Preloader />) : (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>

            <Route path="/movies" element={<ProtectedRoute
              element={Movies}
              loggedIn={loggedIn}
            />}
            />

            <Route path="/saved-movies" element={<ProtectedRoute
              element={SavedMovies}
              path={"/saved-movies"}
              loggedIn={loggedIn} />}
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

            <Route path="/signup" element={<Register handleLogin={handleLogin} />}
            />

            <Route path="/signin" element={<Login handleLogin={handleLogin} />}
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
