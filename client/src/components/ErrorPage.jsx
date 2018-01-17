import React from 'react';
import { Link } from 'react-router-dom';
import er from '../../dist/500error.png';

const ErrorPage = props => (
  <div>
    <img src={er} />
    <Link to="/">
      {' '}
      <button> Go Home </button>
    </Link>
  </div>
);

export default ErrorPage;
