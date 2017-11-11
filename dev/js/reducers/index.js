import {combineReducers} from 'redux';
import UserReducer from './reducer-user';
import AdminsReducer from './reducer-admins';

const allReducers = combineReducers({
  user: UserReducer,
  admins: AdminsReducer
});

export default allReducers;