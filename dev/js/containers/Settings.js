import React, { Component } from 'react';  // eslint-disable-line
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser, updateGuest } from './../actions/actions.js';
import { mappedTags } from './../config/usertags.js';

@connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    ...bindActionCreators({
      updateUser: updateUser,
      updateGuest: updateGuest
    }, dispatch),
    dispatch: dispatch
  })
)

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
  }

  updateUser(event) {
    event.preventDefault();
    const { closeModal, user, updateUser, dispatch } = this.props;
    closeModal();

    if(user.guest) {
      const { uid, usertag, username } = event.target;
      const prefixed = new RegExp('guest','gi').test(username.value);
      dispatch({ type:'UPDATE_GUEST', payload: {
        uid: uid.value,
        username: ( !prefixed ? 'Guest ' : '' ) + username.value,
        usertag: usertag.value,
        guest: true
      }});
      return false;
    }

    const inputs = ['uid', 'username', 'password', 'email', 'usertag'];
    let query = {};
    inputs.forEach(e => {
      query = { ...query, [e]: event.target[e].value };
    });
    updateUser(query);
  }

  handlePass(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    const { user } = this.props;
    const { password } = this.state;

    const userForm = user.guest
      ? null
      : [
        <input key='password' type='password' name='password' placeholder='Password' value={password} onChange={e => this.handlePass(e)}/>,
        <input key='passwordValidator' type='password' name='passwordValidator' placeholder='Confirm password' pattern={password} title='Confirm password' required={!!password}/>,
        <input key='email' type='email' name='email' placeholder='Email (optional)' defaultValue={user.email}/>
      ];

    return (
      <section id='settings'>
        {user.guest
          ? null
          : <h3>Ups: [{user.ups}]</h3> }
        <form className='form' onSubmit={(e) => this.updateUser(e)}>
          <input type='hidden' name='uid' value={user.uid}/>
          <input type='text' name='username' placeholder='Username' defaultValue={user.username}/>
          {userForm}
          <h3>Your tag</h3>
          <div>
            {mappedTags(user.usertag)}
          </div>
          <input type='submit' value='Update'/>
        </form>
      </section>
    );
  }
}

export default Settings;