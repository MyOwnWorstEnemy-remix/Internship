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
const checkInput = (rules, input, errorText) => {
  const inputValue = input.value.trim();
  const checkedInput = inputValue.match(rules);
  if (!checkedInput || checkedInput[0] !== inputValue) {
    input.parentElement.classList.add(errorText);
    return false;
  }

  input.parentElement.classList.remove(errorText);
  return true;
};

const checkSelect = (select) => {
  if(select.textContent !== '') {
    return true;
  }
  const selectList = select.parentElement;
  selectList.parentElement.classList.add('select--error');
  return false;
};

const checkCheckbox = (checkbox, errorText) => {
  if(checkbox.checked) {
    return true;
  }

  checkbox.classList.add(errorText);
  return false;
};

export {openSelestList, closeSelectList, checkInput, checkSelect, checkCheckbox};
