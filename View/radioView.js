import { $ } from '../helps/docSelector.js';
import formsData, {
  radioClass,
  radioContainerClass,
  radioErrorMessage,
} from '../script.js';
import { FormView } from './formView.js';

class RadioView extends FormView {
  #inputClass = radioClass;
  inputContainerClass = radioContainerClass;
  radioErrorMessage = radioErrorMessage;

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

  getRadioSelectors() {
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

const radioViews = formsData.map(item => new RadioView(item));

export default radioViews;
