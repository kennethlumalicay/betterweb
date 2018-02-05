import React, { Component } from 'react'; // eslint-disable-line
import { oneTag, getTagColor } from './../config/usertags.js';

class Profile extends Component {
  render() {
    const { user } = this.props;

    const modRights = user.mod
      ? <p>Moderator</p>
      : null;

    const adminRights = user.admin
      ? <p>Admin</p>
      : modRights;

    return (
      <section id='profile'>
        <h1><span style={{color: getTagColor(user.usertag)}}>{user.username}</span> {oneTag(user.usertag, true)} <span className='ups-display'><i className='fa fa-star-o' aria-hidden='true'></i> {user.ups}</span></h1>
        { adminRights }
      </section>
    );
  }
}

export default Profile;