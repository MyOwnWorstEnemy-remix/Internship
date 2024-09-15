const modal = document.querySelector('.modal');
const select = modal.querySelector('.select');
const selectTitle = select.querySelector('.select__title');
const selectLabels = select.querySelectorAll('.select__label');

const openSelestList = () => {
  select.setAttribute('data-state', 'active');
  selectLabels.forEach((label) => {
    label.setAttribute('tabindex', '0');
  });
};

const closeSelectList = () => {
  select.setAttribute('data-state', '');
  selectLabels.forEach((label) => {
    label.setAttribute('tabindex', '-1');
  });
};

const onSelectTitleClick = () => {
  if ('active' === select.getAttribute('data-state')) {
    closeSelectList();
  } else {
    openSelestList();
  }
};

const onLabelClick = (evt) => {
  selectTitle.textContent = evt.target.textContent;
  closeSelectList();
};

const onLabelKeydown = (evt) => {
  if(evt.key === 'Enter') {
    onLabelClick(evt);
  }
}

const onSelectTitleKeydown = (evt) => {
  if(evt.key === 'Enter') {
    onSelectTitleClick();
  }
}

// Открыть/закрыть выпадающий список
selectTitle.addEventListener('click', onSelectTitleClick);
selectTitle.addEventListener('keydown', onSelectTitleKeydown);

// Закрыть выпадающий список после выбора элемента
for (let i = 0; i < selectLabels.length; i++) {
  selectLabels[i].addEventListener('click', onLabelClick);
  selectLabels[i].addEventListener('keydown', onLabelKeydown);
}

const closeButton = modal.querySelector('.modal__close-button');

const sliderButtons = document.querySelectorAll('.hero-slider__button');

const openModal = () => {
  modal.classList.remove('modal--closed');
  document.body.style.background = 'rgba(13, 29, 51, 0.4)';
};

sliderButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

function closeModal () {
  modal.classList.add('modal--closed');
  document.body.style.background = 'transparent';
}

// Закрытие меню при клике на кнопку меню
closeButton.addEventListener('click', closeModal);


