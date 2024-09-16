import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';

// Слайдер блока hero
const heroSlider = new Swiper('.hero-slider', {
  modules: [Pagination],
  loop: true,
  pagination: {
    el: '.hero__pagination',
    type: 'bullets',
    bulletClass: 'hero__bullet',
    bulletActiveClass: 'hero__bullet-active',
    clickable: true,
    bulletElement: 'button type="button"',
  },

  breakpoints: {
    1440: {
      simulateTouch: false,
    },
  },
});

const heroPagination = document.querySelector('.hero__pagination');
const slides = document.querySelectorAll('.hero-slider__slide');

const setPaginationHeight = () => {
  const currentSlide = slides[heroSlider.activeIndex];
  const text = currentSlide.querySelector('.hero-slider__info');
  let bottom = getComputedStyle(text).getPropertyValue('bottom');
  bottom = bottom.substring(0, bottom.length - 2);
  const height = text.offsetHeight + parseInt(bottom);
  // console.log("activeIndex:  " + heroSlider.activeIndex);
  // console.log(text.offsetHeight);
  // console.log(parseInt(bottom));
  heroPagination.style.bottom = `${height}px`;
}

heroSlider.on('slideChange', setPaginationHeight);
