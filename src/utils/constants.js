export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_CONFLICT = 409;
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
export const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка.';
export const MOVIES_URL = 'https://api.nomoreparties.co';
export const SHORT_MOVIE = 40;
export const DEBOUNCE_TIME_MS = 300;
export const DESKTOP_INIT_CARDS = 16;
export const OLDDESKTOP_INIT_CARDS = 9;
export const TABLET_INIT_CARDS = 8;
export const MOBILE_INIT_CARDS = 5;
export const DESKTOP_MORE_CARDS = 4;
export const OLDDESKTOP_MORE_CARDS = 3;
export const TABLET_MORE_CARDS = 2;
export const MOBILE_MORE_CARDS = 2;
export const DESKTOP_RESOLUTION = 1280;
export const OLDDESKTOP_RESOLUTION = 1153;
export const TABLET_RESOLUTION = 630;
export const MOBILE_RESOLUTION = 620;

export const REG_EMAIL =
// /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
//  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
 /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
export const REG_NAME = /^[a-zA-Zа-яА-Я\sё-]+$/;

export function validateEmail(email) {
  if (email !== undefined) {
    if (email.length === 0) {
      return { invalid: true, message: 'Это поле должно быть заполнено' };
    } else if (!REG_EMAIL.test(email.toLowerCase())) {
      return { invalid: true, message: 'Неверный формат почты!' };
    } else if (REG_EMAIL.test(email.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
}

export function validateName(name) {
  if (name !== undefined) {
    if (name.length === 0) {
      return { invalid: true, message: 'Это поле должно быть заполнено' };
    } else if (!REG_NAME.test(name.toLowerCase())) {
      return {
        invalid: true,
        message:
          'Используйте только латиницу, кириллицу, пробел или дефис!'
      };
    } else if (REG_NAME.test(name.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
}
