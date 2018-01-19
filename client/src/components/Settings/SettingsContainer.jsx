import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Input,
} from 'reactstrap'
import renderIf from 'render-if'
import ProfileTab from './ProfileTab.jsx';
import PhotoUploadTab from './PhotoUploadTab.jsx';
import ResetPasswordTab from './ResetPasswordTab.jsx';

export default class SettingsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 'profile'
    }
  }
  toggleProfileTab() {
    this.setState({ currentTab: 'profile' })
  }
  togglePhotosTab() {
    this.setState({ currentTab: 'photos' })
  }
  toggleResetTab() {
    this.setState({ currentTab: 'reset' })
  }

  render () {
    const { currentTab } = this.state
    const profileTab = renderIf(currentTab === 'profile')
    const photosTab = renderIf(currentTab === 'photos')
    const resetTab = renderIf(currentTab === 'reset')
    const styles = {
      container: {
        backgroundColor: 'white',
        height: '100vh'
      },
      sidebar: {
        backgroundColor: 'white',
        height: '100vh'
      },
      content: {
        backgroundColor: '#edefed',
        height: '100vh'
      },
    }
    return (
      <Container style={styles.container}>
        <Row>
          <Col xs="3" className="sidebar" style={styles.sidebar}>
            <Container>
              <Nav vertical>
                <NavItem>
                  <NavLink href="#" onClick={() => this.toggleProfileTab()}>
                    Edit Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => this.togglePhotosTab()}>
                    Photos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => this.toggleResetTab()}>
                    Reset Password
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/profile">
                    <Button outline color="primary">View Profile</Button>
                  </NavLink>
                </NavItem>
              </Nav>
            </Container>
          </Col>
          <Col xs="9" className="content" style={styles.content}>
            {profileTab(
              <ProfileTab />
            )}
            {photosTab(
              <PhotoUploadTab />
            )}
            {resetTab(
              <ResetPasswordTab />
            )}
          </Col>
        </Row>
      </Container>
    )
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
