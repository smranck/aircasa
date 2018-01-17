import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx';
import Listings from './components/Listings.jsx';
import { BrowserRouter, Route, BrowserHistory, Link } from 'react-router-dom';
import UserComponent from './components/UserComponent.jsx';
import ListingEntryDetails from './components/ListingEntryDetails.jsx';
import Navigation from './components/Navigation.jsx';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

ReactDOM.render(
  <BrowserRouter history={BrowserHistory}>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/" component={Navigation} />
      <Route path="/bookings" component={UserComponent} />
      <Route exact path="/listings/:state--:city" component={Listings} />
      <Route path="/listings/:state--:city/:id" component={ListingEntryDetails} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </div>
  </BrowserRouter>,
  document.getElementById('app'),
);
