import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import placeToAdd from './placeToAdd';
import cardToAdd from './cardToAdd';

const store = combineReducers({
  user,
  login,
  placeToAdd,
  cardToAdd,
});

export default store;
