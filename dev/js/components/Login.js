import React, { Component } from 'react'; // eslint-disable-line
import { mappedTags } from './../config/usertags.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      password: ''
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

  render() {
    const { register, password } = this.state;

    let form = null;
    let submitText = 'Log in';
    let msg = 'I need to register';
    let action = '/login';

    if(register) {
      form = [
        <input key='password' className='form-add' type='password' name='passwordValidator' placeholder='Confirm password' pattern={password} title='Confirm password' required/>,
        <input key='email' className='form-add' type='email' name='email' placeholder='Email (optional)'/>,
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
        <form className='form' action={action} method='POST'>
          <input type='text' name='username' placeholder='Username' autoFocus required/>
          <input type='password' name='password' placeholder='Password' value={password} onChange={e => this.handlePass(e)} required/>
          {form}
          <input type='submit' value={submitText}/>
        </form>
        <div>
          <button onClick={() => {this.toggleRegister();}}>{msg}</button>
        </div>
      </section>
    );
  }
}

export default Login;