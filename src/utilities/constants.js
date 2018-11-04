const socketConfig = {
  url: 'http://192.168.1.4:9000/',
  reconnectAttemptTimes: 3
};

const secretKey = 'wavbo';

const socketStatusCode = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  punching: 3
};

export { socketConfig, secretKey, socketStatusCode };
