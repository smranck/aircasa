import React from 'react';
import axios from 'axios';
import moment from 'moment';
import ListingEntry from './ListingEntry.jsx';
import { CardColumns, Container, Jumbotron } from 'reactstrap';

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      currentBookings: [],
      pastBookings: [],
      modalOpen: false,
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.getCurrentBookings();
  }

  // cancelHandler(index, boolean) {
  //   const idArray = [];
  //   this.state.currentBookings[index].forEach((each) => {
  //     idArray.push(each.id);
  //   });
  //   axios.post('/usercomponent-v', { id: idArray }).then((data) => {
  //     const sortedData = this.sort(data);
  //     this.setState({
  //       currentBookings: sortedData[0],
  //       pastBookings: sortedData[1],
  //       currentIndex: 0,
  //       modalOpen: !this.state.modalOpen,
  //     });
  //   });
  // }

  getCurrentBookings() {
    fetch('/api/bookings/list', {
      method: 'GET',
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then((bookings) => {
        this.sortBookings(bookings);
      });
  }

  sortBookings(bookings) {
    for (let i = 0; i < bookings.length; i += 1) {
      const currentTime = new Date().getTime();
      const bookingEnd = new Date(bookings[i].end).getTime();
      if (bookingEnd < currentTime) {
        this.setState({ pastBookings: [...this.state.pastBookings, bookings[i]] });
      } else {
        this.setState({ currentBookings: [...this.state.currentBookings, bookings[i]] });
      }
    }
  }

  // modalHandler(index) {
  //   console.log(index);
  //   this.setState({
  //     modalOpen: !this.state.modalOpen,
  //     currentIndex: index,
  //   });
  // }

  render() {
    return (
      <div>
        <div>
          <Container style={{ paddingBottom: '10px' }}>
            <center>
              <h3>
                <span style={{ textTransform: 'capitalize' }}>Current Bookings</span>
              </h3>
            </center>
          </Container>
          <Container>
            <Jumbotron>
              <CardColumns>
                {this.state.currentBookings.map(booking => (
                  <ListingEntry listing={booking.listing} booking={booking} key={booking.id} />
                ))}
              </CardColumns>
            </Jumbotron>
          </Container>
          <div />
          <Container style={{ paddingBottom: '10px' }}>
            <center>
              <h3>
                <span style={{ textTransform: 'capitalize' }}>Past Bookings</span>
              </h3>
            </center>
          </Container>
          <Container>
            <Jumbotron>
              <CardColumns>
                {this.state.pastBookings.map(booking => (
                  <ListingEntry listing={booking.listing} booking={booking} key={booking.id} />
                ))}
              </CardColumns>
            </Jumbotron>
          </Container>
          <div />
        </div>
      </div>
    );
  }
}

export default UserComponent;
