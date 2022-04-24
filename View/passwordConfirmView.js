import { $ } from '../helps/docSelector.js';
import formsData, {
  passwordConfirmId,
  passwordInputId,
  passwordFirstMessage,
  passwordConfirmMessage,
  passwordConfirmEmptyMessage,
} from '../script.js';
import { FormView } from './formView.js';

class PasswordConfirmView extends FormView {
  #inputId = passwordConfirmId;
  #passwordId = passwordInputId;
  passwordFirstMessage = passwordFirstMessage;
  passwordConfirmMessage = passwordConfirmMessage;
  passwordConfirmEmptyMessage = passwordConfirmEmptyMessage;

  constructor(form) {
    super();
    this.parentElement = $(form);
    if (this.parentElement.querySelector(this.#inputId))
      this.isOnInput(this.#inputId, ...this.getErrorSelector());
  }

  getCurrentPassword() {
    return this.parentElement.querySelector(this.#passwordId).value;
  }

  getConfirmSelector() {
    return this.parentElement.querySelector(this.#inputId);
  }

  getErrorSelector() {
    const groupSelector = this.getConfirmSelector().closest(this.groupClass);
    const errorSelector = groupSelector.querySelector(this.errorClass);

    return [groupSelector, errorSelector];
  }
}

const passwordConfirmViews = formsData.map(
  item => new PasswordConfirmView(item)
);

export default passwordConfirmViews;
