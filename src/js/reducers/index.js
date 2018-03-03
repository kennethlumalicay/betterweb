import {combineReducers} from 'redux';
import UserReducer from './reducer-user';
import UsersReducer from './reducer-users';
import PostsReducer from './reducer-posts';
import CommentsReducer from './reducer-comments';
import NotifReducer from './reducer-notif';

const allReducers = combineReducers({
  user: UserReducer,
  users: UsersReducer,
  posts: PostsReducer,
  comments: CommentsReducer,
  notif: NotifReducer
});

export default allReducers;