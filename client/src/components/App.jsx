import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import Listings from './Listings.jsx';
import axios from 'axios';
import { BrowserRouter, Route, BrowserHistory, Link } from 'react-router-dom';
import UserComponent from './UserComponent.jsx';
import ListingEntryDetails from './ListingEntryDetails.jsx';
import Navigation from './Navigation.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
      searchQuery: {},
      searched: false,
    };
    this.setSearchQuery = this.setSearchQuery.bind(this);
  }

  // passed down to search and sets search query to state of Search component
  // expects an object { city, state }
  setSearchQuery(searchQuery) {
    console.log(searchQuery);
    this.setState({ searchQuery });
  }

  render() {
    return (
      <div>
        <div className="mainSearch">
          <Search search={this.search} setSearchQuery={this.setSearchQuery} />
        </div>
      </div>
    );
  }
}
