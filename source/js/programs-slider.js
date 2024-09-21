import Swiper from 'swiper';
import {Navigation, Scrollbar} from 'swiper/modules';

new Swiper('.programs-slider', {
  modules: [Navigation, Scrollbar],
  loop: false,
  navigation: {
    nextEl: '.programs__slider-button--next',
    prevEl: '.programs__slider-button--prev',
  },
  scrollbar: {
    el: ".programs__scrollbar",
    draggable: true,
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
      slidesPerView: 3,
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
