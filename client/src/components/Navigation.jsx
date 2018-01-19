import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Sticky from 'react-stickynode';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <Sticky className="sticky navbar-container" id="navbar" innerZ={5}>
        <Navbar color="white" light expand="md">
          <Link to="/">
            <img className="navLogo" src="/assets/logo.png" alt="airbnb" />
          </Link>
          <NavbarBrand>airbnb-casa</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {!this.props.userId ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/login">
                    <NavLink>Log In</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/signup">
                    <NavLink>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/host">
                    <NavLink>Host</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/bookings">
                    <NavLink>Bookings</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="profile">
                    <NavLink>Profile</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/settings">
                    <NavLink>Settings</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink href="/logoff">Log Out</NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </Sticky>
    );
  }
}

// conditional rendering depending on the current path you are in
