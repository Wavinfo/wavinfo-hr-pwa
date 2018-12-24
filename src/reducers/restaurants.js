import { FETCHED_RESTAURANT_LIST } from './../actions';

const restaurants = (state = [], action) => {
  switch (action.type) {
    case FETCHED_RESTAURANT_LIST:
      return action.payload;
    default:
      return state;
  }
}

export default restaurants;
