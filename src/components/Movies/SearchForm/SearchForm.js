import "./SearchForm.css"
import { useState } from "react";

function SearchForm({ onSearch, search, handleChange, handleCheckboxChange }) {
  const [isEmptyInput, setIsEmptyInput] = useState(false);

  async function handleCheckbox(e) {
    await handleCheckboxChange(e);
    e.target.form.requestSubmit();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!e.target.searchInput.value.trim()) {
      return setIsEmptyInput(true);
    }
    setIsEmptyInput(false);
    onSearch(search);
  }

  return (
    <section className="search page__search" aria-label="поисковик">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__form-container">
          <div className="search__form-input-container">
            <div className="search__icon" />

            <input type="text" className="search__form-input input-infocus"
              placeholder="Фильм"
              name="searchInput"
              required
              onChange={handleChange}
              value={search.text}
            />

            <button className="search__form-submit button" />
          </div>
          <div className="search__checkbox-container button">
            <label className="search__checkbox-label">
              <input type="checkbox" className="search__checkbox"
                name="searchCheckbox"
                id="searchCheckbox"
                onChange={handleCheckbox}
                checked={search.isShort}
              />
              <span className="search__checkbox-span input-focus" />
              <span className="search__checkbox-caption">Короткометражки</span>
            </label>
          </div>
        </div>

      </form>
      {isEmptyInput &&
          <p className="search__form-warning">
            Нужно ввести ключевое слово
          </p>
        }
    </section>
  )
}

export default SearchForm