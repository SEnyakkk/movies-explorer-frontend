import "./Promo.css"
import landingPromo from "../../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <img src={landingPromo} alt="Логотип проекта" className="promo__logo" />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
    </section>
  )
}

export default Promo