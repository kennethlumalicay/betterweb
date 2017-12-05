import React, { Component } from 'react'; // eslint-disable-line
import axios from 'axios';
import Posts from './../containers/Posts.js';
import Profile from './Profile.js';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.match.params.uid,
      user: null,
      fetching: true
    };
  }

  componentDidMount() {
    this.fetchUser(this.state.uid);
  }

  componentWillReceiveProps(next) {
    this.fetchUser(next.match.params.uid);
  }

  fetchUser(uid) {
    this.setState({
      fetching: true
    });
    if(uid !== 'guest') {
      axios({
        url: '/api/fetchUser',
        params: uid
      })
        .then(res => {
          const user = res.data;
          this.setState({
            user: user,
            fetching: false
          });
          document.title = user.username + ' | BetterWeb';
          document.description = 'See ' + user.username + '\'s work and share your thoughts.';
        })
        .catch((err) => {
          if(err) throw(err);
        });
    } else {
      this.setState({
        user: {
          uid: 'guest',
          username: 'Guest',
          guest: true,
          fetching: false
        }
      });
    }
  }

  render() {
    const { user, fetching } = this.state;

    if(fetching) {
      return (
        <section id='userpage'>
          <div className='fetching'>
            <h1><i className='fa fa-spinner fa-spin' aria-hidden='true'></i></h1>
          </div>
        </section>
      );
    }

    if(!user) {
      return (
        <section id='userpage'>
          <section id='profile'>
            <h1>User not found.</h1>
          </section>
        </section>
      );
    }

    return (
      <section id='userpage'>
        <Profile user={user}/>
        <Posts uid={user.uid}/>
      </section>
    );
  }
}

export default UserPage;