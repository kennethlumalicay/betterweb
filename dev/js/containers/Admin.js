import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import RootAdmin from './RootAdmin.js';
import ClientAdmin from './ClientAdmin.js';

@connect(
  state => ({
    user: state.user
  })
)

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const user = this.props.user;
    const email = this.props.location.search.replace('?','');
    const failedMsg = `Make sure the username and password is correct. Otherwise email me at ${email}. Charges may apply.`;
    if(!user) {
      return (
        <section id='admin'>
          <div>
            <form action='/admin/login' method='post'>
              <input type='text' name='username' placeholder='username' required />
              <input type='password' name='password' placeholder='password' required />
              <input type='submit' value='Log in' />
            </form>
            <Route path='/admin/failed' render={() => <p>{failedMsg}</p>} />
          </div>
        </section>
      );
    }
    if(user.root || (user._doc && user._doc.root)) {
      return (
        <section id='admin'>
          <RootAdmin />
        </section>
      );
    }
    return (
      <section id='admin'>
        <ClientAdmin />
      </section>
    );
  }
}

export default Admin;