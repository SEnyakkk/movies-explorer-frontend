class MoviesApi {
  constructor() {
    this._url = 'https://api.nomoreparties.co/beatfilm-movies';
  }

  _isResOk = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

  getMovies() {
    return fetch(this._url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => this._isResOk);
  }
}

export const moviesApi = new MoviesApi();