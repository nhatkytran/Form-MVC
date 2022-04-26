// Utilities
import checkAction from './helps/checkAction.js';
// Controler
import { actions } from './script.js';
// Model
import state from './model.js';
import * as model from './model.js';
// Views
import forms from './View/formView.js';
import nameInputViews from './View/nameInputView.js';
import emailViews from './View/emailView.js';
import passwordViews from './View/passwordView.js';
import passwordConfirmViews from './View/passwordConfirmView.js';
import fileViews from './View/fileView.js';
import selectViews from './View/selectView.js';
import radioViews from './View/radioView.js';
import checkViews from './View/checkBoxView.js';

const hasInput = function (data) {
  return Boolean(data.trim());
};

// Control functions return true if input has no error
// Return true - false helps check valid when submit form

// Check hasInput in 2 conditions (check empty value and '<space>' value)
const controlNameInput = function (view, data) {
  const regex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

  if (regex.test(data)) {
    if (!hasInput(data)) {
      view.isError(...view.getErrorSelector(), view.nameErrorMessage);
      return false;
    }
  }

  if (!hasInput(data)) {
    view.isError(...view.getErrorSelector(), view.nameErrorMessage);
    return false;
  }

  return true;
};

const controlEmail = function (view, index, data) {
  // If "Login": Do not check email before submitting
  if (checkAction(index) === actions.login) return;

  const regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!hasInput(data)) {
    view.isError(...view.getErrorSelector(), view.emailErrorEmptyMessage);
    return false;
  }

  if (!regex.test(data)) {
    view.isError(...view.getErrorSelector(), view.emailErrorInvalidMessage);
    return false;
  }

  return true;
};

const controlPassword = function (view, index, data) {
  // If "Login": Do not check password before submitting
  if (checkAction(index) === actions.login) return;

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (data === '') {
    view.isError(...view.getErrorSelector(), view.passwordEmptyMessage);
    return false;
  }

  if (!regex.test(data)) {
    view.isError(...view.getErrorSelector(), view.passwordInvalidMessage);
    return false;
  }

  return true;
};

const controlConfirm = function (view, data) {
  const currentPassword = view.getCurrentPassword();

  if (!currentPassword) {
    view.isError(...view.getErrorSelector(), view.passwordFirstMessage);
    return false;
  }

  if (data === '') {
    view.isError(...view.getErrorSelector(), view.passwordConfirmEmptyMessage);
    return false;
  }

  if (data !== currentPassword) {
    view.isError(...view.getErrorSelector(), view.passwordConfirmMessage);
    return false;
  }

  return true;
};

const controlFile = function (view, data) {
  if (!data) {
    view.isError(...view.getErrorSelector(), view.fileErrorMessage);
    return false;
  }

  return true;
};

const controlSelect = function (view, data) {
  if (!data) {
    view.isError(...view.getErrorSelector(), view.selectErrorMessage);
    return false;
  }

  return true;
};

// Have no control for Radio and Checkbox
// Handle Radio and Checkbox at Submit event

// Use IIFE in "controlForm Function" help reuse "view Variable"
const controlForm = function (index) {
  //Check Login first
  if (checkAction(index) === actions.login) {
    const emailView = emailViews[index];
    const emailValue = emailView.getEmailSelector().value;
    const passwordView = passwordViews[index];
    const passwordValue = passwordView.getPasswordSelector().value;
    const data = {
      email: emailValue,
      password: passwordValue,
    };

    model.setStateLogin(data);

    return;
  }

  // Check Singup
  // If any of inputs has errors => isValid = false;
  let isValid = true;
  const data = {};

  // Name
  (() => {
    const view = nameInputViews[index];
    const input = view.getInputSelector();

    if (input) isValid = controlNameInput(view, input.value);
    if (isValid) data.name = input.value;
  })();

  // Email
  (() => {
    const view = emailViews[index];
    const email = view.getEmailSelector();

    if (email) isValid = controlEmail(view, index, email.value);
    if (isValid) data.email = email.value;
  })();

  // Password
  (() => {
    const view = passwordViews[index];
    const password = view.getPasswordSelector();

    if (password) isValid = controlPassword(view, index, password.value);
    if (isValid) data.password = password.value;
  })();

  // Password Confirm
  (() => {
    const view = passwordConfirmViews[index];
    const passwordConfirm = view.getConfirmSelector();

    if (passwordConfirm) isValid = controlConfirm(view, passwordConfirm.value);
  })();

  // File
  (() => {
    const view = fileViews[index];
    const file = view.getFileSelector();

    if (file) isValid = controlFile(view, file.value);
    if (isValid) {
      const fileUrl = URL.createObjectURL(file.files[0]);
      const fileData = file.files[0];

      fileData['file_url'] = fileUrl;
      data.file = fileData;
    }
  })();

  // Select
  (() => {
    const view = selectViews[index];
    const select = view.getSelectSelector();

    if (select) isValid = controlSelect(view, select.value);
    if (isValid) data.select = select.value;
  })();

  // Radio
  (() => {
    const view = radioViews[index];
    const radios = view.getRadioSelectors();

    if (!radios.length) return;

    const checked = radios.some(radio => radio.checked);

    if (!checked) {
      view.isError(...view.getErrorSelector(), view.radioErrorMessage);
      isValid = false;
    }

    if (checked) data.radio = radios.filter(radio => radio.checked)[0].value;
  })();

  // Checkbox
  (() => {
    const view = checkViews[index];
    const checkboxs = view.getCheckboxSelectors();

    if (!checkboxs.length) return;

    const checked = checkboxs.some(checkbox => checkbox.checked);

    if (!checked) {
      view.isError(...view.getErrorSelector(), view.checkboxErrorMessage);
      isValid = false;
    }

    if (checked)
      data.checkbox = checkboxs
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
  })();

  // Submit
  if (isValid) model.setStateSignup(data);
};

const init = function () {
  // Name
  nameInputViews.forEach(view => {
    const input = view.getInputSelector();

    if (input) view.isRequired(input, controlNameInput.bind(null, view));
  });

  // Email
  emailViews.forEach((view, index) => {
    const input = view.getEmailSelector();

    if (input) view.isRequired(input, controlEmail.bind(null, view, index));
  });

  // Password
  passwordViews.forEach((view, index) => {
    const input = view.getPasswordSelector();

    if (input) view.isRequired(input, controlPassword.bind(null, view, index));
  });

  // Password Confirm
  passwordConfirmViews.forEach(view => {
    const input = view.getConfirmSelector();

    if (input) view.isRequired(input, controlConfirm.bind(null, view));
  });

  // File
  fileViews.forEach(view => {
    const input = view.getFileSelector();

    if (input) view.isRequired(input, controlFile.bind(null, view));
  });

  // Select
  selectViews.forEach(view => {
    const input = view.getSelectSelector();

    if (input) view.isRequired(input, controlSelect.bind(null, view));
  });

  // Radio and Checkbox (checked at submit event)

  // Sunmit
  forms.forEach((form, index) => form.isSubmit(controlForm, index));
};

init();
