import React from 'react';
import Joi from 'joi-browser';
import Form from './form';

class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      name: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label('Username'),
    password: Joi.string().required().min(6).label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = () => {
    console.log('Submitted');
  };

  render() {
    return (
      <div className='d-flex justify-content-center align-items-center height-100'>
        <div className='login-form col-4'>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username', 'email')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderInput('name', 'Name')}
            {this.renderButton('Register')}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
