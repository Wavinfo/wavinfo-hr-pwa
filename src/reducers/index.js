import { combineReducers } from 'redux';
import messages from './messages';
// import settings from './settings';

const rootReducer = combineReducers({
  messages,
  // settings
})

export default rootReducer;
