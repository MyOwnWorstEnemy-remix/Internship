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

export {openSelestList, closeSelectList, checkForm};
