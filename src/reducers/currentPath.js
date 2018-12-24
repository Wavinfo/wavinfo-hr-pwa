import { LINK_TO } from '../actions';

const currentPath = (state = 'messages', action) => {
  switch (action.type) {
    case LINK_TO:
      return action.payload;
    default:
      return state;
  }
}

export default currentPath;
