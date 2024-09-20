// Работа аккордеонов
const faqQuestionList = document.querySelectorAll('.faq__question');

const onQuestionClick = (evt) => {
  const question = evt.target.closest('.faq__question');
  question.classList.toggle('faq__question--active');
};

const onQuestionKeydown = (evt) => {
  if(evt.key === 'Enter') {
    onQuestionClick(evt);
  }
};

faqQuestionList.forEach((question) => {
  question.addEventListener('click', onQuestionClick);
  question.addEventListener('keydown', onQuestionKeydown);
});
