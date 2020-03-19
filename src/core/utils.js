export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const mobileValidator = mobile => {
  if (!mobile || mobile.length <= 0) return 'Mobile cannot be empty.';
  
  return '';
};

export const stateValidator = state => {
  if (!state || state.length <= 0) return 'State cannot be empty.';
  
  return '';
};

export const cityValidator = city => {
  if (!city || city.length <= 0) return 'City cannot be empty.';
  
  return '';
};


