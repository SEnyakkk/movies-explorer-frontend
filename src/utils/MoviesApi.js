class MoviesApi {
  constructor() {
    this._url = 'https://api.nomoreparties.co/beatfilm-movies';
  }

  _isResOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ошибки: ${res.status}`);
  }

  _request(endpoint, options, url = this._url) {
    return fetch(`${url}${endpoint}`, options)
      .then(this._isResOk)
  }

  getMovies() {
    return this._request(``, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}


export const moviesApi = new MoviesApi();

