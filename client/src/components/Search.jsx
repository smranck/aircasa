import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
    };

    // this.search = this.search.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleCityChange(event) {
    this.setState({ city: event.target.value });
  }

  handleStateChange(event) {
    this.setState({ state: event.target.value });
  }

  handleClick() {
    let { city, state } = this.state;
    const searchQuery = { city, state };
    this.props.setSearchQuery(searchQuery);
  }

  // TODO: move to listings component
  // search() {
  //   let { city, state } = this.state;
  //   console.log(city);
  //   console.log(state);
  //   fetch('/api/listings/search', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       city,
  //       state,
  //     }),
  //   });
  // }

  render() {
    const states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Northern Mariana Islands',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Palau',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virgin Island',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];

    return (
      <Form className="search-container">
        <FormGroup className="search-city-container">
          <Label htmlFor="city">City</Label>
          <Input
            type="city"
            name="city"
            placeholder="city"
            onChange={(event) => this.handleCityChange(event)}
          />
        </FormGroup>
        <FormGroup className="search-state-container">
          <Label className="state-label" htmlFor="state">
            State
          </Label>
          {/* //TODO: add onchange set state state to event.target.value */}
          <Input
            className="state-select"
            type="select"
            name="state"
            value={this.state.state}
            onChange={(event) => this.handleStateChange(event)}
          >
            {states.map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Link
          to={`listings/${this.state.state.toLowerCase()}--${this.state.city.toLowerCase()}`}
        >
          <Button color="primary" onClick={this.handleClick}>
            {' '}
            Search!{' '}
          </Button>
        </Link>
      </Form>
    );
  }
}

{
  /* <form onSubmit={this.handleKeyUp}>
        <label>
          <input
            type="text"
            value={this.state.value}
            placeholder="Anywhere"
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" />
      </form> */
}
