import {checkInput, checkSelect, checkCheckbox} from './util';

const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.modal__close-button');
const sliderButtons = document.querySelectorAll('.hero-slider__button');
const overlay = document.querySelector('.overlay');

const openModal = () => {
  modal.classList.remove('visually-hidden');
  overlay.classList.remove('visually-hidden');
  overlay.classList.add('overlay--modal');

  // Закрытие модального окна при клике на любую часть экрана кроме окна
  document.addEventListener('click', onDocumentClick);
};

sliderButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

function closeModal () {
  modal.classList.add('visually-hidden');
  overlay.classList.add('visually-hidden');
  overlay.classList.remove('overlay--modal');

  document.removeEventListener('click', onDocumentClick);
}

function onDocumentClick (clickEvt) {
  if (clickEvt.composedPath().includes(overlay)) {
    closeModal();
  }
}

// Закрытие модального окна при клике на кнопку меню
closeButton.addEventListener('click', closeModal);

// Валидация формы модального окна
const modalForm = modal.querySelector('.modal__form');
const nameInput = modalForm.querySelector('#name');
const phoneInput = modalForm.querySelector('#phone');
const modalSelect = modalForm.querySelector('.select');
const modalSelectTitle = modalSelect.querySelector('.select__title');
const checkbox = modalForm.querySelector('.modal__checkbox');
const submitButton = modalForm.querySelector('.modal__form-button');

const onClickCheck = (evt) => {
  evt.preventDefault();
  const nameRules = /[a-zA-Zа-яёА-ЯЁ ]+/;
  const phoneRules = /[+][7][^\p{L}]+/gu;
  const nameCheckResult = checkInput(nameRules, nameInput, 'modal__input--error');
  const phoneCheckResult = checkInput(phoneRules, phoneInput, 'modal__input--error');
  const selectCheckResult = checkSelect(modalSelectTitle);
  const checkboxCheckResult = checkCheckbox(checkbox, 'modal__checkbox--error');
  if(nameCheckResult && phoneCheckResult && selectCheckResult && checkboxCheckResult) {
    modalForm.submit();
    phoneInput.value = '';
    nameInput.value = '';
    modalSelectTitle.textContent = '';
    checkbox.checked = false;
  }
};

submitButton.addEventListener('click', onClickCheck);

nameInput.addEventListener('input', () => {
  nameInput.parentElement.classList.remove('modal__input--error');
});

phoneInput.addEventListener('input', () => {
  phoneInput.parentElement.classList.remove('modal__input--error');
});

checkbox.addEventListener('input', () => {
  checkbox.classList.remove('modal__checkbox--error');
});
