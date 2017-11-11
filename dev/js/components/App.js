import React, { Component } from 'react'; // eslint-disable-line
import Nav from './../containers/Nav.js';
import Routes from './../routes/app-router.js';

class App extends Component {
  render() {
    return (
      <section id = 'app'>
        <Nav />
        <Routes />
        <footer >
          <p>App made by <a href='https://kennethlumalicay.github.io/' target='_blank' rel='noopener noreferrer'>Kenneth Malicay</a></p>
        </footer>
      </section>
    );
  }
}

export default App;