'use strict';
const isDev = NODE_ENV === 'development';

console.log('environment', NODE_ENV);

export class Api {
  constructor() {
    this.token = "4be4432e-ebc8-4811-a3f6-44d3010745a9";
    this.cohortId = "cohort10";
    this.baseUrl = isDev ? `http://praktikum.tk/${this.cohortId}/`: `https://praktikum.tk/${this.cohortId}/`;
    
    this.baseRequest = {
      headers: {
          Authorization: this.token,
          'Content-Type': 'application/json'
      },
    }
  }

  _sendRequest(url, request) {
    return fetch(url, request)
      .then((req) => {
        if (req.ok){
          return req.json();
        }
        return Promise.reject(`resopnce status:${req.status}`);
      })
  }

  getUserInfo() {
      const url = `${this.baseUrl}users/me`;
      return this._sendRequest(url, this.baseRequest);
  }

  updateUserInfo(name, about) {
    const url = `${this.baseUrl}users/me`;
    /*
     * Можно лучше
     * Формировать объект на основе baseRequest
     * Пример:
     * { first: 1 } => { first: 1, second: 2 } можно получить следующим путем:
     * const oldObj = { first: 1 };
     * const newObj = { ...oldObj, second: 2 }
     * Если требуется перейти на следующий уровень вложенности, "..." работает и на нем:
     * const oldObj = { a: { b: 'c' } };
     * const newObj = { ...oldObj.a }; // => { b: 'c' }
     *
     * Подробнее про "...": https://learn.javascript.ru/destructuring#destrukturizatsiya-obekta
     */
    const request = {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    };

    return this._sendRequest(url, request);
  }

  getCardsData() {
    const url = `${this.baseUrl}cards`;
    return this._sendRequest(url, this.baseRequest);
  }
}
