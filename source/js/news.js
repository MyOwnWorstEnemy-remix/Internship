import Swiper from 'swiper';
import {Navigation, Pagination, Grid} from 'swiper/modules';
import {renderSlide} from './util';
import {newsInfo} from './data';

renderSlide(newsInfo);

const newsTabList = document.querySelectorAll('.news__tab');
newsTabList.forEach((tab) => {
  tab.addEventListener('click', () => {
    const type = tab.dataset.type;
    if (type === 'all') {
      renderSlide(newsInfo);
    } else {
      const slidesInfo = newsInfo.filter((info) => info.type === type);
      renderSlide(slidesInfo);
    }

    for (let i = 0; i < newsTabList.length; i++) {
      newsTabList[i].classList.remove('news__tab--active');
    }
    tab.classList.add('news__tab--active');
  });
});

const newsSlider = new Swiper('.news-slider', {
  modules: [Navigation, Pagination, Grid],
  loop: false,
  grid: {
    rows: 2,
    fill: 'column',
  },
  // slidesPerColumn: 2,
  // slidesPerColumnFill: 'column',
  pagination: {
    el: '.news__pagination',
    type: 'bullets',
    bulletClass: 'news__page',
    bulletActiveClass: 'news__page--active',
    clickable: true,
    // bulletElement: 'button type="button"',
    renderBullet: function (index, className) {
      return `<button class=${className} type="button">${index+1}</button>`;
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
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 1,
      },
      spaceBetween: 32,
      simulateTouch: false,
    },
  },
});

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

let paginationList = document.querySelectorAll('.news__page');
console.log(paginationList);
const shownButtons = 4;
let firstShownButton = 0;
let lastShownButton = paginationList.length < shownButtons ? paginationList.length : shownButtons - 1;

for (let i = shownButtons; i < paginationList.length; i++) {
  hidePaginationButton(paginationList[i]);
}

const onSlideChange = () => {
  const currentSlideIndex = newsSlider.realIndex;
  console.log(currentSlideIndex + "   " + firstShownButton + "   " + lastShownButton);
  console.log(paginationList);
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
