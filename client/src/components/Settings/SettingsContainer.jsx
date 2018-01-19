import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Nav, NavItem, NavLink } from 'reactstrap';
import renderIf from 'render-if';

export default class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      container: {
        backgroundColor: 'white',
        height: '100vh',
      },
      sidebar: {
        backgroundColor: 'white',
        height: '100vh',
      },
      content: {
        backgroundColor: 'yellow',
        height: '100vh',
      },
      contentContainer: {
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
    // {renderIf(1+1===2) (<div>Hello, World!</div>)}
    return (
      <Container style={styles.container}>
        <Row>
          <Col xs="3" className="sidebar" style={styles.sidebar}>
            <Container>
              <Nav vertical>
                <NavItem>
                  <NavLink href="#">Edit Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Photos</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Reset Password</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/profile'><Button>View Profile</Button></NavLink>
                </NavItem>
              </Nav>
            </Container>
          </Col>
          <Col xs="9" className="content" style={styles.content}>
            <Container className="contentContainer" style={styles.contentContainer}>
              test <br />
              adsflkj <br />
              Content goes here <br />
              asdfjaiej <br />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

// option to upload a file to database as profile picture
// option to set displayname if you choose which will render on the nav bar

/*
SettingsContainer.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
};
*/
