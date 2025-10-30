
export function validateEmail(email) {
  return email.includes("@") && email.includes(".") && email.length > 5;
}
export function validatePassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password)
  );
}


export function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}
export function Role(role) {
  return role === "doctor"
}
export function validateName(name) {
  return /^[A-Za-z ]+$/.test(name) && name.length > 1;
}



export function confirm() {
  if (validateEmail(email) && validatePassword(password) && validateConfirmPassword(confirmPassword) && validateName(name)) {
    return true;
  }
}
export function validatePhone(phone) {
  const egyptianPhoneRegex = /^(010|011|012|015)\d{8}$/;
  return egyptianPhoneRegex.test(phone);
}