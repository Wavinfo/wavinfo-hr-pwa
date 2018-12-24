/**
 * Messages Actions
 */
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessage = ({ speaker = 'wavbo', text } = {}) => {
  return {
    type: ADD_MESSAGE,
    payload: {
      speaker,
      text
    }
  };
};

/**
 * Settings Actions
 */

export const UPDATE_SETTING = 'UPDATE_SETTING';
export const updateSetting = ({ username, password } = {}) => {
  return {
    type: UPDATE_SETTING,
    payload: {
      username,
      password
    }
  };
};

/**
 * Local Storage
 */
export const GET_LOCAL_STORAGE_ASYNC = 'GET_LOCAL_STORAGE_ASYNC';
export const getLocalStorageAsync = () => {
  return {
    type: GET_LOCAL_STORAGE_ASYNC
  };
};

export const UPDATE_LOCAL_STORAGE = 'UPDATE_LOCAL_STORAGE';
export const updateLocalStorage = ({ username, password }) => {
  return {
    type: UPDATE_LOCAL_STORAGE,
    payload: {
      username,
      password
    }
  };
};

/**
 * Pages
 */
export const LINK_TO = 'LINK_TO';
export const linkTo = path => {
  return {
    type: LINK_TO,
    payload: path
  };
};

/**
 * Fetch Gist Data
 */

export const FETCH_GIST_ASYNC = 'FETCH_GIST_ASYNC';
export const fetchGistAsync = () => {
  return {
    type: FETCH_GIST_ASYNC
  }
}
export const FETCHED_BULLETIN_MESSAGE = 'FETCHED_BULLETIN_MESSAGE';
export const FETCHED_RESTAURANT_LIST = 'FETCHED_RESTAURANT_LIST';
