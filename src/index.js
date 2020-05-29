/*
 * Отлично, теперь вы научились работать с запросами к серверу: получать и отправлять информацию.
 * Понравилось уместное использование Promise и собственной обертки над fetch во избежание дублирования.
 *
 * Работа принята, оставил пару небольших комментариев в коде.
 */

'use strict';
import "./style.css";

import {Api} from "./js/Api.js";
import {CardList} from "./js/CardList.js";
import {UserInfo} from "./js/UserInfo.js";
import {Popup} from "./js/Popup.js";
import {templateNewCard, templateEditProfile, templateViewImage} from "./js/templates.js";
import {FormValidator} from "./js/FormValidator.js";
import {ImgPopup} from "./js/ImgPopup.js";

//                                                               Переменные
const root = document.querySelector('.root');
const domName = root.querySelector('.user-info__name');
const domJob = root.querySelector('.user-info__job');
const domAvatar = root.querySelector('.user-info__photo');

const api = new Api();

const cardList = new CardList(document.querySelector('.places-list'));
const userInfo = new UserInfo(domName, domJob);

// Модальное окно "создание карточки"
const newCardBtn = root.querySelector('.user-info__button');
const newCardPopup = new Popup(templateNewCard, root);
const newCardForm = newCardPopup.popup.querySelector('.popup__form');
const newCardValidator = new FormValidator(newCardPopup.popup.querySelector('.popup__form'));

// Модальное окно "редактирование профиля"
const editProfileBtn = root.querySelector('.user-info__button_edit');
const editProfilePopup = new Popup(templateEditProfile, root);
const editProfileForm = editProfilePopup.popup.querySelector('.popup__form');
const editProfileValidator = new FormValidator(editProfileForm);

// Модальное окно "картинка карточки"
const ViewImagePopup = new ImgPopup(templateViewImage, root);

//                                                               Функции

//  Получаем данные пользователя с АПИ
function getUserData() {
  api.getUserInfo() 
    .then((data) => {
      domName.textContent = data.name;
      domJob.textContent = data.about;
      domAvatar.style.backgroundImage = `url(${data.avatar})`;

      userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
    })
    .catch(error => console.error(`Ошибка загрузки: ${error}`))
}

// Обновляем данные пользователя в АПИ
function updateUserData(name, about) {
  api.updateUserInfo(name, about) 
    .then((data) => {
      domName.textContent = data.name;
      domJob.textContent = data.about;

      userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
    })
    .catch(error => console.error(`Ошибка загрузки: ${error}`))
}

// Получаем данные карточек с АПИ
function getCardsData() {
  api.getCardsData() 
    .then((data) => {
      const cards = data.map(function (cardData) { // Можно лучше: переменная не используется. Больше подойдет forEach.
        const newCard = new Card(cardData);
        cardList.addCard(newCard.create());
      });
    })
    .catch(error => console.error(`Ошибка загрузки: ${error}`))
}

function addCardImageListeners() {
  cardList.cardContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('place-card__image')) {
      const backgroundUrl = event.target.style['background-image'];
      const imgUrl = backgroundUrl.slice(5, backgroundUrl.length - 2);
      ViewImagePopup.open(imgUrl);
    }
  })
}

function addNewCardValidator() {
  newCardValidator.setEventListeners();

  newCardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.forms.newCard.elements.name.value;
    const link = document.forms.newCard.elements.link.value;
    const newCard = new Card({ "name": name, "link": link });
    cardList.addCard(newCard.create());
    addCardImageListeners();
    newCardPopup.close();
  });

  newCardBtn.addEventListener('click', (event) => {
    newCardPopup.open();
  });
}

function addEditProfileValidator() {
  editProfileValidator.setEventListeners();

  editProfileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newName = document.forms.editProfile.elements.userName.value;
    const newJob = document.forms.editProfile.elements.userJob.value;
    updateUserData(newName, newJob);
    editProfilePopup.close();
  });

  editProfileBtn.addEventListener('click', (event) => {
    editProfilePopup.open();
    document.forms.editProfile.userName.value = userInfo.name;
    document.forms.editProfile.userJob.value = userInfo.job;
  });
}

//                                                              Вызов функций
getUserData();                            // Получаем данные пользователя
getCardsData();                           // Получаем данные о карточках
// cardList.render();
addCardImageListeners();
addNewCardValidator();
addEditProfileValidator();
