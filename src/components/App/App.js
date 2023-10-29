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


function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const location = useLocation()
  const path = location.pathname
  // console.log(loggedIn)

  useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getContent(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate(path)
          setCurrentUser(res)
        }
      });
    }
  };

  // function handleProfileSubmit(name, email) {
  //   mainApi.editProfile(name, email)
  //     .then((res) => {
  //       setCurrentUser({ name: res.name, email: res.email });
  //       // if (!res.ok) {
  //       //   return res.json().then((evt) => setErrorMsg(Object.values(evt).toString()))
  //       // } else {
  //       return res.json()
  //     }
  //     )
  // }

  function handleLogin() {
    setLoggedIn(true);
    navigate('/movies', { replace: true });
  }

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>

          <Route path="/movies" element={<ProtectedRoute
            element={Movies}
            loggedIn={loggedIn} />}
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
          // handleProfileSubmit={handleProfileSubmit}
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
  );
}

export default App;
