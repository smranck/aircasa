import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container, Row, Col } from 'reactstrap';

export default class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: {} };
    this.getProfileInfo = this.getProfileInfo.bind(this);
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  getProfileInfo() {
    fetch('api/user/profile', {
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then((data) => {
        this.setState({ userInfo:data });
      })
      .catch(console.error);
  }

  render() {

    const { userInfo } = this.state;

    const styles = {
      container: {
        backgroundColor: 'white',
        height: '100vh',
      },
      tagline: {
        backgroundColor: 'green',
        height: '5vh',
      },
      profilePicture: {
        backgroundColor: 'yellow',
        height: '25vh',
      },
      profileInfo: {
        backgroundColor: 'red',
        height: '20vh',
      },
      miscInfo: {
        backgroundColor: 'orange',
        height: '30vh',
      },
      reviews: {
        backgroundColor: 'pink',
        height: '75vh',
      },
    };
    return (
      <Container fluid style={styles.container}>
        <h1>{this.state.userInfo.displayName}</h1>
        <Row>
          <Col className="tagline" style={styles.tagline}>
            {this.state.userInfo.tagline}
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="profilePicture" style={styles.profilePicture}>
            {userInfo.picture}
          </Col>
          <Col xs="6" className="profileInfo" style={styles.profileInfo}>
            {userInfo.location}
            {userInfo.bio}
            {userInfo.joinedDate}
            Location Joined and Bio
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="miscInfo" style={styles.miscInfo}>
            {userInfo.email}
            {userInfo.phoneNumber}
            Email, Phonenumber
          </Col>
          <Col xs="6" className="reviews" style={styles.reviews}>
            Reviews Component
          </Col>
        </Row>
      </Container>
    );
  }
}
ProfileContainer.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
};

// fetch request basically is gonna be the same as normal  except u include hostId
