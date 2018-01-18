import React from 'react';
import { Container, CardColumns } from 'reactstrap';

import ListingEntry from './ListingEntry.jsx';

export default ({ listings }) => (
  <Container>
    <CardColumns>
      {listings.map(item => <ListingEntry listing={item} key={item.id} showButton={false} />)}
    </CardColumns>
  </Container>
);
