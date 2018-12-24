import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import 'materialize-css/dist/js/materialize';

import rootReducers from './reducers';
import Saga from './sagas';
import './stylesheets/application.scss';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers /* preloadedState, */,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(Saga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
