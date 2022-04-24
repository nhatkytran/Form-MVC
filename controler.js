import forms from './View/formView.js';
import nameInputViews from './View/nameInputView.js';
import emailViews from './View/emailView.js';
import passwordViews from './View/passwordView.js';
import passwordConfirmViews from './View/passwordConfirmView.js';

const hasInput = function (data) {
  return Boolean(data.trim());
};

const controlNameInput = function (view, data) {
  const regex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

  if (regex.test(data)) {
    if (hasInput(data)) return;

    view.isError(...view.getErrorSelector(), view.nameErrorMessage);
  }
  view.isError(...view.getErrorSelector(), view.nameErrorMessage);
};

const controlEmail = function (view, data) {
  const regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!hasInput(data)) {
    view.isError(...view.getErrorSelector(), view.emailErrorEmptyMessage);
    return;
  }

  if (!regex.test(data))
    view.isError(...view.getErrorSelector(), view.emailErrorInvalidMessage);
};

const controlPassword = function (view, data) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (data === '') {
    view.isError(...view.getErrorSelector(), view.passwordEmptyMessage);
    return;
  }

  if (!regex.test(data))
    view.isError(...view.getErrorSelector(), view.passwordInvalidMessage);
};

const controlConfirm = function (view, data) {
  const currentPassword = view.getCurrentPassword();

  if (!currentPassword) {
    view.isError(...view.getErrorSelector(), view.passwordFirstMessage);
    return;
  }

  if (data === '') {
    view.isError(...view.getErrorSelector(), view.passwordConfirmEmptyMessage);
    return;
  }

  console.log(data);
  console.log(currentPassword);

  if (data !== currentPassword) {
    view.isError(...view.getErrorSelector(), view.passwordConfirmMessage);
    return;
  }
};

const init = function () {
  // Name
  nameInputViews.forEach(view => {
    const input = view.getInputSelector();

    if (input) view.isRequired(input, controlNameInput.bind(null, view));
  });

  // Email
  emailViews.forEach(view => {
    const input = view.getEmailSelector();

    if (input) view.isRequired(input, controlEmail.bind(null, view));
  });

  // Password
  passwordViews.forEach(view => {
    const input = view.getPasswordSelector();

    if (input) view.isRequired(input, controlPassword.bind(null, view));
  });

  // Password Confirm
  passwordConfirmViews.forEach(view => {
    const input = view.getConfirmSelector();

    if (input) view.isRequired(input, controlConfirm.bind(null, view));
  });

  // Sunmit
  forms.forEach(form => form.isSubmit());
};

init();
