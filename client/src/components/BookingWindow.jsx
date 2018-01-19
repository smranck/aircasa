import React from 'react';
import Modal from 'react-responsive-modal';
import moment from 'moment';
import { emojify } from 'react-emojione';
import { Alert, UncontrolledAlert, Card, CardBody, Input } from 'reactstrap';

export default class BookingWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      totalPrice: null,
      successMessage: '',
      failMessage: '',
    };
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.bookListing = this.bookListing.bind(this);
    this.getPriceByNights = this.getPriceByNights.bind(this);
  }

  setStartDate(event) {
    this.setState({
      startDate: event.target.value,
    });
    this.getPriceByNights(event.target.value, this.state.endDate);
  }

  setEndDate(event) {
    this.setState({
      endDate: event.target.value,
    });
    this.getPriceByNights(this.state.startDate, event.target.value);
  }

  getPriceByNights(startDate, endDate) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    const nights = Math.floor((utc2 - utc1) / MS_PER_DAY);

    const totalPrice = nights * this.props.listing.nightly_price;
    this.setState({
      totalPrice,
    });
  }

  bookListing() {
    fetch('/api/bookings/reserve', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        listingId: this.props.listing.id,
        start: this.state.startDate,
        end: this.state.endDate,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then(resp => resp.json())
      .then((resp) => {
        if (resp.isBooked) {
          this.setState({
            successMessage: `Successfully booked!! From ${moment(this.state.startDate).format('MMMM Do YYYY')} to ${moment(this.state.endDate).format('MMMM Do YYYY')} Your booking ID is ${
              resp.bookingId
            }`,
          });
        } else {
          this.setState({
            failMessage: resp.reason,
          });
        }
      })
      .catch(console.error);
  }

  handleClick() {
    this.bookListing();
  }

  render() {
    const { listing } = this.props;
    const emoji = '🤔 Please pick another date';
    return (
      <div className="bookingwindow-container">
        <CardBody className="containerBooking">
          <h1>
            {' '}
            ${listing.nightly_price}{' '}
            <span style={{ fontSize: 'medium', fontWeight: '200' }}> per night </span>
          </h1>
          <h2>
            {' '}
            {Array(this.props.listing.rating)
              .fill('*')
              .map(r => emojify(':star:'))}{' '}
            176
          </h2>
          <hr className="bookingwindow-hr" />

          <div className="bookingDatesBox">
            <h2>
              {' '}
              Check in:
              <Input
                type="date"
                id="startDate"
                min={moment().format('YYYY-MM-DD')}
                value={this.state.startDate}
                onChange={this.setStartDate}
              />
            </h2>
            <h2>
              {' '}
              Check out:
              <Input
                type="date"
                id="endDate"
                value={this.state.endDate}
                min={this.state.startDate}
                onChange={this.setEndDate}
              />
            </h2>
            <h2>
              {' '}
              Guests
              <Input type="select">
                {Array(this.props.listing.num_guests)
                  .fill('1')
                  .map((entry, index) => <option key={index}> {index + 1} guest</option>)}
              </Input>
            </h2>
          </div>
          <div>
            <h2>
              {' '}
              Total price: ${this.state.totalPrice <= 0 || Number.isNaN(this.state.totalPrice)
                ? '0'
                : this.state.totalPrice}
            </h2>
          </div>
          {this.state.totalPrice === 0 ? (
            <Alert color="danger"> {emoji}</Alert>
          ) : (
            <div>
              <button className="dateSelectionSubmit" onClick={this.handleClick}>
                {' '}
                Book{' '}
              </button>
              <small className="small-booking-text">
                <span>You won't be charged yet</span>
              </small>
            </div>
          )}
          {this.state.successMessage && (
            <UncontrolledAlert color="success">{this.state.successMessage}</UncontrolledAlert>
          )}
          {this.state.failMessage && (
            <UncontrolledAlert color="danger">{this.state.failMessage} </UncontrolledAlert>
          )}
        </CardBody>
      </div>
    );
  }
}
