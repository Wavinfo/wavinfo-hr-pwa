const SOCKET_CONFIG = {
  url: 'http://192.168.1.4:9000/',
  reconnectAttemptTimes: 2
};

const SECRET_KEY = 'wavbo';

const SOCKET_STATUS_CODE = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  punching: 3
};

const GIST_URL = 'https://api.github.com/gists/ef19b4c3586c4aca7e719abd56fedd10';

export { SOCKET_CONFIG, SECRET_KEY, SOCKET_STATUS_CODE, GIST_URL };
