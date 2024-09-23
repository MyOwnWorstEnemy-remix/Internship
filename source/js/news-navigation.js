import {newsInfo} from './data';

const newsSection = document.querySelector('.news');
const newsNavigation = newsSection.querySelector('.news__navigation');
const previousButton = newsSection.querySelector('.news__button--prev');
const nextButton = newsSection.querySelector('.news__button--next');

const windowWidth = {
  mobile: 320,
  tablet: 768,
  desktop: 1440,
};

const slidesPerPage = {
  mobile: 2,
  tablet: 4,
  desktop: 3,
};

const shownPages = 4;
let currentPage = 0;
let firstShownPage = 0;
let lastShownPage = shownPages - 1;

const createButton = (paginationItemClass, buttonClass) => {
  const buttonContainer = document.createElement('li');
  buttonContainer.classList.add(paginationItemClass);
  const pageButton = document.createElement('button');
  pageButton.type = 'button';
  const button = buttonContainer.appendChild(pageButton);
  button.classList.add(buttonClass);
  return button;
};

const disableButton = (pageIndex, pages) => {
  if(pageIndex === 0) {
    previousButton.disabled = 'true';
  } else {
    previousButton.disabled = '';
  }
  if(pageIndex === pages - 1) {
    nextButton.disabled = 'true';
  } else {
    nextButton.disabled = '';
  }
};

const updateActiveButton = (pageButtonList, buttonCurrentClass, currentPage) => {
  pageButtonList.forEach((button, index) => {
    if (index === currentPage) {
      button.classList.add(buttonCurrentClass);
    } else {
      button.classList.remove(buttonCurrentClass);
    }
  });
};

const updateShownButtons = (pageButtonList, pageIndex) => {
  if (pageIndex === firstShownPage) {
    newsNavigation.removeChild(pageButtonList[lastShownPage]);
    firstShownPage -= 1;
    lastShownPage -= 1;
    newsNavigation.insertBefore(pageButtonList[firstShownPage], pageButtonList[firstShownPage + 1]);
  }
  if (pageIndex === lastShownPage) {
    newsNavigation.removeChild(pageButtonList[firstShownPage]);
    firstShownPage += 1;
    lastShownPage += 1;
    newsNavigation.appendChild(pageButtonList[lastShownPage]);
  }
};

const updateSlider = (pageButtonList, pageIndex, pages) => {
  if (pageIndex > 0 && pageIndex < pages - 1 && pages > shownPages) {
    updateShownButtons(pageButtonList, pageIndex);
  }
  // renderSlides(newsInfo.slice(currentPage * slidesPerPage, (currentPage + 1) * slidesPerPage));
  updateActiveButton(pageButtonList, 'news__page--active', pageIndex);
};

const createNavigationButtons = (widthType) => {
  const slidesNumber = slidesPerPage[widthType];
  const pages = Math.ceil(newsInfo.length / slidesNumber);

  const pageButtonList = [];

  for (let i = 0; i < pages; i++) {
    const pageButton = createButton('news__navigation-item', 'news__page');
    pageButton.textContent = i + 1;
    pageButtonList.push(pageButton);

    if (i < shownPages) {
      newsNavigation.appendChild(pageButtonList[i]);
    }
  }

  updateActiveButton(pageButtonList, 'news__page--active', currentPage);
  disableButton(currentPage, pages);

  for (let i = 0; i < pages; i++) {
    pageButtonList[i].addEventListener('click', () => {
      disableButton(i, pages);
      updateSlider(pageButtonList, i, pages);
    });
  }

  previousButton.addEventListener('click', () => {
    currentPage -= 1;
    disableButton(currentPage, pages)
    updateSlider(pageButtonList, currentPage, pages);
  });

  nextButton.addEventListener('click', () => {
    currentPage += 1;
    disableButton(currentPage, pages);
    updateSlider(pageButtonList, currentPage, pages);
  });
};

const tabletQuery = matchMedia('(min-width: 768px)');
const desktopQuery = matchMedia('(min-width: 1440px)');

const onWindowResize = () => {
  if (desktopQuery.matches) {
    console.log('desktop');
    createNavigationButtons('desktop');
  } else if (tabletQuery.matches) {
    console.log('tablet');
    createNavigationButtons('tablet');
  } else {
    console.log('mobile');
    createNavigationButtons('mobile');
  }
};

onWindowResize();

window.addEventListener("resize", onWindowResize);
