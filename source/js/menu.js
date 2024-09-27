const navigation = document.querySelector('.main-nav');
const toggle = document.querySelector('.main-nav__toggle');
const links = document.querySelectorAll('.nav-list__link');
const extendedLinks = navigation.querySelectorAll('.nav-list__link--closed');
const overlay = document.querySelector('.overlay');

const openMenu = () => {
  navigation.classList.add('main-nav--opened');
  navigation.classList.remove('main-nav--closed');
  overlay.classList.remove('visually-hidden');

  // Открытие/закрытие меню при клике на любую часть экрана кроме навигации
  document.addEventListener('click', onDocumentClick);
};

const closeMenu = () => {
  navigation.classList.remove('main-nav--opened');
  navigation.classList.add('main-nav--closed');
  overlay.classList.add('visually-hidden');

  document.removeEventListener('click', onDocumentClick);
};

const onToggleClick = () => {
  if(navigation.classList.contains('main-nav--opened')) {
    closeMenu();
  } else {
    openMenu();
  }
};

function onDocumentClick (clickEvt) {
  if (!clickEvt.composedPath().includes(navigation)) {
    closeMenu();
  }
}

// Открытие/закрытие меню при клике на кнопку меню
toggle.addEventListener('click', onToggleClick);

links.forEach((link) => {
  if (!link.classList.contains('nav-list__link--opened') && !link.classList.contains('nav-list__link--closed')) {
    link.addEventListener('click', () => {
      closeMenu();
    });
  }
});

// Открытие,закрытие выпадающего списка после клика на ссылку
extendedLinks.forEach((link) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    link.classList.toggle('nav-list__link--opened');
    link.classList.toggle('nav-list__link--closed');
  });
});
