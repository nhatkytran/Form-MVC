import { $ } from '../helps/docSelector.js';
import formsData, {
  emailInputId,
  emailErrorEmptyMessage,
  emailErrorInvalidMessage,
} from '../script.js';
import { FormView } from './formView.js';

class EmailView extends FormView {
  #inputId = emailInputId;
  emailErrorEmptyMessage = emailErrorEmptyMessage;
  emailErrorInvalidMessage = emailErrorInvalidMessage;

  constructor(form) {
    super();
    this.parentElement = $(form);
    if (this.parentElement.querySelector(this.#inputId))
      this.isOnInput(this.#inputId, ...this.getErrorSelector());
  }

  getEmailSelector() {
    return this.parentElement.querySelector(this.#inputId);
  }

  getErrorSelector() {
    const groupSelector = this.getEmailSelector().closest(this.groupClass);
    const errorSelector = groupSelector.querySelector(this.errorClass);

    return [groupSelector, errorSelector];
  }
}

const emailViews = formsData.map(item => new EmailView(item));

export default emailViews;
