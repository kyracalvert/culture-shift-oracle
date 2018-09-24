import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import placeToAdd from './placeToAdd';

const store = combineReducers({
  user,
  login,
  placeToAdd,
});

export default store;
