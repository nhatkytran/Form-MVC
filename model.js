const state = {
  signup: {
    name: null,
    email: null,
    password: null,
    file: null,
    select: null,
    radio: null,
    checkbox: null,
  },
  login: {
    email: null,
    password: null,
  },
};

const getStateSignup = () => {
  return state.signup;
};

const getStateLogin = () => {
  return state.login;
};

const setStateSignup = signupData => {
  state.signup = signupData;
  console.log(getStateSignup());
  resetStateSignup();
};

const setStateLogin = loginData => {
  state.login = loginData;
  console.log(getStateLogin());
  resetStateLogin();
};

const resetStateSignup = () => {
  state.signup = {
    name: null,
    email: null,
    password: null,
    file: null,
    city: null,
    gender: null,
    rgb: null,
  };
};

const resetStateLogin = () => {
  state.login = {
    email: null,
    password: null,
  };
};

export default state;
export {
  setStateSignup,
  setStateLogin,
  getStateSignup,
  getStateLogin,
  resetStateSignup,
  resetStateLogin,
};
