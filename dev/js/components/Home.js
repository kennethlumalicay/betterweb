import React, { Component } from 'react'; // eslint-disable-line
import Posts from './../containers/Posts.js';

class Home extends Component {

  componentDidMount() {
    document.title = 'BetterWeb: Get feedback to improve your site or app\'s quality';
    document.description = 'Help website owners make the web a better place by sharing your thoughts.';
  }

  render() {
    return (
      <section id='home'>
        <div className='splash'>
          <div>
            <h1>Help make the web a better place</h1>
            <p>Netizens should unite to make the web a better place.</p>
            <p>Post your website and get feedback from other user, owner or developers to help improve the quality of your website!</p>
            <p>From school / personal project to business web app just post them.</p>
            <p>All kinds of users are welcome and encouraged to participate! You don't need an account to get started.</p>
            <p>Press <i className='fa fa-globe' aria-hidden='true'></i> to visit website and <i className='fa fa-commenting' aria-hidden='true'></i> to join discussion.</p>
          </div>
        </div>
        <Posts />
      </section>
    );
  }
}

export default Home;