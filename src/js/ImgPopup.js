'use strict';
import {Popup} from "./Popup.js";
// Класс для всплывающего окна.
export class ImgPopup extends Popup {
  // Добавьте ему методы open и close, чтобы показывать и скрывать попап.

  open(imgUrl) {
    this.popup.classList.add('popup_is-opened');
    this.popup.querySelector('.popup_img').src = `${imgUrl}`;
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}