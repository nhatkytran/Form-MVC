import { $ } from '../helps/docSelector.js';
import formsData, {
  groupClass,
  errorClass,
  invalidClass,
  passwordConfirmId,
} from '../script.js';
import debouncePassword from '../helps/debouncePassword.js';

class FormView {
  parentElement;
  groupClass = groupClass;
  errorClass = errorClass;
  invalidClass = invalidClass;
  passwordConfirmId = passwordConfirmId;
  timeout = 0.3;

  constructor(form) {
    if (form) this.parentElement = $(form);
  }

  isRequired(selector, handler) {
    selector.addEventListener('blur', function () {
      handler(this.value);
    });
  }

  #toggleError(groupSelector, errorSelector, error = false) {
    if (!error) {
      groupSelector.classList.remove(this.invalidClass);
      errorSelector.textContent = '';

      return;
    }

    groupSelector.classList.add(this.invalidClass);
    errorSelector.textContent = error;
  }

  isError(groupSelector, errorSelector, errorMessage) {
    this.#toggleError(groupSelector, errorSelector, errorMessage);
  }

  isOnInput(inputId, groupSelector, errorSelector) {
    const input = this.parentElement.querySelector(inputId);

    if (!input) return;

    const handleClearPassword = debouncePassword(() => {
      this.parentElement.querySelector(this.passwordConfirmId).value = '';
    }, this.timeout);

    input.addEventListener('input', () => {
      this.#toggleError(groupSelector, errorSelector);

      if (input.name === 'password') {
        handleClearPassword();
      }
    });
  }

  isSubmit() {
    this.parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  }
}

const forms = formsData.map(item => new FormView(item));

export default forms;
export { FormView };
