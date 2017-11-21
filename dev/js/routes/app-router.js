import React, { Component } from 'react'; // eslint-disable-line
import { Route } from 'react-router-dom';
import Home from './../components/Home.js';
import Nav from './../containers/Nav.js';
import UserPage from './../components/UserPage.js';
import PostPage from './../containers/PostPage.js';

class Routes extends Component {
  render() {
    return (
      <section id='route'>
        <Route component={ScrollToTop} />
        <Route component={Nav} />
        <Route path='/' component={Home} exact />
        <Route path='/user/:uid' component={UserPage}/>
        <Route path='/post/:pid' component={PostPage}/>
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

export default Routes;