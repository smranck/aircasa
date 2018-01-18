import React from 'react';
import {
  Button,
  Collapse,
  FormGroup,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Form,
  NavLink,
  Input,
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import Search from './Search.jsx';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      phoneNumber: '',
      email: '',
      successfulSignup: false,
      displayMessage: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    const { username, password, phoneNumber, email } = this.state;
    if (username === '') {
      return this.setState({
        displayMessage: 'Login requires a username',
      });
    }
    if (password === '') {
      return this.setState({
        displayMessage: 'Login requires a passswoord',
      });
    }
    if (phoneNumber === '') {
      return this.setState({
        displayMessage: 'Login requires a phone number',
      });
    }
    if (email === '') {
      return this.setState({
        displayMessage: 'Login requires an email address',
      });
    }
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
        phoneNumber,
      }),
      headers: { 'content-type': 'application/JSON' },
    })
      .then(resp =>
        resp.status === 200
          ? this.setState({ successfulSignup: true })
          : this.setState({
            displayMessage: 'Set the error here, Should be 409',
          }))
      .catch(err => console.error(err)); // should be 500 only
  }

  // todo: render displaymessage!!
  render() {
    const styles = {
      body: {
        paddingTop: '40px',
        paddingBottom: '40px',
        maxWidth: '330px',
        padding: '15px',
        margin: '0 auto',
        textAlign: 'center',
      },
    };
    return (
      <div className="signup-component" style={styles.body}>
        {this.state.successfulSignup ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
          <div>
            {this.state.displayMessage ? (
              <div>{this.state.displayMessage}</div>
            ) : (
              undefined
            )}
            <h2>Sign up</h2>
            <FormGroup>
              <Input
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Enter your name"
                onChange={event => this.handleChange(event)}
              />
              <Input
                type="text"
                name="password"
                value={this.state.password}
                placeholder="Enter your password"
                onChange={event => this.handleChange(event)}
              />
              <Input
                type="text"
                name="email"
                value={this.state.email}
                placeholder="Enter your email address"
                onChange={event => this.handleChange(event)}
              />
              <Input
                type="text"
                name="phoneNumber"
                value={this.state.phoneNumber}
                placeholder="Enter your phone number"
                onChange={event => this.handleChange(event)}
              />
            </FormGroup>
            <br />
            <Button onClick={() => this.handleSubmit()} color="primary">
              Click to signup
            </Button>
          </div>
        )}
      </div>
    );
  }
}
