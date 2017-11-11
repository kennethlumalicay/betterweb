import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

@connect(
  state => ({
    user: state.user
  })
)

class Nav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const user = this.props.user;
    return (
      <section id='nav'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          { user && <li><a href='/signout'>Sign out</a></li> }
        </ul>
      </section>
    );
  }
}

export default Nav;