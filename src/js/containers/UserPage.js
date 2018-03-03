import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Posts from './/Posts.js';
import Profile from './../components/Profile.js';
import { fetchUsers } from './../actions/actions.js';

@connect(
  state => ({
    users: state.users
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchUsers: fetchUsers
    }, dispatch),
    dispatch: dispatch
  })
)

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.match.params.uid
    };
  }

  componentDidMount() {
    const { users, fetchUsers } = this.props;
    if(!users.items.length) {
      fetchUsers();
    }
  }

  componentWillReceiveProps(next) {
    this.setState({
      uid: next.match.params.uid
    });
  }

  getUser() {
    const { items } = this.props.users;
    if(!items.length) {
      return null;
    }
    const { uid } = this.state;
    const user = items.filter(e => e.uid === uid)[0];
    if(document) {
      document.title = user.username + ' | BetterWeb';
      document.description = 'See ' + user.username + '\'s work and give feedback.';
    }
    return user;
  }

  render() {
    const user = this.getUser();
    const { fetching } = this.props.users;

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