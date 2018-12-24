import { combineReducers } from 'redux';
import messages from './messages';
import settings from './settings';
import currentPath from './currentPath';
import bulletinMessages from './bulletinMessages';
import restaurants from './restaurants';

const rootReducer = combineReducers({
  messages,
  settings,
  currentPath,
  bulletinMessages,
  restaurants
})

export default rootReducer;
