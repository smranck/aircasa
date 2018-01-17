import React from 'react';
import {
  Alert,
  Button,
  Collapse,
  FormGroup,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Search from './Search.jsx';
import 'bootstrap/dist/css/bootstrap.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      successfulLogin: false,
      displayMessage: '',
      currentUserId: '',
      signup: false,
    };
  }

  handleSignup() {
    this.setState({ signup: true, displayMessage: '' });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    let { username, password } = this.state;
    if (username === '') {
      return this.setState({
        displayMessage: 'Login requires a username',
      });
    }
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'content-type': 'application/JSON' },
    })
      .then(
        (resp) =>
          resp.status === 200
            ? this.setState({
                successfulLogin: true,
                currentUserId: resp.body.userId,
              }) //how to handle the userId that is sent in
            : this.setState({
                displayMessage: `Set the error here. resp.status?`,
              }), //should be 401 only
      )
      .catch(console.error); // should be 500 only
  }

  render() {
    return (
      <div className="login-component">
        {this.state.successfulLogin ? (
          <Redirect
            to={{ pathname: '/' }} // this will be the first page they see on login
          />
        ) : (
          <div className="Login-Only">
            {this.state.displayMessage ? (
              <div color="danger">{this.state.displayMessage}</div>
            ) : (
              undefined
            )}
            {this.state.signup ? (
              <div>
                <Redirect to="/signup" />
              </div>
            ) : (
              <FormGroup>
                <label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="Enter your name"
                    onChange={(event) => this.handleChange(event)}
                  />
                  <br />
                  <input
                    type="text"
                    name="password"
                    value={this.state.password}
                    placeholder="Enter your password"
                    onChange={(event) => this.handleChange(event)}
                  />
                </label>
                <Button onClick={() => this.handleSubmit()} color="primary">
                  {' '}
                  Login{' '}
                </Button>
                <br />
                <Button onClick={() => this.handleSignup()} color="primary">
                  {' '}
                  Signup{' '}
                </Button>
              </FormGroup>
            )}
          </div>
        )}
      </div>
    );
  }
}
