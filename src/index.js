import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
// import App from './App';
import Movies from './components/movies';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import NavBar from './components/NavBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/404';
import MovieDetails from './components/MovieDetails';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <NavBar></NavBar>
      {/* <Movies /> */}
      {/* <Users></Users> */}
      <Switch>
        <Route path='/movies/:id' component={MovieDetails}></Route>
        <Route path='/movies' component={Movies}></Route>
        <Route path='/customers' component={Customers}></Route>
        <Route path='/rentals' component={Rentals}></Route>
        <Route path='/404' component={NotFound}></Route>
        <Redirect exact from='/' to='/movies'></Redirect>
        <Redirect to='/404'></Redirect>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
