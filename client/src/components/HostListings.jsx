import React from 'react';
import { Container } from 'reactstrap';

import Listings from './Listings.jsx';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

  componentDidMount() {
    this.createListing();
  }

  createListing() {
    fetch('/api/listings', {
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then(resp =>
        this.setState({
          listings: resp,
        }))
      .catch(console.error); // should be 500 only
  }

  render() {
    return (
      <Container>
        <Container style={{ paddingBottom: '10px' }}>
          <center>
            <h3>
              <span style={{ textTransform: 'capitalize' }}>Your Listings</span>
            </h3>
          </center>
        </Container>
        <Listings listings={this.state.listings} />
      </Container>
    );
  }
}
