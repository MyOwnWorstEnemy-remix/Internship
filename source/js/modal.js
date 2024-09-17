import {nameRules, phoneRules, checkInput, checkSelect, checkCheckbox} from './util';

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
const checkbox = modalForm.querySelector('.checkbox__input');
const submitButton = modalForm.querySelector('.modal__form-button');

const onClickCheck = (evt) => {
  evt.preventDefault();
  const nameCheckResult = checkInput(nameRules, nameInput);
  const phoneCheckResult = checkInput(phoneRules, phoneInput);
  const selectCheckResult = checkSelect(modalSelectTitle);
  const checkboxCheckResult = checkCheckbox(checkbox);
  checkbox.reportValidity();
  phoneInput.reportValidity();
  nameInput.reportValidity();
  if(nameCheckResult && phoneCheckResult && selectCheckResult && checkboxCheckResult) {
    modalForm.submit();
    modalForm.reset();
    modalSelectTitle.textContent = '';
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
