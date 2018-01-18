import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText } from 'reactstrap';

import ListingEntryDetails from './ListingEntryDetails.jsx';

export default ({ listing }) => (
  <Link
    to={{
      pathname: `/listings/${listing.state}--${listing.city}/${listing.id}`,
      state: { listing },
    }}
    style={{ textDecoration: 'none', color: 'black' }}
  >
    <Card>
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
      <CardBody>
        <CardSubtitle>
          {listing.city}, {listing.state}
        </CardSubtitle>
        {listing.otherText ? <CardText>{listing.otherText}</CardText> : ''}
      </CardBody>
    </Card>
  </Link>
);
