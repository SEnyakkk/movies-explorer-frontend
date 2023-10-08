import { Link } from "react-router-dom"
import "./AboutMe.css"
import aboutmePhoto from "../../../images/aboutmePhoto.png"

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="page__section-title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__container">
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
            Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как
            прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами и&nbsp;ушёл с&nbsp;постоянной
            работы.</p>
          <Link to="https://github.com/SEnyakkk" className="about-me__link link"
            target="_blank">Github</Link>
        </div>
        <img className="about-me__photo" src={aboutmePhoto} alt="Фото студента" />
      </div>
    </section>
  )
}

export default AboutMe