import { FETCHED_BULLETIN_MESSAGE } from '../actions';

const bulletinMessages = (state = [], action) => {
  switch (action.type) {
    case FETCHED_BULLETIN_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default bulletinMessages;
