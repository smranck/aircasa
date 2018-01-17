import React from 'react';
import Search from './Search.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="mainSearch">
          <Search search={this.search} setSearchQuery={this.setSearchQuery} />
        </div>
      </div>
    );
  }
}
