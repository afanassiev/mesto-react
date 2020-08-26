import {apiConfig} from "./constants";

class Api {
  constructor(apiConfig) {
    this.url = apiConfig.baseUrl;
    this.headers = apiConfig.headers;
    this.authorizedUserId = apiConfig.authorizedUserId;
  }

  _resultHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _errorHandler = (err) => {
    console.log(err);
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`,
      {
        method: 'GET',
        headers: this.headers
      })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  setUserInfo(data) {
    return fetch(`${this.url}users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
      })
    })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  getInitialCards() {
    return fetch(`${this.url}cards`,
      {
        method: 'GET',
        headers: this.headers
      })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  addNewCard(item) {
    return fetch(`${this.url}cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  changeLikeCardStatus (cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this.url}cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers
          })
            .then(this._resultHandler)
            .catch(this._errorHandler)
        } else {
        return fetch(`${this.url}cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this.headers
          })
          .then(this._resultHandler)
          .catch(this._errorHandler)
    }
  }

  deleteCard(cardId) {
    return fetch(`${this.url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  setUserAvatar(avatar) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      })
    })
        .then(this._resultHandler)
        .catch(this._errorHandler)
  }
}

const api = new Api(apiConfig);

export default api;