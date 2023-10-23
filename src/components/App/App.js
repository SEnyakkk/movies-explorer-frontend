import './App.css';
import '../../index.css'
import Main from '../Main/Main';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import { useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const handleLogin = (data) => {
    setLoggedIn(true);
    setCurrentUser(data);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>

          <Route path="/movies" element={<ProtectedRoute
            element={Movies}
            loggedIn={loggedIn} />} />
          <Route path="/saved-movies" element={<ProtectedRoute
            element={SavedMovies}
            loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRoute
            element={Profile}
            loggedIn={loggedIn} />} />

          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
