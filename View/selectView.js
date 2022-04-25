import { $ } from '../helps/docSelector.js';
import formsData, { selectId, selectErrorMessage } from '../script.js';
import { FormView } from './formView.js';

class SelectView extends FormView {
  #inputId = selectId;
  selectErrorMessage = selectErrorMessage;

  constructor(form) {
    super();
    this.parentElement = $(form);
    if (this.parentElement.querySelector(this.#inputId))
      this.isOnInput(this.#inputId, ...this.getErrorSelector());
  }

  getSelectSelector() {
    return this.parentElement.querySelector(this.#inputId);
  }

  getErrorSelector() {
    const groupSelector = this.getSelectSelector().closest(this.groupClass);
    const errorSelector = groupSelector.querySelector(this.errorClass);

    return [groupSelector, errorSelector];
  }
}

const selectViews = formsData.map(item => new SelectView(item));

export default selectViews;
