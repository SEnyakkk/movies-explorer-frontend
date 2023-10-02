import './App.css';
import '../../index.css'
import Main from '../Main/Main';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {


  return (
    <div className="page">
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/signup" element={<Register name={'signup'}/>} />
        <Route path="/signin" element={<Login name={'signin'}/>} />
      </Routes>
    </div>
  );
}

export default App;
