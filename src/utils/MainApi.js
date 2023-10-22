class MainApi {
  constructor() {
    this._url = 'http://localhost:3000';
  }


  // https://practicum.yandex.ru/learn/web/courses/134735fe-bc3e-4772-b04d-206235915714/sprints/86159/topics/fbfdc93d-f128-4916-905c-07305c7aea27/lessons/dc184853-1dd1-4e04-a7ff-86a5a02e0f71/
  register = (name, email, password) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

  };
}

export const mainApi = new MainApi();


