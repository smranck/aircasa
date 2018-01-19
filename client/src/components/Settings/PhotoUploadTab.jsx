import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'

export default class PhotoUploadTab extends React.Component {
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
              <Label for='profilePicture' className="tabLabel">
                Upload a Profile Picture!
              </Label>
            </Col>
            <Col xs='9'>
              <Input type='file' name='profilePicture' id='profilePicture' />
            </Col>
          </Row>
        </FormGroup>
        <br />
        <button className="todo">
          Upload
        </button>
      </Form>
    )
  }
}

PhotoUploadTab.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol
}
