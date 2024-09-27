import Swiper from 'swiper';
import {Navigation, Pagination, Grid} from 'swiper/modules';
import {renderSlide} from './util';
import {newsInfo} from './data';

renderSlide(newsInfo);

const createSlider = () => new Swiper('.news-slider', {
  modules: [Navigation, Pagination, Grid],
  loop: false,
  grid: {
    rows: 2,
    fill: 'column',
  },
  pagination: {
    el: '.news__pagination',
    type: 'bullets',
    bulletClass: 'news__page',
    bulletActiveClass: 'news__page--active',
    clickable: true,
    renderBullet: function (index, className) {
      return `<button class=${className} type="button">${index + 1}</button>`;
    },
  },
  navigation: {
    nextEl: '.news__button--next',
    prevEl: '.news__button--prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 2,
        fill: 'row',
      },
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      grid: {
        rows: 1,
        columns: 3,
      },
      spaceBetween: 32,
      simulateTouch: false,
    },
  },
});

let newsSlider = createSlider();

const hidePaginationButton = (button) => {
  button.classList.add('visually-hidden');
  button.style.disable = 'true';
  button.setAttribute('tab-index', '-1');
};

const showPaginationButton = (button) => {
  button.classList.remove('visually-hidden');
  button.style.disable = '';
  button.setAttribute('tab-index', '0');
};

const newsPagination = document.querySelector('.news__pagination');
const paginationList = newsPagination.children;
const shownButtons = 4;
let firstShownButton = 0;
let lastShownButton = paginationList.length < shownButtons ? paginationList.length : shownButtons - 1;
const tabletWindowQuery = window.matchMedia('(min-width: 768px)');
const desktopWindowQuery = window.matchMedia('(min-width: 1440px)');

for (let i = shownButtons; i < paginationList.length; i++) {
  hidePaginationButton(paginationList[i]);
}

const onSlideChange = () => {
  let currentSlideIndex = newsSlider.realIndex;

  if(desktopWindowQuery.matches) {
    currentSlideIndex = Math.ceil(currentSlideIndex / 3);
  } else if (tabletWindowQuery.matches) {
    currentSlideIndex = Math.ceil(currentSlideIndex / 2);
  }

  if (currentSlideIndex === firstShownButton && currentSlideIndex !== 0) {
    firstShownButton -= 1;
    showPaginationButton(paginationList[firstShownButton]);
    hidePaginationButton(paginationList[lastShownButton]);
    lastShownButton -= 1;
  }
  if (currentSlideIndex === lastShownButton && currentSlideIndex !== paginationList.length - 1) {
    hidePaginationButton(paginationList[firstShownButton]);
    firstShownButton += 1;
    lastShownButton += 1;
    showPaginationButton(paginationList[lastShownButton]);
  }
};

newsSlider.on('slideChange', onSlideChange);

const newsTabList = document.querySelectorAll('.news__tab');
newsTabList.forEach((tab) => {
  tab.addEventListener('click', () => {
    newsSlider.destroy(true, true);
    const type = tab.dataset.type;
    if (type === 'all') {
      renderSlide(newsInfo);
    } else {
      const slidesInfo = newsInfo.filter((info) => info.type === type);
      renderSlide(slidesInfo);
    }
    newsSlider = createSlider();
    newsSlider.on('slideChange', onSlideChange);

    firstShownButton = 0;
    lastShownButton = paginationList.length < shownButtons ? paginationList.length : shownButtons - 1;
    newsSlider.slideTo(0);

    for (let i = shownButtons; i < paginationList.length; i++) {
      hidePaginationButton(paginationList[i]);
    }

    for (let i = 0; i < newsTabList.length; i++) {
      newsTabList[i].classList.remove('news__tab--active');
    }
    tab.classList.add('news__tab--active');
  });
});
