import { getLocalStorage, fetchGist } from '../utilities/helpers';
import { put, takeEvery, all } from 'redux-saga/effects';
import {
  FETCHED_BULLETIN_MESSAGE,
  FETCHED_RESTAURANT_LIST,
  UPDATE_SETTING,
  GET_LOCAL_STORAGE_ASYNC,
  FETCH_GIST_ASYNC
} from './../actions';

/**
 * fetch data from gist
 */
export function* fetchGistAsync() {
  const data = yield fetchGist();

  yield put({
    type: FETCHED_BULLETIN_MESSAGE,
    payload: JSON.parse(data.files['messages.json'].content).bulletinMessages
  });

  yield put({
    type: FETCHED_RESTAURANT_LIST,
    payload: JSON.parse(data.files['messages.json'].content).restaurants
  });
}

export function* watchFetchGistAsync() {
  yield takeEvery(FETCH_GIST_ASYNC, fetchGistAsync);
}

/**
 * Local Storage
 */
export function* getLocalStorageAsync() {
  const settings = yield getLocalStorage();
  if (!settings) {
    return;
  }
  yield put({ type: UPDATE_SETTING, payload: settings });
}

export function* watchGetLocalStorageAsync() {
  yield takeEvery(GET_LOCAL_STORAGE_ASYNC, getLocalStorageAsync);
}

export default function* rootSaga() {
  yield all([watchGetLocalStorageAsync(), watchFetchGistAsync()]);
}
