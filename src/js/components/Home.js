import React, { Component } from 'react'; // eslint-disable-line
import Posts from './../containers/Posts.js';

class Home extends Component {

  componentDidMount() {
    document.title = 'BetterWeb: Get feedback and collaborate to improve your website';
    document.description = 'BetterWeb connects people in a productive way. Get / give feedback, collaborate and connect with people from various industries. Together we can make a better web.';
  }

  render() {
    return (
      <section id='home'>
        <div className='splash'>
          <div>
            <h1>Connect with people in a productive way</h1>
            <p>Get / give feedback, collaborate and connect with people from various industries. Together we can make a better web.</p>
            <p>Start by posting your website or by giving a feedback!</p>
            <div className='splash-social'>
              <a href='https://www.facebook.com/BetterWebTech/' target='_blank' rel='noopener noreferrer'><i className='fa fa-facebook' aria-hidden='true'></i></a> 
              <a href='https://twitter.com/BetterWebTech' target='_blank' rel='noopener noreferrer'><i className='fa fa-twitter' aria-hidden='true'></i></a>
            </div>
          </div>
        </div>
        <Posts />
      </section>
    );
  }
}

export default Home;