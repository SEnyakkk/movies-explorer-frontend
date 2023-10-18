class MainApi {
  constructor() {
    this._url = 'http://localhost:3000/';
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

//   _isResOk(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Статус ошибки: ${res.status}`);
//   }

//   _request(endpoint, options, url = this._url) {
//     return fetch(`${url}${endpoint}`, options)
//       .then(this._isResOk)
//   }

//   registerUser(name, email, password) {
//     return this._request('/signup', {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify(
//         name, email, password
//       )
//     })
//   }

//   loginUser(email, password) {
//     return this._request('/signin', {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify(email, password)
//     })
//   }

//   getUserInfo() {
//     return this._request(`/users/me`, {
//       method: 'GET',
//       headers: this._headers
//     })
//   }

//   setUserInfo(name, email) {
//     return this._request(`/users/me`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: name,
//         email: email
//       })
//     })
//   }

//   getMyMovies() {
//     return this._request('/movies', {
//       method: 'GET',
//       headers: this._headers
//     })
//   }

//   selectMovie(movie) {
//     return this._request('/movies', {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify(movie)
//     })
//   }

//   deleteMyMovie(movieId) {
//     return this._request(`/movies/${movieId}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//   }


//   setToken(token) {
//     this._headers['Authorization'] = `Bearer ${token}`
//   }
// }


// export const mainApi = new MainApi();

_getResponseData(res) {
  if (!res.ok) {
    return Promise.reject({status: res.status, res: res})
  }
  return res.json().then((data) => data.data || data)
}

getMyMovies(){
  return fetch(`${this._url}movies`, {
    method: 'GET',
    headers: this._headers
  })
    .then(res => this._getResponseData(res));
}

selectMovie(movie) {
  return fetch(`${this._url}movies`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(movie)
  })
    .then(res => this._getResponseData(res));
}

deleteMyMovie(movieId) {
  return fetch(`${this._url}movies/${movieId}`, {
    method: 'DELETE',
    headers: this._headers
  })
    .then(res => this._getResponseData(res));
}

getUserInfo() {
  return fetch(`${this._url}users/me`, {
    method: 'GET',
    headers: this._headers
  })
    .then(res => this._getResponseData(res));
}

setUserInfo(name, email) {
  return fetch(`${this._url}users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
    .then(res => this._getResponseData(res));
}

loginUser(email, password) {
  const data = {email, password};
  return fetch(`${this._url}signin`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(data)
  })
    .then(res => this._getResponseData(res));
}

registerUser(name, email, password) {
  const data = {name, email, password};
  return fetch(`${this._url}signup`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(data)
  })
    .then(res => this._getResponseData(res));
}

setToken(token) {
  this._headers['Authorization'] = `Bearer ${token}`
}

}

export const mainApi = new MainApi();
