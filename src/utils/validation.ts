export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z].{2,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!$@?-]).{8,}$/;
export const userRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$/;

export const validationRules = {
  passwordInput: {
    value: passwordRegex,
    message: 'Пароль слишком простой!',
  },
  usernameInput: {
    value: userRegex,
    message: 'От 3 до 20 символов, латиница и цифры',
  },
  mailInput: {
    value: emailRegex,
    message: 'Введите корректный адрес (например, user@mail.com)',
  },
};
