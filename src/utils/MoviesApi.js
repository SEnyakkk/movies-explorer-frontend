class MoviesApi {
  constructor() {
    this._url = 'https://api.nomoreparties.co/beatfilm-movies';
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

//   _isResOk = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

//   getMovies() {
//     return fetch(this._url, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(res => this._isResOk);
//   }
// }

// export const moviesApi = new MoviesApi();

_getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json()
    .then((data) => {
      return data
    })
}

getMovies() {
  return fetch(this._url, {
    method: 'GET',
    headers: this._headers
  })
    .then(res => this._getResponseData(res));
}
}

export const moviesApi = new MoviesApi();
