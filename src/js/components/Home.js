import React, { Component } from 'react'; // eslint-disable-line
import Posts from './../containers/Posts.js';

class Home extends Component {

  componentDidMount() {
    document.title = 'BetterWeb: Get feedback to improve the quality of your website';
    document.description = 'BetterWeb is a growing community of web owners and developers where we share our websites and give each other feedback, suggestions or feature requests to improve the quality of our website.';
  }

  render() {
    return (
      <section id='home'>
        <div className='splash'>
          <div>
            <h1>Giving each other feedback should be a culture</h1>
            <p>Let's make a feedback culture in web development so we can all grow and learn from one another.</p>
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