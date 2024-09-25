import Swiper from 'swiper';

// Слайдер блока hero
const heroSlider = new Swiper('.hero-slider', {
  loop: true,

  breakpoints: {
    1440: {
      simulateTouch: false,
    },
  },
});

const slides = document.querySelectorAll('.hero-slider__slide');
const heroPaginations = document.querySelectorAll('.hero-slider__pagination');
const heroButtons = document.querySelectorAll('.hero-slider__button');

// Создаем кнопки пагинации
const createBullets = (pagination, bulletIndex, slideIndex) => {
  const text = document.createElement('span');
  text.textContent = `Слайд ${bulletIndex + 1}`;
  text.classList.add('visually-hidden');

  const bullet = document.createElement('button');
  bullet.type = 'button';
  bullet.classList.add('hero-slider__bullet');
  bullet.appendChild(text);
  if (bulletIndex === slideIndex) {
    bullet.classList.add('hero-slider__bullet--active');
  }

  pagination.appendChild(bullet);
};

for(let j = 0; j < slides.length; j++) {
  for(let i = 0; i < slides.length; i++) {
    createBullets(heroPaginations[j], i, j);
  }
}

// Создаем список обработчиков событий для каждой кнопки
const eventList = [];

for (let i = 0; i < slides.length; i++) {
  const eventHandler = () => {
    heroSlider.slideToLoop(i);
  };

  eventList[i] = eventHandler;
}

// Добавляем каждой кнопке на слайде обработчик событий
const addEvents = (pagination) => {
  const bulletsList = pagination.childNodes;

  for(let i = 0; i < bulletsList.length; i++) {
    bulletsList[i].addEventListener('click', eventList[i]);
  }
};

// Удаляем обработчик событий с каждой кнопки на слайде
const removeEvents = (pagination) => {
  const bulletsList = pagination.childNodes;

  for(let i = 0; i < bulletsList.length; i++) {
    bulletsList[i].removeEventListener('click', eventList[i]);
  }
};

// Скрываем кнопки пагинации, которые находятся на всех слайдах кроме текущего
const hideBullets = (currentSlide, pagination) => {
  const bulletsList = pagination.childNodes;

  bulletsList.forEach((bullet) => {
    if (!currentSlide) {
      bullet.setAttribute('tabIndex', '-1');
      bullet.setAttribute('aria-hidden', 'true');
    } else {
      bullet.setAttribute('tabIndex', '0');
      bullet.setAttribute('aria-hidden', 'false');
    }
  });

  if (!currentSlide) {
    removeEvents(pagination);
  } else {
    addEvents(pagination);
  }
};

// Скрываем кнопки "подробнее", которые находятся на всех слайдах кроме текущего
const hideButtons = (currentSlideIndex) => {
  const currentHeroSlideButton = heroButtons[currentSlideIndex];
  heroButtons.forEach((button) => {
    button.setAttribute('tabindex', '-1');
  });
  currentHeroSlideButton.setAttribute('tabindex', '0');
};

// Обрабатываем смену слайда
const onSlideChange = () => {
  const currentSlideIndex = heroSlider.realIndex;

  for (let i = 0; i < slides.length; i++) {
    if (i === currentSlideIndex) {
      hideBullets(true, heroPaginations[i]);
    } else {
      hideBullets(false, heroPaginations[i]);
    }
  }

  hideButtons(currentSlideIndex);
};

onSlideChange();

heroSlider.on('slideChange', onSlideChange);
