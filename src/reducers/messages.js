import { ADD_MESSAGE, RESET_MESSAGE } from './../actions'

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        {
          id: state.length + 1,
          speaker: action.payload.speaker,
          text: action.payload.text,
        }
      ]
    case RESET_MESSAGE:
      return [];
    default:
      return state;
  }
}

export default messages;
