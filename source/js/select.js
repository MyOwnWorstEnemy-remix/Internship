import {openSelestList, closeSelectList} from './util';

const modal = document.querySelector('.modal');
const modalSelect = modal.querySelector('.select');
const modalSelectTitle = modalSelect.querySelector('.select__title');
const modalSelectLabels = modalSelect.querySelectorAll('.select__label');

// Выпадающий список модального окна
const onModalSelectTitleClick = () => {
  if ('active' === modalSelect.getAttribute('data-state')) {
    closeSelectList(modalSelect, modalSelectLabels);
  } else {
    openSelestList(modalSelect, modalSelectLabels);
  }
};

const onModalLabelClick = (evt) => {
  modalSelectTitle.textContent = evt.target.textContent;
  modalSelect.classList.remove('select--error');
  closeSelectList(modalSelect, modalSelectLabels);
};

const onModalLabelKeydown = (evt) => {
  if(evt.key === 'Enter') {
    modalSelect.classList.remove('select--error');
    onModalLabelClick(evt);
  }
}

const onModalSelectTitleKeydown = (evt) => {
  if(evt.key === 'Enter') {
    onModalSelectTitleClick();
  }
}

// События открытия/закрытия выпадающего списка модального окна
modalSelectTitle.addEventListener('click', onModalSelectTitleClick);
modalSelectTitle.addEventListener('keydown', onModalSelectTitleKeydown);

// События закрытия выпадающего списка после выбора элемента
for (let i = 0; i < modalSelectLabels.length; i++) {
  modalSelectLabels[i].addEventListener('click', onModalLabelClick);
  modalSelectLabels[i].addEventListener('keydown', onModalLabelKeydown);
}

// Выпадающий список формы
const form = document.querySelector('.form-section__form');
const formSelect = form.querySelector('.select');
const formSelectTitle = formSelect.querySelector('.select__title');
const formSelectLabels = formSelect.querySelectorAll('.select__label');

const onFormSelectTitleClick = () => {
  if ('active' === formSelect.getAttribute('data-state')) {
    closeSelectList(formSelect, formSelectLabels);
  } else {
    openSelestList(formSelect, formSelectLabels);
  }
};

const onFormLabelClick = (evt) => {
  formSelectTitle.textContent = evt.target.textContent;
  closeSelectList(formSelect, formSelectLabels);
};

const onFormLabelKeydown = (evt) => {
  if(evt.key === 'Enter') {
    onFormLabelClick(evt);
  }
}

const onFormSelectTitleKeydown = (evt) => {
  if(evt.key === 'Enter') {
    onFormSelectTitleClick();
  }
}

// События открытия/закрытия выпадающего списка формы
formSelectTitle.addEventListener('click', onFormSelectTitleClick);
formSelectTitle.addEventListener('keydown', onFormSelectTitleKeydown);

// События закрытия выпадающего списка после выбора элемента
for (let i = 0; i < formSelectLabels.length; i++) {
  formSelectLabels[i].addEventListener('click', onFormLabelClick);
  formSelectLabels[i].addEventListener('keydown', onFormLabelKeydown);
}
