import React, { Component } from 'react'; // eslint-disable-line
import Routes from './../routes/app-router.js';
import Notif from './../containers/notif.js';

class App extends Component {
  render() {
    return (
      <section id='app'>
        <Notif/>
        <Routes/>
        <footer>
          <p>App made by <a href='https://kennethlumalicay.github.io/' target='_blank' rel='noopener noreferrer'>Kenneth Malicay</a>. Don't forget to star and fork the <a href='https://github.com/kennethlumalicay/betterweb' target='_blank' rel='noopener noreferrer'>github repo</a>!</p>
          <p>Follow <a href='https://twitter.com/BetterWebTech' target='_blank' rel='noopener noreferrer'>@BetterWebTech</a> on <a href='https://twitter.com/BetterWebTech' target='_blank' rel='noopener noreferrer'>twitter</a> and <a href='https://www.facebook.com/BetterWebTech/' target='_blank' rel='noopener noreferrer'>facebook</a> if you liked this!</p>
        </footer>
      </section>
    );
  }
}

export default App;