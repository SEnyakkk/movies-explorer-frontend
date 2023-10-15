class MainApi {
  constructor() {
    this._url = 'http://localhost:3000';
    this._headers = {
      'Content-Type': 'application/json'
    };
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

  registerUser(name, email, password) {
    return this._request('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, password
      })
    })
  }

  loginUser(email, password) {
    return this._request('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, password
      })
    })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
  }

  getUserInfo(token) {
    return this._request(`/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
  }

  setUserInfo(username, email, token) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: username,
        email: email
      })
    })
  }

  getMyMovies(token) {
    return this._request('/movies', {
      headers: { "Authorization": `Bearer ${token}` }
    })
  }

  selectMovie(movie, token) {
    return this._request('/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(movie)
    })
  }

  deleteMyMovie(movieId, token) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` }
    })
  }
}


export const mainApi = new MainApi();