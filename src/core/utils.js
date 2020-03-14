export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Oops! We need a valid email address.';

  return '';
};

/*export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};*/

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const studentIDValidator = studentID => {
  if (!studentID || studentID.length <= 0) return 'StudentID cannot be empty.';

  return '';
};

export const phoneValidator = phone => {
  const re_phone = /^\d{10}$/;
  if (!phone || phone.length <= 0) return 'Phone cannot be empty.';
  if (!re_phone.test(phone)) return 'Invalid Phone Number';

  return '';
};

export const dateOfBirthValidator = dateOfBirth => {
  //const re2 = /^\[0-2][0-9]|[3][0-1]-\[0][0-9]|[1][0-2]-\d{4}$/;
  if (!dateOfBirth || dateOfBirth.length <= 0) return 'dateOfBirth cannot be empty.';
  //if (!re2.test(dateOfBirth)) return 'Oops! We need a valid Date of Birth.';

  return '';
};


export const centerNameValidator = centerName => {
  if (!centerName || centerName.length <= 0) return 'Center name cannot be empty.Please choose one';

  return '';
};