import React, { Component } from 'react';
import './App.css';
import auth from './services/authService';

import NavBar from './components/NavBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/404';
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/common/registerForm';
import Movieform from './components/common/MovieForm';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoutes';
import Movies from './components/movies';
import LogOut from './components/common/loginOut';
// import { toast, ToastContainer } from 'react-toastify';

class App extends Component {
  state = {};
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar user={this.state.user}></NavBar>
          {/* <Movies /> */}
          {/* <Users></Users> */}
          <Switch>
            <Route path='/login' component={LoginForm}></Route>
            <Route path='/logout' component={LogOut}></Route>
            <Route path='/register' component={RegisterForm}></Route>
            {/* <Route path='/movies/new' component={Movieform}></Route> */}
            <ProtectedRoute
              path='/movies/:id'
              component={Movieform}
            ></ProtectedRoute>
            <Route
              path='/movies'
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/404' component={NotFound}></Route>
            <Redirect exact from='/' to='/movies'></Redirect>
            <Redirect to='/404'></Redirect>
            <Redirect to='/movies/:id'></Redirect>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
