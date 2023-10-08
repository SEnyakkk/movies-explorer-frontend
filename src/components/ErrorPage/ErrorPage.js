import "./ErrorPage.css"
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <main>
      <section className='error-page'>
        <h1 className='error-page__title'>404</h1>
        <p className='error-page__subtitle'>Страница не найдена</p>
        <button type='button' className='error-page__button button'
        onClick={() => navigate(-1)}>Назад</button>
      </section>
    </main>
  )
}

export default ErrorPage