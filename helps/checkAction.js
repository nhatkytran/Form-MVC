import { $ } from './docSelector.js';
import formsData, { actions } from '../script.js';

const checkAction = function (index) {
  const form = $(formsData[index]);

  if (form.classList.contains(actions.signup)) return actions.signup;
  if (form.classList.contains(actions.login)) return actions.login;
};

export default checkAction;
