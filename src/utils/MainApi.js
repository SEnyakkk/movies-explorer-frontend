class MainApi {
  constructor() {
    // this._url = 'http://localhost:3000';
    this._url = 'https://api.sen.nomoredomainsrocks.ru/';
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

  register = (name, email, password) => {
    return this._request('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, password
      })
    })
  };

  authorize = (email, password) => {
    return this._request('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          return data;
        }
      })
  }

  getContent = (token) => {
    return this._request(`/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  editProfile = (name, email) => {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(name, email)
    })
  };

  getMyMovies(token) {
    return this._request(`/movies`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
  }

  addMovie(data, token) {
    return this._request(`/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
  }

  deleteMovie(movieId, token) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
}


export const mainApi = new MainApi();


