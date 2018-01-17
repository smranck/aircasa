import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ListingEntryDetails from './ListingEntryDetails.jsx';

export default ({ state, city, listing }) => (
  <div className="listingDiv">
    <Link
      to={{
        pathname: `/listings/${state}--${city}/${listing.id}`,
        state: { listing },
      }}
    >
      <img className="listingImage" src={listing.pic_url} />
      <h5> {listing.name}</h5>
    </Link>
  </div>
);
