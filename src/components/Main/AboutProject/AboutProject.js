import "./AboutProject.css"

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="page__section-title">О проекте</h2>
      <ul className="about-project__list list-reset">
        <li className="about-project__element">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.</p>
        </li>
        <li className="about-project__element">
          <h3 className="about-project__title">На&nbsp;выполнение диплома ушло 5 недель</h3>
          <p className="about-project__subtitle">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="about-project__time-list list-reset">
        <li className="about-project__time-element">
          <h3 className="about-project__time-title about-project__time-title_blue">1&nbsp;неделя</h3>
          <p className="about-project__time-subtitle">Back-end</p>
        </li>
        <li className="about-project__time-element">
          <h3 className="about-project__time-title about-project__time-title_grey">4&nbsp;недели</h3>
          <p className="about-project__time-subtitle">Front-end</p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject