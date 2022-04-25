import { $ } from '../helps/docSelector.js';
import formsData, {
  checkboxClass,
  checkboxContainerClass,
  checkboxErrorMessage,
} from '../script.js';
import { FormView } from './formView.js';

class CheckView extends FormView {
  #inputClass = checkboxClass;
  inputContainerClass = checkboxContainerClass;
  checkboxErrorMessage = checkboxErrorMessage;

  constructor(form) {
    super();
    this.parentElement = $(form);
    if (this.parentElement.querySelector(this.inputContainerClass))
      this.isOnCheck(
        this.inputContainerClass,
        this.#inputClass,
        ...this.getErrorSelector()
      );
  }

  getCheckboxSelectors() {
    return [...this.parentElement.querySelectorAll(this.#inputClass)];
  }

  getErrorSelector() {
    const groupSelector = this.parentElement
      .querySelector(this.#inputClass)
      .closest(this.groupClass);
    const errorSelector = groupSelector.querySelector(this.errorClass);

    return [groupSelector, errorSelector];
  }
}

const checkViews = formsData.map(item => new CheckView(item));

export default checkViews;
