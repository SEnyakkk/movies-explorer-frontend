import "./SearchForm.css"

function SearchForm() {

  return (
    <section className="search page__search" aria-label="поисковик">
      <form className="search__form">
        <div className="search__form-container">
          <div className="search__form-input-container">
            <div className="search__icon"/>
            <input type="text" className="search__form-input input-infocus" placeholder="Фильм" name="searchInput" required/>
              <button className="search__form-submit button"/>
          </div>
          <div className="search__checkbox-container button">
            <label className="search__checkbox-label">
              <input className="search__checkbox" type="checkbox" name="Checkbox" id="Checkbox"/>
              <span className="search__checkbox-span input-focus"/>
              <span className="search__checkbox-caption">Короткометражки</span>
            </label>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SearchForm