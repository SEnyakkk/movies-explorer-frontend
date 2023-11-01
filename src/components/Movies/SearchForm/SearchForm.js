import { useEffect, useState } from "react";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";
import "./SearchForm.css"

function SearchForm({ onSerch, setFilterText, checkFilter, isShort }) {
  const { values, handleChange, errors, isValid, errorMsg, setValues, setErrorMsg } = useFormWithValidation();

  useEffect(() => {
    setValues({
      filterText: localStorage.filterText,
    });

  }, []);

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt.target.filterText.value) {
      setFilterText(evt.target.filterText.value)
      localStorage.setItem('filterText', evt.target.filterText.value)
      onSerch(evt.target.filterText.value)
    } else { setErrorMsg("Введите название видео") }
  }

  return (
    <section className="search page__search" aria-label="поисковик">
      <form className="search__form" onSubmit={onSubmit} noValidate>
        <div className="search__form-container">
          <div className="search__form-input-container">
            <div className="search__icon" />
            <input
              onChange={handleChange}
              value={values.filterText || ''}
              type="text"
              className="search__form-input"
              placeholder="Фильм"
              name="filterText"
              required />

            <button className="search__form-submit button" />
          </div>
          <div className="search__checkbox-container button">
            <label className="search__checkbox-label">
              <input className="search__checkbox"
                checked={isShort}
                onChange={checkFilter}
                type="checkbox"
                name="сheckbox"
                id="сheckbox" />
              <span className="search__checkbox-span" />
              <span className="search__checkbox-caption">Короткометражки</span>
            </label>
          </div>
        </div>
        <span className="search__form-input-error">
          {!values.filterText && errorMsg}
        </span>
      </form>
    </section>
  )
}

export default SearchForm