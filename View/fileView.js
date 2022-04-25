import { $ } from '../helps/docSelector.js';
import formsData, { fileId, fileErrorMessage } from '../script.js';
import { FormView } from './formView.js';

class fileView extends FormView {
  #inputId = fileId;
  fileErrorMessage = fileErrorMessage;

  constructor(form) {
    super();
    this.parentElement = $(form);
    if (this.parentElement.querySelector(this.#inputId))
      this.isOnInput(this.#inputId, ...this.getErrorSelector());
  }

  getFileSelector() {
    return this.parentElement.querySelector(this.#inputId);
  }

  getErrorSelector() {
    const groupSelector = this.getFileSelector().closest(this.groupClass);
    const errorSelector = groupSelector.querySelector(this.errorClass);

    return [groupSelector, errorSelector];
  }
}

const fileViews = formsData.map(item => new fileView(item));

export default fileViews;
