'use strict';

// Класс для валидации полей формы.
export class FormValidator {
  constructor(popupForm) {
    this.popupForm = popupForm;
    this.form = this.popupForm;
    this.submitBtn = this.form.querySelector('.button');  // получаем сабмит формы
    this.formElements = Array.from(this.form);
  }

  // Валидация полей - Метод показывает ошибку, если инпуты не проходят валидацию.
  // Если проходят — скрывает ошибку.
  _checkInputValidity(inputElement, errorElement) {
    if (inputElement.validationMessage) {
      errorElement.textContent = inputElement.validationMessage;
      return false;
    }

    errorElement.textContent = '';
    return true;
  }

  // Смена активности сабмита.
  // Состояние кнопки сабмита зависит от того, прошли все поля валидацию или нет.
  // Этот метод должен вызываться при любом изменении данных формы.
  // Если поля в порядке, кнопка становится активной.
  // Если одно из полей не прошло валидацию, или пользователь его не заполнил, — кнопка неактивна.
  _setSubmitButtonState(btnObj, btnIsActive) {
    btnObj.disabled = !btnIsActive;
  }

  // Добавление обработчиков. Добавляет необходимые для валидации обработчики всем полям формы.
  setEventListeners() {
    this.form.addEventListener('input', () => {
      let formIsValid;
      this.formElements.forEach((element) => {
        if (element.type !== 'submit') {                // обрабатываем все поля отличные от submit
          formIsValid = this._checkInputValidity(element, this.form.querySelector(`#error-${element.name}`))
        };
      });
      this._setSubmitButtonState(this.submitBtn, formIsValid);
    });
  }
}