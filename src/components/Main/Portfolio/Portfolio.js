import { Link } from "react-router-dom"
import "./Portfolio.css"

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list list-reset">
        <li className='portfolio__element'>
          <Link to={'https://SEnyakkk.github.io/how-to-learn/'} target='_blank' className='portfolio__link link'>
            <p className='portfolio__subtitle'>Статичный сайт</p>
            <span className="portfolio__button">↗</span>
          </Link>
        </li>
        <li className='portfolio__element'>
          <Link to={'https://SEnyakkk.github.io/russian-travel/'} target='_blank' className='portfolio__link link'>
            <p className='portfolio__subtitle'>Адаптивный сайт</p>
            <span className="portfolio__button">↗</span>
          </Link>
        </li>
        <li className='portfolio__element'>
          <Link to={'https://SEnyakkk.github.io/react-mesto-auth/'} target='_blank' className='portfolio__link link portfolio__link_type_last'>
            <p className='portfolio__subtitle'>Одностраничное приложение</p>
            <span className="portfolio__button">↗</span>
          </Link>
        </li>

      </ul>
    </section>
  )
}

export default Portfolio