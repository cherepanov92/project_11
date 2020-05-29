'use strict';

// Класс для всплывающего окна.
export class Popup {
  // Добавьте ему методы open и close, чтобы показывать и скрывать попап.
  constructor(template, container) {
    this.popup = null;
    this.template = template;
    this.container = container;
    this.popupForm = null;
    this.error_spans = null;
    this._create();
    this._addListeners();
  }

  _create() {
    const popupDom = document.createElement("div");
    // Можно лучше -- чтобы не создавать лишних оберток,
    // используйте Fragment https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    popupDom.insertAdjacentHTML('beforeend', this.template);

    this.popup = popupDom.firstElementChild;
    this.popupForm = this.popup.querySelector(".popup__form");
    this.error_spans = this.popupForm ? this.popupForm.querySelectorAll("span") : null;
    this.closeBtn = this.popup.querySelector('.popup__close');
    this.container.appendChild(this.popup);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    if (this.popupForm) {
      this.popupForm.reset()
      // отчищаем сообщения в спанах с ошибками
      this.error_spans.forEach((error_span) => {
        error_span.textContent = '';
      });
      this.popupForm.querySelector('.popup__button').disabled = true;
    };
  }

  _addListeners() {
    // закрываем модалку крестиком
    this.closeBtn.addEventListener('click', (event) => {
      this.close();
    });

    // закрываем модалку клавишей esc
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }
}