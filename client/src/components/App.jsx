import React from 'react';
import Search from './Search.jsx';
import { Container } from 'reactstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      background: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        opacity: '0.8',
      },
    };
    return (
      <div>
        <img src="assets/wallpaper.jpg" className="bg" style={styles.background} />
          <div className="mainSearch">
            <Search search={this.search} setSearchQuery={this.setSearchQuery} />
          </div>
        </div>

    );
  }
}
