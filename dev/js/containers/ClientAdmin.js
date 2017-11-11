import React, { Component } from 'react';  // eslint-disable-line
import { connect } from 'react-redux';

@connect(
  state => ({
    user: state.user
  })
)

class ClientAdmin extends Component {

  render() {
    return (
      <div>
        <h1>Client admin</h1>
      </div>
    );
  }
}

export default ClientAdmin;