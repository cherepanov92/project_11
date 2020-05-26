'use strict';

// Класс для работы с данными пользователя.
class UserInfo {
  // Экземпляр этого класса должен хранить в себе данные пользователя:
  // имя и информацию о себе, а также отображать эту информацию на странице.
  constructor(Name, Job) {
    this.domName = Name;
    this.domJob = Job;

    this.name = this.domName.textContent;
    this.job = this.domJob.textContent;
  }

  // обновление данных внутри экземпляра класса;
  setUserInfo(name, job, avatarUrl=undefined, id=undefined) {
    this.name = name;
    this.job = job;

    if (avatarUrl) {
      this.avatar = avatarUrl;
    };

    if (id) {
      this.userId = id;
    };
  }

  //отображение данных класса на странице.
  updateUserInfo() {
    this.domName.textContent = this.name;
    this.domJob.textContent = this.job;
  }
}