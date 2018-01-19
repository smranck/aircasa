import React from 'react';
import { CardColumns, Container, Jumbotron } from 'reactstrap';
import HostListingEntry from './HostListingEntry.jsx';

import Listings from './Listings.jsx';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

  componentDidMount() {
    this.getHostedListings();
  }

  getHostedListings() {
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
      <div>
        <div>
          <Container style={{ paddingBottom: '10px' }}>
            <center>
              <h3>
                <span style={{ textTransform: 'capitalize' }}>Current Listings</span>
              </h3>
            </center>
          </Container>
          <Container>
            <Jumbotron>
              <CardColumns>
                {this.state.listings.map(listing => (
                  <HostListingEntry
                    listing={listing}
                    key={listing.id}
                    getHostedListings={() => this.getHostedListings()}
                  />
                ))}
              </CardColumns>
            </Jumbotron>
          </Container>
          <div />
        </div>
      </div>
    );
  }
}
