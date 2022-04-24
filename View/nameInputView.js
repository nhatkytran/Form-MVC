import { $ } from '../helps/docSelector.js';
import formsData, { nameInputId, nameErrorMessage } from '../script.js';
import { FormView } from './formView.js';

class NameInputView extends FormView {
  #inputId = nameInputId;
  nameErrorMessage = nameErrorMessage;

  constructor(form) {
    super();
    this.parentElement = $(form);
    if (this.parentElement.querySelector(this.#inputId))
      this.isOnInput(this.#inputId, ...this.getErrorSelector());
  }

  getInputSelector() {
    return this.parentElement.querySelector(this.#inputId);
  }

  getErrorSelector() {
    const groupSelector = this.getInputSelector().closest(this.groupClass);
    const errorSelector = groupSelector.querySelector(this.errorClass);

    return [groupSelector, errorSelector];
  }
}

const nameInputViews = formsData.map(item => new NameInputView(item));

export default nameInputViews;
