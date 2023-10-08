import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
    <h2 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h2>
    <div className="footer__container">
      <p className="footer__copyright">&copy; 2023</p>
      <nav>
        <ul className="footer__links list-reset">
          <li className="footer__element">
            <Link to="https://practicum.yandex.ru" className="footer__link link"
                  target="_blank">Яндекс.Практикум</Link>
          </li>
          <li className="footer__element">
            <Link to="https://github.com/SEnyakkk" className="footer__link link" target="_blank">Github</Link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
  )
}

export default Footer