import { Component } from 'react';
import auth from '../../services/authService';

class LogOut extends Component {
  componentDidMount() {
    auth.logout();
    window.location = '/login';
  }

  render() {
    return null;
  }
}

export default LogOut;
