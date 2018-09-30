import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import placeToAdd from './placeToAdd';
import cardToAdd from './cardToAdd';
import cardDisplayReducer from './cardDisplayReducer';

const store = combineReducers({
  user,
  login,
  placeToAdd,
  cardToAdd,
  cardDisplayReducer
});

export default store;
