import { $ } from '../helps/docSelector.js';
import formsData, {
  passwordInputId,
  passwordEmptyMessage,
  passwordInvalidMessage,
} from '../script.js';
import { FormView } from './formView.js';

class PasswordView extends FormView {
  #inputId = passwordInputId;
  passwordEmptyMessage = passwordEmptyMessage;
  passwordInvalidMessage = passwordInvalidMessage;

  constructor(form) {
    super();
    this.parentElement = $(form);

    if (this.parentElement.querySelector(this.#inputId))
      this.isOnInput(this.#inputId, ...this.getErrorSelector());
  }

  getPasswordSelector() {
    return this.parentElement.querySelector(this.#inputId);
  }

  getErrorSelector() {
    const groupSelector = this.getPasswordSelector().closest(this.groupClass);
    const errorSelector = groupSelector.querySelector(this.errorClass);

    return [groupSelector, errorSelector];
  }
}

const passwordViews = formsData.map(item => new PasswordView(item));

export default passwordViews;
