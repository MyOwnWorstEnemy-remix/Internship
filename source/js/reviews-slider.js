import Swiper from 'swiper';
import {Navigation, Scrollbar} from 'swiper/modules';

new Swiper('.reviews-slider', {
  modules: [Navigation, Scrollbar],
  loop: false,
  navigation: {
    nextEl: '.reviews__button--next',
    prevEl: '.reviews__button--prev',
  },
  scrollbar: {
    el: ".reviews__scrollbar",
    draggable: true,
    // snapOnRelease: true,
    dragSize: 326,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 32,
      simulateTouch: false,

      scrollbar: {
        dragSize: 394,
      },
    },
  },
});

const scrollbarDrag = document.querySelector('.swiper-scrollbar-drag');
scrollbarDrag.style.background = '#316dc2';
