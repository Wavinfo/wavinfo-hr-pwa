import CryptoJS from 'crypto-js';
import { secretKey, socketStatusCode } from './constants';

const encrypt = text => {
  return CryptoJS.AES.encrypt(text, secretKey).toString(); // cipher text
};

const decrypt = cipherText => {
  let bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8); // origin text
};

class socketStatusConstructor {
  constructor() {
    Object.entries(socketStatusCode).forEach(([status, code]) => {
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

export { encrypt, decrypt, socketStatus };
