import { useLocation } from "react-router-dom";
import "./MoviesCard.css"
import { useState } from "react";
import { MOVIES_URL } from "../../../utils/constants";
import { convertedDuration } from "../../../utils/utils";


function MoviesCard({ movieCard, onSave, onDelete }) {
  const location = useLocation();
  const [type, setType] = useState(getButtonType());
  const srcImage = type === "delete" ? movieCard.image : `${MOVIES_URL}${movieCard.image.url}`;
  const duration = convertedDuration(movieCard.duration);

  async function handleSave() {
    await onSave(movieCard) && setType('saved');
  }

  async function handleDelete() {
    await onDelete(movieCard) && setType('default');
  }

  function handleDeleteMy() {
    onDelete(movieCard)
  }

  function getButtonType() {
    if (location.pathname === '/saved-movies') {
      return "delete"
    }
    if (movieCard.saved) {
      return "saved"
    }
    return "default"
  }

  function openLink() {
    window.open(movieCard.trailerLink, "_blank", "noreferrer");
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <img src={srcImage} alt={movieCard.nameRu} className="movies-card__image" onClick={openLink} />
        <div className="movies-card__info">
          <div>
            <h2 className="movies-card__title">{movieCard.nameRU}</h2>
            <p className="movies-card__duration">{duration}</p>
          </div>
          <div className="movies-card__checkbox">{
            {
              delete: <button type="button" className="movies-card__button-delete button" onClick={handleDeleteMy} />,
              saved: <button type="button" className="movies-card__save-button movies-card__save-button_saved button" onClick={handleDelete} />,
              default: <button type="button" className="movies-card__save-button button" onClick={handleSave} />
            }[type]
          }
          </div>
        </div>
      </div>
    </li>
  )
}

export default MoviesCard