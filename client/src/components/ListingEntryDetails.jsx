import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookingWindow from './BookingWindow.jsx';
import GMap from './GMap.jsx';

import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Container,
  Row,
  Col,
} from 'reactstrap';

export default class ListingEntryDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listingId: this.props.match.params.id,
      listing: {},
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ listing: this.props.location.state.listing });
    } else {
      this.getListing();
    }
  }

  getListing() {
    fetch(`/api/listings/details/${this.state.listingId}`)
      .then(resp => resp.json())
      .then((listing) => {
        this.setState({ listing });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <div className="listgroup-container">
          <ListGroup className="listgroup-info">
            <ListGroupItem>
              <h3>{this.state.listing.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>About the Listing</ListGroupItemHeading>
              <ListGroupItemText>
                {`${this.state.listing.summary} ${this.state.listing.description}`}
              </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>Neighborhood</ListGroupItemHeading>
              <ListGroupItemText>{this.state.listing.neighborhood}</ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>Maximum Number of Guests</ListGroupItemHeading>
              <ListGroupItemText>{this.state.listing.num_guests}</ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>Bedrooms</ListGroupItemHeading>
              <ListGroupItemText>{this.state.listing.bedrooms}</ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>Bathrooms</ListGroupItemHeading>
              <ListGroupItemText>{this.state.listing.bathrooms}</ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>Cancellation Policy</ListGroupItemHeading>
              <ListGroupItemText>{this.state.listing.cancellation_policy}</ListGroupItemText>
            </ListGroupItem>
          </ListGroup>
          {/* <div className="listgroup-bookingwindow">
            <BookingWindow
              key={this.state.listing.id}
              maxGuests={this.state.listing.num_guests}
              price={this.state.listing.nightly_price}
              rating={this.state.listing.rating}
              listingId={this.state.listing.id}
            />
          </div> */}

          {/* <GMap latLong={this.state.latLong} /> */}

          <img src={this.state.listing.pic_url} alt="listing-pic" />
        </div>
      </div>
    );
  }
}
