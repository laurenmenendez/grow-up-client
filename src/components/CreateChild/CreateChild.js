import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { createChild } from '../../api/child'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class CreateChild extends Component {
  constructor () {
    super()

    this.state = {
      child: {
        name: '',
        age: ''
      }
    }
  }

  componentDidMount () {
    this.props.onCreateChildModalShow()
  }

handleChange = event => this.setState({
  [event.target.name]: event.target.value
})

handleSubmit = (event) => {
  event.preventDefault()
  const { msgAlert, history, user } = this.props
  createChild(this.state, user)
    .then(res => {
      this.setState({ child: res.data.child })
    })
    .then(() =>
      msgAlert({
        heading: 'Create child success',
        message: messages.createChildSuccess,
        variant: 'success'
      }))
    .then(() => history.push('/children'))
    .catch(error => {
      this.setState({ name: '', age: '' })
      msgAlert({
        heading: 'Create child failed with error: ' + error.message,
        message: messages.createChildFailure,
        variant: 'danger'
      })
    })
}
render () {
  const { name, age } = this.state
  return (
    <div>
      <Modal show={this.props.createChildModal} onHide={this.props.onCreateChildModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Child</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-10 col-md-8 mx-auto mt-5">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Enter name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    required
                    name="age"
                    value={age}
                    type="number"
                    placeholder="Enter age"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
}

export default withRouter(CreateChild)
