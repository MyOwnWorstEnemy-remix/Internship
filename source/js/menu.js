const navigation = document.querySelector('.main-nav');
const toggle = document.querySelector('.main-nav__toggle');
const links = navigation.querySelectorAll('.nav-list__link');
const extendedLinks = navigation.querySelectorAll('.nav-list__link--closed');

const openMenu = () => {
  navigation.classList.add('main-nav--opened');
  navigation.classList.remove('main-nav--closed');
  document.body.style.background = 'rgba(13, 29, 51, 0.4)';
};

const closeMenu = () => {
  navigation.classList.remove('main-nav--opened');
  navigation.classList.add('main-nav--closed');
  document.body.style.background = 'transparent';
};

const onToggleClick = () => {
  if(navigation.classList.contains('main-nav--opened')) {
    closeMenu();
  } else {
    openMenu();
  }
};

const onDocumentClick = (clickEvt) => {
  if (!clickEvt.composedPath().includes(navigation)) {
    closeMenu();
  }
}

// Открытие/закрытие меню при клике на кнопку меню
toggle.addEventListener('click', onToggleClick);

// Открытие/закрытие меню при клике на любую часть экрана кроме навигации
document.addEventListener('click', onDocumentClick);

// Открытие,закрытие выпадающего списка после клика на ссылку
extendedLinks.forEach((link) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    link.classList.toggle('nav-list__link--opened');
    link.classList.toggle('nav-list__link--closed');
  });
});
