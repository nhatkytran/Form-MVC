const firstForm = '#form-1';
const secondForm = '#form-2';
const formsData = [firstForm, secondForm];

const actions = {
  signup: 'signup',
  login: 'login',
};

const groupClass = '.form-group';
const errorClass = '.form-message';
const invalidClass = 'invalid';

// Input ID
const nameInputId = '#fullname';
const emailInputId = '#email';
const passwordInputId = '#password';
const passwordConfirmId = '#password_confirmation';
const fileId = '#file';
const selectId = '#city';

// Input Class
const radioContainerClass = '.gender';
const radioClass = '.radio';
const checkboxContainerClass = '.rgb';
const checkboxClass = '.checkbox';

// Error
// Name has 1 error
const nameErrorMessage = 'Empty Input! Please try again';
// Email has 2 errors
const emailErrorEmptyMessage = 'Empty Input! Please try again';
const emailErrorInvalidMessage = 'Invalid email! Please try again';
// Password has 2 errors
const passwordEmptyMessage = 'Empty Input! Please try again';
const passwordInvalidMessage =
  'Minimum 8 characters includes uppercase-lowercase letter and number';
// Password confirm has 3 errors
const passwordFirstMessage = 'Enter your password first!';
const passwordConfirmEmptyMessage = 'Empty Input! Please try again';
const passwordConfirmMessage =
  'Password confirm does not match! Please try again';
// File has 1 error
const fileErrorMessage = 'No file chosen! Please try again';
// Select has 1 error
const selectErrorMessage = 'Empty Input! Please try again';
// Radio has 1 error
const radioErrorMessage = 'Chose your gender';
const checkboxErrorMessage = 'Make a choice';

export default formsData;
export {
  groupClass,
  errorClass,
  invalidClass,
  // Actions
  actions,
  // Input ID
  nameInputId,
  emailInputId,
  passwordInputId,
  passwordConfirmId,
  fileId,
  selectId,
  // Input Class
  radioContainerClass,
  radioClass,
  checkboxContainerClass,
  checkboxClass,
  // Input Error Message
  nameErrorMessage,
  emailErrorEmptyMessage,
  emailErrorInvalidMessage,
  passwordEmptyMessage,
  passwordInvalidMessage,
  passwordFirstMessage,
  passwordConfirmMessage,
  passwordConfirmEmptyMessage,
  fileErrorMessage,
  selectErrorMessage,
  radioErrorMessage,
  checkboxErrorMessage,
};
