import React, { Component } from 'react'; // eslint-disable-line
import { Route, Switch } from 'react-router-dom';
import Home from './../components/Home.js';
import Nav from './../containers/Nav.js';
import UserPage from './../containers/UserPage.js';
import PostPage from './../containers/PostPage.js';
import AdminPage from './../containers/AdminPage.js';
import { logPageView } from './../config/google-analytics';

class Routes extends Component {
  render() {
    return (
      <section id='route'>
        <Route component={Analytics}/>
        <Route component={ScrollToTop}/>
        <Route component={Nav}/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/user/:uid' component={UserPage}/>
          <Route path='/post/:pid' component={PostPage}/>
          <Route path='/admin' component={AdminPage}/>
          <Route component={NotFound}/>
        </Switch>
      </section>
    );
  }
}

// Always scroll to top on route change
const ScrollToTop = () => {
  if(typeof window !== 'undefined')
    window.scrollTo(0, 0);
  return null;
};

const Analytics = () => {
  if(typeof window !== 'undefined') {
    logPageView(window);
  }
  return null;
};

export const NotFound = () => (
  <section id='page404'>
    <h1>404 page not found.</h1>
  </section>
);

export default Routes;