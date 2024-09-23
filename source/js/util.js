const nameRules = /[a-zA-Zа-яёА-ЯЁ ]+/;
const phoneRules = /[+][7][^\p{L}]+/gu;

// Открыть выпадающий список
const openSelestList = (select, selectLabels) => {
  select.setAttribute('data-state', 'active');
  selectLabels.forEach((label) => {
    label.setAttribute('tabindex', '0');
  });
};

// Закрыть выпадающий список
const closeSelectList = (select, selectLabels) => {
  select.setAttribute('data-state', '');
  selectLabels.forEach((label) => {
    label.setAttribute('tabindex', '-1');
  });
};

// Проверить текстовый ввод
const checkInput = (rules, input) => {
  const inputValue = input.value.trim();
  const checkedInput = inputValue.match(rules);
  if (!checkedInput || checkedInput[0] !== inputValue) {
    input.parentElement.classList.add('text-input--error');
    return false;
  }

  input.parentElement.classList.remove('text-input--error');
  return true;
};

const checkCheckbox = (checkbox) => {
  if(checkbox.checked) {
    return true;
  }

  checkbox.classList.add('checkbox__input--error');
  return false;
};

const checkForm = (form, nameInput, phoneInput, modalSelectTitle, checkbox) => {
  const nameCheckResult = checkInput(nameRules, nameInput);
  const phoneCheckResult = checkInput(phoneRules, phoneInput);
  const checkboxCheckResult = checkCheckbox(checkbox);
  checkbox.reportValidity();
  phoneInput.reportValidity();
  nameInput.reportValidity();
  if(nameCheckResult && phoneCheckResult && checkboxCheckResult) {
    form.submit();
    form.reset();
    modalSelectTitle.textContent = '';
  }
};

// Создать слайды новостей
const news = document.querySelector('.news');
const newsList = news.querySelector('.news-slider__wrapper');

const slideTemplate = document.querySelector('#news-slide-template').content;
const slideTemplateItem = slideTemplate.querySelector('.news-slider__slide');

const clearSlides = () => {
  const slideList = newsList.querySelectorAll('.news-slider__slide');

  for (let i = slideList.length - 1; i >= 0; i--) {
    newsList.removeChild(slideList[i]);
  }
};

const renderSlide = (slidesInfo) => {
  const slideFragment = document.createDocumentFragment();

  slidesInfo.forEach(({imgSrc, imgSrcset, sourceSrcset, imgAlt, title, description, date}) =>  {
    const slide = slideTemplateItem.cloneNode(true);
    const sources = slide.querySelectorAll('source');
    const image = slide.querySelector('img');
    image.src = imgSrc;
    image.srcset = imgSrcset;
    image.alt = imgAlt;
    sourceSrcset.forEach(({id, type, media, srcset, width, height})=>{
      sources[id].type = type;
      sources[id].media = media;
      sources[id].srcset = srcset;
      sources[id].width = width;
      sources[id].height = height;
    }
    );
    slide.querySelector('.news-slider__title').textContent = title;
    slide.querySelector('p').textContent = description;
    slide.querySelector('.news-slider__date').textContent = date;
    slideFragment.appendChild(slide);
  })

  clearSlides();
  newsList.appendChild(slideFragment);
};


export {openSelestList, closeSelectList, checkForm, renderSlide};
