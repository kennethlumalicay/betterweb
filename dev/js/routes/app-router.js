import React, { Component } from 'react'; // eslint-disable-line
import { Route } from 'react-router-dom';
import Admin from './../containers/Admin.js';
import Home from './../containers/Home.js';

class Routes extends Component {
  render() {
    return (
      <section id='route'>
        <div id='content'>
          <Route component={ScrollToTop} />
          <Route path='/admin' component={Admin} />
          <Route path='/' component={Home} exact />
        </div>
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