class MainApi {
  constructor() {
    this._url = 'https://api.sen.nomoredomainsrocks.ru/';
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

_isResOk(res) {
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
    .then(res => this._isResOk(res));
}

selectMovie(movie) {
  return fetch(`${this._url}movies`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(movie)
  })
    .then(res => this._isResOk(res));
}

deleteMyMovie(movieId) {
  return fetch(`${this._url}movies/${movieId}`, {
    method: 'DELETE',
    headers: this._headers
  })
    .then(res => this._isResOk(res));
}

getUserInfo() {
  return fetch(`${this._url}users/me`, {
    method: 'GET',
    headers: this._headers
  })
    .then(res => this._isResOk(res));
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
    .then(res => this._isResOk(res));
}

loginUser(email, password) {
  const data = {email, password};
  return fetch(`${this._url}signin`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(data)
  })
    .then(res => this._isResOk(res));
}

registerUser(name, email, password) {
  const data = {name, email, password};
  return fetch(`${this._url}signup`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(data)
  })
    .then(res => this._isResOk(res));
}

setToken(token) {
  this._headers['Authorization'] = `Bearer ${token}`
}

}

export const mainApi = new MainApi();
