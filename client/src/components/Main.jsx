import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, BrowserHistory, Link } from 'react-router-dom';
import Navigation from './Navigation.jsx';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}
