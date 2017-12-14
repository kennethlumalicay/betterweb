import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from './../actions/actions.js';
import { mappedTags } from './../config/usertags.js';
import { logLogin, logRegister } from './../config/google-analytics.js';

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      userTaken: false,
      emailTaken: false,
      password: '',
      username: '',
      email: ''
    };
  }

  toggleRegister() {
    this.setState({
      register: !this.state.register
    });
  }

  handlePass(e) {
    this.setState({
      password: e.target.value
    });
  }

  checkIfTaken(list, item, prop) {
    const search = new RegExp(`^${item}$`, 'i');
    return list.map(e => e[prop] || null).find(v => search.test(v));
  }

  handleUser(e) {
    const username = e.target.value;
    this.setState({
      username: username
    });
  }

  handleEmail(e) {
    const email = e.target.value;
    this.setState({
      email: email
    });
  }

  handleSubmit(e) {
    const { emailTaken, userTaken, register } = this.state;
    if(emailTaken || userTaken && register) {
      e.preventDefault();
    }
    if(register) {
      logRegister();
    } else {
      logLogin('local');
    }
  }

  handleSocialLogin(type) {
    logLogin(type);
  }

  componentDidMount() {
    const { users, fetchUsers } = this.props;
    if(!users.items.length) {
      fetchUsers();
    }
  }

  componentDidUpdate() {
    const { register, username, email, userTaken, emailTaken } = this.state;
    const { users } = this.props;
    if(register) {
      const userCheck = this.checkIfTaken(users.items, username, 'username');
      const emailCheck = this.checkIfTaken(users.items, email, 'email');
      if(userCheck !== userTaken || emailCheck !== emailTaken) {
        this.setState({
          userTaken: userCheck,
          emailTaken: emailCheck
        });
      }
    }
  }

  render() {
    const { users } = this.props;
    if(users.fetching || !users.items.length) {
      return (
        <section id='settings'>
          <div className='fetching'>
            <h1><i className='fa fa-spinner fa-spin' aria-hidden='true'></i></h1>
          </div>
        </section>
      );
    }

    const { register, username, password, email, userTaken, emailTaken } = this.state;

    let form = null;
    let usernameProp = {};
    let buttonProp = {};
    let submitText = 'Log in';
    let msg = 'I need to register';
    let action = '/login';

    if(register) {
      usernameProp = {
        className: userTaken ? 'taken' : ''
      };

      const emailProp = {
        onChange: (e) => this.handleEmail(e),
        className: 'form-add' + (emailTaken ? ' taken' : '')
      };

      buttonProp = {
        className: (userTaken || emailTaken) ? 'taken' : '',
        disabled: userTaken || emailTaken
      };

      form = [
        <input key='password' className='form-add' type='password' name='passwordValidator' placeholder='Confirm password' pattern={password} title='Confirm password' required/>,
        <input key='email' className='form-add' type='email' name='email' value={email} placeholder='Email (optional)' {...emailProp}/>,
        <h3 key='h3' className='form-add'>Pick your tag</h3>,
        <div key='mappedTags' className='form-add'>{mappedTags()}</div>
      ];

      submitText = 'Register';
      msg = 'I already have an account';
      action = '/register';
    }

    return (
      <section id='login'>
        { this.props.loginFailed
          ? <p>Username or password is incorrect.</p>
          : null
        }
        <form className='form' action={action} method='POST' onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' name='username' placeholder='Username' value={username} maxLength='20' autoFocus required onChange={(e) => this.handleUser(e)} {...usernameProp}/>
          <input type='password' name='password' placeholder='Password' value={password} onChange={e => this.handlePass(e)} required/>
          {form}
          <input type='submit' value={submitText} {...buttonProp}/>
        </form>
        <div>
          <button onClick={() => {this.toggleRegister();}}>{msg}</button>
        </div>
        <div className='login-with'>
          <div>OR</div>
          <div>
            <a onClick={() => this.handleSocialLogin('twitter')} href='/auth/twitter'><i className='fa fa-twitter' aria-hidden='true'></i></a>
            <a onClick={() => this.handleSocialLogin('github')} href='/auth/github'><i className='fa fa-github' aria-hidden='true'></i></a>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;