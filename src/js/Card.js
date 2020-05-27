'use strict';

// Класс, создающий карточку.
class Card {
  constructor(data) {
    this.template = this._getTemplate(data);
  }

  create() {
    this.card = document.createElement("div");
    this.card.classList.add("place-card");
    this.card.innerHTML = this.template;
    this.likeBtn = this.card.querySelector('.place-card__like-icon');
    this.removeBtn = this.card.querySelector('.place-card__delete-icon');

    this._addListeners();

    return this.card;
  }

  _getTemplate({ link, name }) {
    return `<div class='place-card__image' style='background-image:url(${link})'>
                <button class='place-card__delete-icon'></button>
            </div>
            <div class='place-card__description'>
                <h3 class='place-card__name'>${name}</h3>
                <button class='place-card__like-icon'></button>
            </div>`
  }

  _remove() {
    this._removeListeners();
    this.card.remove();
  }

  _like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  _addListeners() {
    this.likeBtn.addEventListener('click', this._like);
    this.removeBtn.addEventListener('click', () => this._remove(), { once: true });
  };

  _removeListeners() {
    this.likeBtn.removeEventListener('click', this._like);
  };
}