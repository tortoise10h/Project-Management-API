const specialCharacterRgx = /[!@#$%^&*(),.?":{}|<>]/g;

const splitName = (fullName) => {
  const nameSplit = fullName.trim().split(' ');
  const validatedString = Array.from(nameSplit).filter(str => !specialCharacterRgx.test(str) && str !== '');
  const firstName = validatedString.pop();
  return {
    firstName,
    lastName: validatedString.join(' '),
  };
};
module.exports = splitName;
