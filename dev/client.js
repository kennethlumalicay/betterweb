// https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md
import React from 'react'; // eslint-disable-line
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './js/components/App.js';
import Store from './store.js';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = Store(preloadedState);

// BrowserRouter for client side
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);