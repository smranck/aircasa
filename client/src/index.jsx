import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, BrowserHistory, Link } from 'react-router-dom';
import UserComponent from './components/UserComponent.jsx';
import ListingEntryDetails from './components/ListingEntryDetails.jsx';
import Results from './components/Results.jsx';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Main from './components/Main.jsx';
import AddListings from './components/AddListing.jsx';
import HostListings from './components/HostListings.jsx';
import AddListing from './components/AddListing.jsx';

ReactDOM.render(
  <BrowserRouter history={BrowserHistory}>
    <div>
      <Route path="/" component={Main} />
      <Route exact path="/" component={App} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route path="/bookings" component={UserComponent} />
      <Route exact path="/listings/:state--:city" component={Results} />
      <Route path="/listings/:state--:city/:id" component={ListingEntryDetails} />
      <Route path="/host" component={AddListing} />
      <Route exact path="/listings/hosted" component={HostListings} />
    </div>
  </BrowserRouter>,
  document.getElementById('app'),
);
