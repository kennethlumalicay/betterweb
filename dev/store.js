import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './js/reducers/index.js';

const Store = (initialState) =>
  createStore(
    allReducers,
    initialState,
    applyMiddleware(thunk)
  );
export default Store;