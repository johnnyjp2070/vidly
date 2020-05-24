import React from 'react';
import Joi from 'joi-browser';
import Form from './form';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = () => {
    console.log('Submitted');
  };

  render() {
    return (
      <div className='d-flex justify-content-center align-items-center height-100'>
        <div className='login-form col-4'>
          <h1>Login Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
          </form>
          {this.renderButton('Login')}
        </div>
      </div>
    );
  }
}

export default LoginForm;
