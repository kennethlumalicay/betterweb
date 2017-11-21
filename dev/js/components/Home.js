import React, { Component } from 'react'; // eslint-disable-line
import Posts from './../containers/Posts.js';

class Home extends Component {

  render() {
    return (
      <section id='home'>
        <div className='splash'>
          <div>
            <h1>Help make the web a better place</h1>
            <p>Users and developers should team up to make the web a better place.</p>
            <p>Developers can post their work to be discussed by other developers and users. Use that to help improve your work!</p>
            <p>All kinds of users are welcome and encouraged to participate! You don't need an account to get started.</p>
          </div>
        </div>
        <Posts />
      </section>
    );
  }
}

export default Home;