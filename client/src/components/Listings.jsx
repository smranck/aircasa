import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ListingEntry from './ListingEntry.jsx';
import { Switch, Route } from 'react-router-dom';

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    axios
      .post('/api/listings/search', {
        city: this.props.match.params.city,
        state: this.props.match.params.state,
      })
      .then((response) => {
        this.setState({ listings: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h3>
          <u>All listings</u>
        </h3>
        {this.state.listings.map(listing => (
          <ListingEntry
            listing={listing}
            key={listing.id}
            state={this.props.match.params.state}
            city={this.props.match.params.city}
          />
        ))}
      </div>
    );
  }
}
