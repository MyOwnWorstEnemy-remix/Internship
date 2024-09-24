// Делает ссылку недоступной
function disableLink(link) {
  link.classList.add('disabled');
  link.setAttribute('data-href', link.href);
  link.href = '';
  link.setAttribute('aria-disabled', 'true');
  link.setAttribute('tabindex', '-1');
}

// Возвращает ссылке стандартное поведение
function enableLink(link) {
  link.classList.remove('disabled');
  link.href = link.getAttribute('data-href');
  link.removeAttribute('data-href');
  link.removeAttribute('aria-disabled');
  link.removeAttribute('tabindex');
}

document.body.addEventListener('click', (event) => {
  if (event.target.nodeName === 'A' && event.target.getAttribute('aria-disabled') === 'true') {
    event.preventDefault();
  }
});

const links = document.querySelectorAll('a');

links.forEach((link) => {
  if (link.classList.contains('disabled')) {
    disableLink(link);
  }
});

export {disableLink, enableLink};
