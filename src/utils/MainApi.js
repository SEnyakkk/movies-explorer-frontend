class MainApi {
  constructor() {
    this._url = 'http://localhost:3000';
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
        'Authorization': `Bearer ${token}`,
      }
    })
  }
}


export const mainApi = new MainApi();


