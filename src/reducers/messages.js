import { ADD_MESSAGE } from './../actions'

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
    default:
      return state;
  }
}

export default messages;
