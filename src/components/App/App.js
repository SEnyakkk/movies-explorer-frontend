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
import { mainApi } from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOK, setIsOK] = useState(false);
  const [serverErrors, setServerErrors] = useState({
    login: {},
    register: {},
    profile: {},
    movies: {}
  });

  useEffect(() => {
    setServerErrors({
      login: {},
      register: {},
      profile: {}
    });
  }, [location]);

  const handleRegister = (values) => {
    mainApi.registerUser(values.name, values.email, values.password)
      .then((res) => {

        handleLogin(values);
        console.log(values);
      })
      .catch((error) => {
        setIsOK(false);
        setServerErrors({ ...serverErrors, register: error });
        console.log(error);
      });
  };

  const handleLogin = (values) => {
    mainApi.loginUser(values.email, values.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((error) => {
        setIsOK(false);
        setServerErrors({ ...serverErrors, login: error });
        console.log(error);
      });
  };


  return (
    <div className="page">
      <Routes>
        <Route path="*" element={<ErrorPage />} />

        <Route path="/" element={<Main />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/saved-movies" element={<SavedMovies />} />

        <Route path="/signup" element={<Register
          onRegister={handleRegister}
          isLoggedIn={isLoggedIn}
          serverErrors={serverErrors} />} />

        <Route path="/signin" element={<Login
          onLogin={handleLogin}
          isLoggedIn={isLoggedIn}
          serverErrors={serverErrors} />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
