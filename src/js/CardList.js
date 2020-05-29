'use strict';

// Класс для хранения и отрисовки карточек.
export class CardList {
  constructor(cardContainer, cardList = []) {
    this.cardContainer = cardContainer;
    this.cardList = cardList;
  }

  _cardRender(card) {
    this.cardContainer.appendChild(card);
  }

  // добавление карточки в список, принимает на вход экземпляр карточки;
  addCard(card) {
    this.cardList.push(card);
    this._cardRender(card);
  }

  // отрисовка карточек при загрузке страницы.
  render() {
    this.cardList.forEach(function (card) {
      this._cardRender(card);
    }, this);
  }
}