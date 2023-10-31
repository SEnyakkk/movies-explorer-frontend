import { useEffect, useState } from "react";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";
import "./SearchForm.css"

function SearchForm({ onSerch, setFilterText }) {
  const { values, handleChange, errors, isValid, errorMsg, setValues, setErrorMsg } = useFormWithValidation();
  // const [filterText, setFilterText] = useState('');

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt.target.filterText.value) {
      setFilterText(evt.target.filterText.value)
      localStorage.setItem('filterText', evt.target.filterText.value)
      onSerch(evt.target.filterText.value)
    }
  }

  useEffect(() => {
    setValues({ filterText: localStorage.filterText });
  }, [setValues,]);

  // useEffect(() => {
  //   if (localStorage.filterText) {
  //     setValues(JSON.parse(localStorage.filterText))
  //   }
  // }, [localStorage.filterText])
  // console.log(filterText)

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
                type="checkbox"
                name="Checkbox"
                id="Checkbox" />
              <span className="search__checkbox-span" />
              <span className="search__checkbox-caption">Короткометражки</span>
            </label>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SearchForm