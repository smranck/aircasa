import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';
import 'bootstrap/dist/css/bootstrap.css';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav">
        <Navbar color="faded" light>
          <Link to="/">
            <img className="navLogo" src="/assets/logo.png" alt="airbnb" />
          </Link>
          <Nav>
            <NavItem>
              <Link to="/bookings">
                <Button>Trips</Button>
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
