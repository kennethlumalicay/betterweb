import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './js/reducers/index.js';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

export const ServerStore = (initialState) =>
  createStore(
    allReducers,
    initialState,
    applyMiddleware(thunk)
  );

export const ClientStore = (initialState) =>
  createStore(
    allReducers,
    initialState,
    applyMiddleware(thunk, createSocketIoMiddleware(io(), "server/"))
  );