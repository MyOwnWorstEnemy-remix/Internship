import {checkForm} from './util';

// Валидация формы
const mainForm = document.querySelector('.form-section__form');
const nameInput = mainForm.querySelector('#name');
const phoneInput = mainForm.querySelector('#phone');
const modalSelect = mainForm.querySelector('.select');
const modalSelectTitle = modalSelect.querySelector('.select__title');
const checkbox = mainForm.querySelector('.checkbox__input');
const submitButton = mainForm.querySelector('.form-section__button');

const onClickCheck = (evt) => {
  evt.preventDefault();
  checkForm(mainForm, nameInput, phoneInput, modalSelectTitle, checkbox);
};

submitButton.addEventListener('click', onClickCheck);

nameInput.addEventListener('input', () => {
  nameInput.parentElement.classList.remove('text-input--error');
});

phoneInput.addEventListener('input', () => {
  phoneInput.parentElement.classList.remove('text-input--error');
});

phoneInput.addEventListener('focus', () => {
  if (phoneInput.value === '') {
    phoneInput.value = '+7';
  }
});

checkbox.addEventListener('input', () => {
  checkbox.classList.remove('checkbox__input--error');
});
