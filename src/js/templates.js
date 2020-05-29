'use strict';
export const templateNewCard = `<div class="popup" id="newCard">
                            <div class="popup__content">
                            <img src="./images/close.svg" alt="" class="popup__close">
                            <h3 class="popup__title">Новое место</h3>
                            <form class="popup__form" name="newCard" novalidate>
                                <input type="text" name="name" class="popup__input popup__input_type_name" required placeholder="Название">
                                <span id="error-name" class="popup__error"></span>
                                <input type="text" name="link" class="popup__input popup__input_type_link-url" required placeholder="Ссылка на картинку">
                                <span id="error-link" class="popup__error"></span>
                                <button type class="button popup__button" disabled>+</button>
                            </form>
                            </div>
                        </div>`

export const templateEditProfile = `<div class="popup" id='editProfile'>
                                <div class="popup__content">
                                    <img src="./images/close.svg" alt="" class="popup__close">
                                    <h3 class="popup__title">Редактировать профиль</h3>
                                    <form class="popup__form" name="editProfile" novalidate>
                                        <input type="text" name="userName" class="popup__input popup__input_type_name" placeholder="Имя" required minlength="2" maxlength="30">
                                        <span id="error-userName" class="popup__error"></span>
                                        <input type="text" name="userJob" class="popup__input popup__input_type_job" placeholder="О себе" required minlength="2" maxlength="30">
                                        <span id="error-userJob" class="popup__error"></span>
                                        <button type class="button popup__button">Сохранить</button>
                                    </form>
                                </div>
                            </div>`

export const templateViewImage = `<div class="popup" id="viewImage">
                                <div class="popup__image">
                                    <img src="./images/close.svg" alt="" class="popup__close">
                                    <img alt="" class="popup_img">
                                </div>
                            </div>`


// export {templateNewCard, templateEditProfile, templateViewImage};