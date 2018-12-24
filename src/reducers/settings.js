import { updateLocalStorage } from './../utilities/helpers'
import { UPDATE_SETTING } from './../actions';

const settings = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SETTING:

      updateLocalStorage(action.payload)

      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default settings;
