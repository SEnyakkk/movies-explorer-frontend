


import pic from '../images/pic__COLOR_pic.png';
import pic1 from '../images/pic__COLOR_pic-1.png';
import pic2 from '../images/pic__COLOR_pic-2.png';
import pic3 from '../images/pic__COLOR_pic-3.png';
import pic4 from '../images/pic__COLOR_pic-4.png';
import pic5 from '../images/pic__COLOR_pic-5.png';
import pic6 from '../images/pic__COLOR_pic-6.png';
import pic7 from '../images/pic__COLOR_pic-7.png';
import pic8 from '../images/pic__COLOR_pic-8.png';
import pic9 from '../images/pic__COLOR_pic-9.png';
import pic10 from '../images/pic__COLOR_pic-10.png';
import pic11 from '../images/pic__COLOR_pic-11.png';
import pic12 from '../images/pic__COLOR_pic-12.png';
import pic13 from '../images/pic__COLOR_pic-13.png';
import pic14 from '../images/pic__COLOR_pic-14.png';
import pic15 from '../images/pic__COLOR_pic-15.png';

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

export const movieCardList = [
  {
    id: 1,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic,
    saved: true
  },
  {
    id: 2,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic1,
    saved: true
  },
  {
    id: 3,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic2,
    saved: true
  },
  {
    id: 4,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic3,
    saved: false,
    delete: true
  },
  {
    id: 5,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic4,
    saved: false
  },
  {
    id: 6,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic5,
    saved: false
  },
  {
    id: 7,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic6,
    saved: false
  },
  {
    id: 8,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic7,
    saved: false
  },
  {
    id: 9,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic8,
    saved: false
  },
  {
    id: 10,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic9,
    saved: false
  },
  {
    id: 11,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic10,
    saved: false
  },
  {
    id: 12,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic11,
    saved: false
  },
  {
    id: 13,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic12,
    saved: false
  },
  {
    id: 14,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic13,
    saved: false
  },
  {
    id: 15,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic14,
    saved: false
  },
  {
    id: 16,
    nameRu: '33 слова о дизайне',
    duration: '1ч42м',
    image: pic15,
    saved: false
  },
]
