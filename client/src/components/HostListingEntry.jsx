import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

import ListingEntryDetails from './ListingEntryDetails.jsx';

export default class ListingEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  // Activates the modal that contains the button that cancels the listing
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  // function to cancel this listing
  cancelListing() {
    fetch('/api/listings/cancel', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        listingId: this.props.listing.id,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then(this.props.getHostedListings())
      .catch(console.error);
  }

  // renders a single listing
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
          <Button color="danger" onClick={this.toggle}>
            Cancel
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Cancel Listing</ModalHeader>
            <ModalBody>
              Are you sure you want to cancel? People are depending on you! And you will have to
              give back all the money
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.cancelListing()}>
                Yes, I still want to cancel
              </Button>{' '}
              <Button color="secondary" onClick={this.toggle}>
                No, I made a mistake!
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}
