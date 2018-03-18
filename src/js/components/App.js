import React, { Component } from 'react'; // eslint-disable-line
import Routes from './../routes/app-router.js';
import Notif from './../containers/notif.js';
import { logOutboundLink } from './../config/google-analytics.js';

class App extends Component {
  render() {
    return (
      <section id='app'>
        <Notif/>
        <Routes/>
        <footer>
          <p>App made by <a href='https://kennethlumalicay.github.io/' target='_blank' rel='noopener noreferrer'>Kenneth Malicay</a>. Don't forget to star and fork the <a href='https://github.com/kennethlumalicay/betterweb' target='_blank' rel='noopener noreferrer'>betterweb github repo</a>!</p>
          <p><a onClick={() => logOutboundLink('paypal')} href='https://paypal.me/kennethlumalicay/2' target='_blank' rel='noopener noreferrer'>Buy me a coffee or help keep BetterWeb up and running.</a></p>
        </footer>
      </section>
    );
  }
}

export default App;