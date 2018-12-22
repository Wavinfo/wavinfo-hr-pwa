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
// export const GET_SETTING

// export const UPDATE_SETTING = 'UPDATE_SETTING';
// export const updateSetting = ({ username, password } = {}) => {
//   return {
//     type: UPDATE_SETTING,
//     payload: {
//       username,
//       password
//     }
//   }
// }
