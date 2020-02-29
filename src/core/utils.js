export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    sout.println("error");
    return 'Email cannot be empty.';}
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

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

export const studentIDValidator = name => {
  if (!studentID || studentID.length <= 0) return 'StudentID cannot be empty.';

  return '';
};

export const phoneValidator = name => {
  if (!phone || phone.length <= 0) return 'Phone cannot be empty.';

  return '';
};

export const dateOfBirthValidator = name => {
  if (!dateOfBirth || dateOfBirth.length <= 0) return 'dateOfBirth cannot be empty.';

  return '';
};


export const centerNameValidator = name => {
  if (!centerName || centerName.length <= 0) return 'center name cannot be empty.';

  return '';
};