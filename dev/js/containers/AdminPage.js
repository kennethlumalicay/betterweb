import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { NotFound } from './../routes/app-router.js';

@connect(
  state => ({
    user: state.user,
    users: state.users,
    posts: state.posts,
    comments: state.comments
  })
)

class AdminPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;
    if(!user || !user.admin) {
      return <NotFound />;
    }
    return (
      <section id='admin'>
        <h1>Hello admin</h1>
      </section>
    );
  }
}

export default AdminPage;