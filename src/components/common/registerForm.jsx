import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import * as userService from '../../services/userService';
import auth from '../../services/authService';

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

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      const jwt = response.headers['x-auth-token'];
      auth.loginWithJwt(jwt);
      // localStorage.setItem('token', response.headers['x-auth-token']);
      // this.props.history.push('/');
      window.location = '/';
      console.log(response);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
