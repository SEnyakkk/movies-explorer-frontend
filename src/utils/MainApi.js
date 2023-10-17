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
      headers: this._headers,
      body: JSON.stringify(
        name, email, password
      )
    })
  }

  loginUser(email, password) {
    const data = { email, password };
    return this._request('/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    //   .then((data) => {
    //     if (data.token) {
    //       localStorage.setItem('jwt', data.token);
    //       return data;
    //     }
    //   })
   }

    getUserInfo() {
      return this._request(`/users/me`, {
        method: 'GET',
        headers: this._headers
      })
    }

    setUserInfo(name, email) {
      return this._request(`/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          email: email
        })
      })
    }

    getMyMovies() {
      return this._request('/movies', {
        method: 'GET',
        headers: this._headers
      })
    }

    selectMovie(movie) {
      return this._request('/movies', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(movie)
      })
    }

    deleteMyMovie(movieId) {
      return this._request(`/movies/${movieId}`, {
        method: 'DELETE',
        headers: this._headers
      })
    }


    setToken(token) {
      this._headers['Authorization'] = `Bearer ${token}`
    }
  }


  export const mainApi = new MainApi();