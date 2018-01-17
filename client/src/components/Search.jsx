import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
    };
  }

  handleCityChange(event) {
    this.setState({ city: event.target.value });
  }

  handleStateChange(event) {
    this.setState({ state: event.target.value });
  }

  render() {
    const states = ['California', 'Florida', 'Louisiana', 'Washington'];

    return (
      <Form className="search-container">
        <FormGroup className="search-city-container">
          <Label htmlFor="city">City</Label>
          <Input
            type="city"
            name="city"
            placeholder="city"
            onChange={event => this.handleCityChange(event)}
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
            onChange={event => this.handleStateChange(event)}
          >
            {states.map(state => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Link to={`listings/${this.state.state.toLowerCase()}--${this.state.city.toLowerCase()}`}>
          <Button color="primary"> Search! </Button>
        </Link>
      </Form>
    );
  }
}
