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


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    isLoggedIn: !!localStorage.getItem('jwt')
  });

  // function handleRegister(values) {
  //   mainApi.registerUser(values.name, values.email, values.password)
  //     .then((res) => {
  //       handleLogin(values);
  //       console.log(values);
  //     })
  //     .catch((error) => {
  //       setIsOK(false);
  //       setServerErrors({ ...serverErrors, register: error });
  //       console.log(error);
  //     });
  // };

  // function handleLogin(values) {
  //   mainApi.loginUser(values.email, values.password)
  //     .then(({token}) => {
  //       if (token) {
  //         localStorage.setItem('jwt', token);
  //         setIsLoggedIn(true);
  //         navigate('/movies');
  //       }
  //     })
  //     .catch((error) => {
  //       setIsOK(false);
  //       // setServerErrors({ ...serverErrors, login: error });
  //       console.log(error);
  //     });
  // };

  function handleLogin(email, password) {
    return mainApi.loginUser(email, password)
      .then(({ token }) => {
        localStorage.setItem('jwt', token)
        mainApi.setToken(token)
        return mainApi.getUserInfo()
      })
      .then(({ name, email }) => {
        setCurrentUser((user) => ({ ...user, name: name, email: email, isLoggedIn: true }))
        navigate('/movies', { replace: true });
        return true
      })
  }

  function handleRegister(name, email, password) {
    return mainApi.registerUser(name, email, password)
      .then(() => handleLogin(email, password))

  }


  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.setToken(jwt);
      mainApi.getUserInfo()
        .then(({ name, email }) => {
          setCurrentUser((user) => ({ ...user, name: name, email: email, isLoggedIn: true }))
        })
        .catch((err) => console.log(err))
    }
  }, [])


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />

          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register
            onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login
            onLogin={handleLogin} />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<Profile
              setCurrentUser={setCurrentUser} />} />
          </Route>
        </Routes>
      </CurrentUserContext.Provider >
    </div >
  );
}

export default App;
