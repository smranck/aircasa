import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap'

export default class ProfileTab extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Form>
        <br />
        <FormGroup>
          <Row>
            <Col xs='3'>
              <Label for='displayName' className="tabLabel">
                Display Name
              </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='text'
                name='displayName'
                id='displayName'
                placeholder='Enter a display name here'
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs='3'>
              <Label for='location' className="tabLabel">
                Location
              </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='text'
                name='location'
                id='location'
                placeholder='Enter your location'
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs='3'>
              <Label for='tagline' className="tabLabel">
                TagLine
              </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='text'
                name='tagline'
                id='tagline'
                placeholder='Enter your tagline'
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs='3'>
              <Label for='bio' className="tabLabel">
                Biography
              </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='textarea'
                name='bio'
                id='bio'
                placeholder='Write a short bio'
              />
            </Col>
          </Row>
        </FormGroup>
        <button className="todo">
          Submit
        </button>
      </Form>
    )
  }
}

ProfileTab.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol
}
