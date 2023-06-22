export const isValidPassword = (password, MIN_LENGTH = 8, MAX_LENGTH = 20) => {
  if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
    return {
      'passwordValid': false,
      'passwordMessage': `La longitud de la contraseña debe ser mayor que ${MIN_LENGTH} y menor que ${MAX_LENGTH}`
    };
  }

  let lower = (password.split(/[a-z]/).length - 1) > 0;
  let upper = (password.split(/[A-Z]/).length - 1) > 0;
  let digit = (password.split(/[0-9]/).length - 1) > 0;
  let special = (password.split(/[@_-]/).length - 1) > 0;

  if (!lower) {
    return {
      'passwordValid': false,
      'passwordMessage': 'La contraseña debe contener al menos 1 letra minúscula'
    };
  }
  if (!upper) {
    return {
      'passwordValid': false,
      'passwordMessage': 'La contraseña debe contener al menos 1 letra mayúscula'
    };
  };
  if (!digit) {
    return {
      'passwordValid': false,
      'passwordMessage': 'La contraseña debe contener al menos 1 dígito'
    };
  }
  if (!special) {
    return {
      'passwordValid': false,
      'passwordMessage': 'La contraseña debe contener al menos 1 carácter especial(@_ -) '
    };
  }

  return {
    'passwordValid': true,
    'passwordMessage': 'ok'
  };

}

export const isValidEmail = email => {
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const isValidOne = emailRegex.test(email);

  if (!isValidOne) {
    return {
      'emailValidate': false,
      'emailMessage': 'Is not a valid email'
    }
  }

  return {
    'emailValidate': true,
    'emailMessage': 'ok'
  }
}