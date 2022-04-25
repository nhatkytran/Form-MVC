const debouncePassword = function (fn, second = 1) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      return fn(...args);
    }, second * 1000);
  };
};

export default debouncePassword;
