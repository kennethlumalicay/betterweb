import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';

@connect(
  state => ({
    user: state.user
  })
)

class Home extends Component {

  render() {
    const { user } = this.props;
    const msg = user ? 'hello!' : 'log in first!';

    return (
      <section id='home'>
        <h1>{msg}</h1>
      </section>
    );
  }
}

export default Home;

// Sample connect with dispatch
/* 
import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAdmins, addAdmin, removeAdmin } from '../actions/actions.js';

@connect(
  state => ({
    admins: state.admins
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchAdmins: fetchAdmins,
      addAdmin: addAdmin,
      removeAdmin: removeAdmin
    }, dispatch),
    dispatch: dispatch
  })
)
*/