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
  Form,
  Input,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Search from './Search.jsx';

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
    const { username, password } = this.state;
    if (username === '') {
      return this.setState({
        displayMessage: 'Login requires a username',
      });
    }
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: 'include',
      headers: { 'content-type': 'application/JSON' },
    })
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            successfulLogin: true,
            currentUserId: resp.body.userId,
          }); // how to handle the userId that is sent in
          return this.props.setUserId(true);
        }
        return this.setState({
          displayMessage: 'Set the error here. resp.status?',
        }); // should be 401 only
      }) // should be 401 only
      .catch(console.error); // should be 500 only
  }
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
      <div className="login-component style={styles.body}">
        {this.state.successfulLogin ? (
          <Redirect
            to={{ pathname: '/' }} // this will be the first page they see on login
          />
        ) : (
          <div className="Login-Only">
            {this.state.displayMessage ? (
              <Alert color="danger">{this.state.displayMessage}</Alert>
            ) : (
              undefined
            )}
            {this.state.signup ? (
              <div>
                <Redirect to="/signup" />
              </div>
            ) : (
              <div style={styles.body}>
                <h2>Please Login</h2>
                <br />
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="Enter your name"
                    onChange={event => this.handleChange(event)}
                  />
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Enter your password"
                    onChange={event => this.handleChange(event)}
                  />
                </FormGroup>
                <br />
                <Button onClick={() => this.handleSubmit()} bssize="lg" color="primary" block>
                  {' '}
                  Login{' '}
                </Button>
                <Button onClick={() => this.handleSignup()} bssize="lg" color="primary" block>
                  {' '}
                  Signup{' '}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
