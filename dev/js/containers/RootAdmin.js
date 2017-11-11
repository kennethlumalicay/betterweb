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

class RootAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      hint: ''
    };
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    const { admins, addAdmin, dispatch } = this.props;
    const { username, password, hint } = this.state;
    e.preventDefault();
    if (admins && admins.accounts && admins.accounts.find(e => e.username == username)) {
      dispatch({ type: 'UPDATE_LOGS', payload: 'duplicate username' });
    } else {
      addAdmin(username, password, hint);
    }
    this.setState({
      username: '',
      password: '',
      hint: ''
    });
  }
  componentDidMount() {
    const { admins, fetchAdmins } = this.props;
    if (!admins.accounts.length) {
      fetchAdmins();
    }
  }
  componentDidUpdate() {
    let { logs } = this.refs;
    logs.scrollTop = logs.scrollHeight;
  }
  render() {
    const { admins, removeAdmin } = this.props;
    const { username, password, hint } = this.state;
    const logs = admins && admins.logs;
    const mappedAdmins = admins && admins.accounts && admins.accounts.map(e => (
      <tr key={e._id}>
        <td>{e.username}</td>
        <td>{e.hint}</td>
        <td>{e.root ? null : <button onClick={() => removeAdmin(e._id, e.username)}>remove</button>}</td>
      </tr>
    ));
    return (
      <div>
        <textarea ref='logs' readOnly rows='5' cols='50' value={logs || ''}>
        </textarea>
        <form onSubmit={(e) => {this.handleSubmit(e);}}>
          <input type='text' name='username' value={username} placeholder='username' required onChange={(e) => this.handleChange(e)} />
          <input type='password' name='password' value={password} placeholder='password' required onChange={(e) => this.handleChange(e)} />
          <input type='text' name='hint' value={hint} placeholder='hint' onChange={(e) => this.handleChange(e)} />
          <input type='submit' value='Add' />
        </form>
        <table>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Hint</th>
              <th>Action</th>
            </tr>
            {mappedAdmins}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RootAdmin;