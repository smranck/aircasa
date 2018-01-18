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
import { Link } from 'react-router-dom';
import Search from './Search.jsx';

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
      <div>
        <Navbar color="faded" light expand="md">
          <Link to="/">
            <img className="navLogo" src="/assets/logo.png" alt="airbnb" />
          </Link>
          <NavbarBrand>airbnb-casa</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/host">Host</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/bookings">Bookings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  LoginOptions
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink href="/login">Login</NavLink>
                  </DropdownItem>

                  <DropdownItem>
                    <NavLink href="/signup">Signup</NavLink>
                  </DropdownItem>

                  <DropdownItem>
                    <NavLink href="/settings">Settings</NavLink>
                  </DropdownItem>

                  <DropdownItem divider />

                  <DropdownItem>LogOut</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// conditional rendering depending on the current path you are in
