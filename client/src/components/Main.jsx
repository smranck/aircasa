import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import Listings from './Listings.jsx';
import { BrowserRouter, Route, BrowserHistory, Link } from 'react-router-dom';
import UserComponent from './UserComponent.jsx';
import ListingEntryDetails from './ListingEntryDetails.jsx';
import Navigation from './Navigation.jsx';
import App from './App.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
}
    render () {
      return (
        <div>
          <Navigation />
        </div>
      );
    }
}

//2 buttons for login and signup which link to /signup /login
