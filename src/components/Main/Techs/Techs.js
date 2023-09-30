import "./Techs.css"

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="page__section-title page__section-title_type_techs">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__subtitle">На курсе веб&#8209;разработки мы&nbsp;освоили технологии, которые применили
        в дипломном&nbsp;проекте.</p>
      <ul className="techs__list list-reset">
        <li className="techs__element">HTML</li>
        <li className="techs__element">CSS</li>
        <li className="techs__element">JS</li>
        <li className="techs__element">React</li>
        <li className="techs__element">Git</li>
        <li className="techs__element">Express.js</li>
        <li className="techs__element">mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs