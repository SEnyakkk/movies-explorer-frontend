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

function App() {


  return (
    <div className="page">
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
