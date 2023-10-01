import './App.css';
import '../../index.css'
import Main from '../Main/Mail';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies';

function App() {


  return (
    <div className="page">
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies/>}/>

      </Routes>
    </div>
  );
}

export default App;
