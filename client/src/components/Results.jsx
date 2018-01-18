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
    this.getInfo();
  }

  getInfo() {
    fetch('/api/listings/search', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        city: this.props.match.params.city,
        state: this.props.match.params.state,
      }),
    })
      .then(resp => resp.json())
      .then((data) => {
        this.setState({
          listings: data,
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <Container>
        <Container style={{ paddingBottom: '10px' }}>
          <center>
            <h3>
              Listings for{' '}
              <span style={{ textTransform: 'capitalize' }}>
                {this.props.match.params.city}, {this.props.match.params.state}
              </span>
            </h3>
          </center>
        </Container>
        <Listings listings={this.state.listings} />
      </Container>
    );
  }
}
