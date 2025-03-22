// Note: try to return boolean value from all the functions

export const validateEmail = (email: string) => {
  const re = /^(?!.*\.\.)(^[^\.][^@\s]+@[^@\s]+\.[^@\s\.]+$)/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

export const validatePhoneNo = (phoneNo: string) => {
  return phoneNo.length >= 9;
};

export const validatePin = (pin: string) => {
  return pin.length === 6;
};
