import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ListingEntryDetails from './ListingEntryDetails.jsx';

export default class ListingEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInBooking: this.props.showButton,
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  cancelBooking() {
    fetch('/api/bookings/cancel', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        bookingId: this.props.booking.id,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then(this.props.getCurrentBookings())
      .catch(console.error);
  }

  render() {
    const { listing } = this.props;
    return (
      <Card>
        <Link
          to={{
            pathname: `/listings/${listing.state}--${listing.city}/${listing.id}`,
            state: { listing },
          }}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CardImg
            top
            height="180px"
            width="256px"
            style={{ objectFit: 'cover' }}
            src={listing.pic_url}
            alt={`${listing.name} img`}
          />
          <CardBody>
            <CardTitle>{listing.name}</CardTitle>
          </CardBody>
        </Link>
        <CardBody>
          <CardSubtitle>
            {listing.city}, {listing.state}
          </CardSubtitle>
          {this.state.isInBooking ? (
            <div>
              <Button color="danger" onClick={this.toggle}>
                Cancel
              </Button>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>Cancel Booking</ModalHeader>
                <ModalBody>
                  Are you sure you want to cancel? Your host has a{' '}
                  {this.props.listing.cancellation_policy} cancellation policy, and we cannot
                  guarantee a full refund.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.cancelBooking}>
                    Yes, I still want to cancel
                  </Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>
                    No, I made a mistake!
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          ) : (
            ''
          )}
        </CardBody>
      </Card>
    );
  }
}
