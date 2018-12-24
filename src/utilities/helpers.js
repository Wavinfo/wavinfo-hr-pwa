import CryptoJS from 'crypto-js';
import { SECRET_KEY, SOCKET_STATUS_CODE, GIST_URL } from './constants';

const encrypt = text => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString(); // cipher text
};

const decrypt = cipherText => {
  let bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8); // origin text
};

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

class socketStatusConstructor {
  constructor() {
    Object.entries(SOCKET_STATUS_CODE).forEach(([status, code]) => {
      this[status] = code;
    });
  }

  humanize(statusCode) {
    let humanizeStatus = '';
    Object.entries(this).forEach(([status, code]) => {
      if (code === statusCode) {
        humanizeStatus = status;
      }
    });
    return humanizeStatus || `There is no statusCode ${statusCode}`;
  }
}

const socketStatus = new socketStatusConstructor();

const getLocalStorage = () => {
  return new Promise(resolve => {
    const settings = window.localStorage.getItem('settings');
    if (!settings) {
      resolve(null);
      return;
    }

    const { username, password } = JSON.parse(settings);
    resolve({
      username,
      password: decrypt(password)
    });
  });
}

const updateLocalStorage = ({ username = '', password = ''}) => {
  window.localStorage.setItem(
    'settings',
    JSON.stringify({
      username,
      password: encrypt(password)
    })
  );
}

const fetchGist = () => {
  return fetch(GIST_URL)
    .then(response => response.json())
    .catch(error => {
      console.log(`取得資料時發生錯誤（${error}）`)
    })
}

export { encrypt, decrypt, socketStatus, sample, getLocalStorage, updateLocalStorage, fetchGist };
