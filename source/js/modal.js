import {checkForm} from './util';

const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.modal__close-button');
const sliderButtons = document.querySelectorAll('.hero-slider__button');
const overlay = document.querySelector('.overlay');

const openModal = () => {
  modal.classList.remove('visually-hidden');
  overlay.classList.remove('visually-hidden');
  overlay.classList.add('overlay');

  // Закрытие модального окна при клике на любую часть экрана кроме окна
  document.addEventListener('click', onDocumentClick);
};

sliderButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

function closeModal () {
  modal.classList.add('visually-hidden');
  overlay.classList.add('visually-hidden');
  overlay.classList.remove('overlay');

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
const nameInput = modalForm.querySelector('#modal-name');
const phoneInput = modalForm.querySelector('#modal-phone');
const modalSelect = modalForm.querySelector('.select');
const modalSelectTitle = modalSelect.querySelector('.select__title');
const checkbox = modalForm.querySelector('.checkbox__input');
const submitButton = modalForm.querySelector('.modal__form-button');

const onClickCheck = (evt) => {
  evt.preventDefault();
  checkForm(modalForm, nameInput, phoneInput, modalSelectTitle, checkbox);
};

submitButton.addEventListener('click', onClickCheck);

nameInput.addEventListener('input', () => {
  nameInput.parentElement.classList.remove('text-input--error');
});

phoneInput.addEventListener('input', () => {
  phoneInput.parentElement.classList.remove('text-input--error');
});

checkbox.addEventListener('input', () => {
  checkbox.classList.remove('checkbox__input--error');
});
