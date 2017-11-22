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
          <p>App made by <a href='https://kennethlumalicay.github.io/' target='_blank' rel='noopener noreferrer'>Kenneth Malicay</a>. Don't forget to star the <a href='https://github.com/kennethlumalicay/betterweb' target='_blank' rel='noopener noreferrer'>github repo</a> if you liked this!</p>
        </footer>
      </section>
    );
  }
}

export default App;