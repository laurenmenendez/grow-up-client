import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { updateChild, showChild } from '../../api/child'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class UpdateChild extends Component {
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
    this.props.onUpdateChildModalShow()
    /* get show request for this child to populate state with old info */
    const { user } = this.props
    const { id } = this.props.match.params
    showChild(user, id)
      .then(res => {
        this.setState({ child: res.data.child })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    const { id } = this.props.match.params

    updateChild(this.state, user, id)
      .then(res => {
        this.setState({ child: res.data.child })
      })
      .then(() =>
        msgAlert({
          heading: 'Update child success',
          message: messages.updateChildSuccess,
          variant: 'success'
        }))
      .then(() => history.push(`/children/${id}/show-child`))
      .catch(error => {
        this.setState({ name: '', age: '' })
        msgAlert({
          heading: 'Update child failed with error: ' + error.message,
          message: messages.updateChildFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { name, age } = this.state
    const { id } = this.props.match.params
    return (
      <div>
        <Modal show={this.props.updateChildModal} onHide={this.props.onUpdateChildModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Child</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-10 col-md-8 mx-auto mt-5">
                <h4>Enter only the information you&apos;d like to update on this child</h4>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
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
        {!this.props.updateChildModal ? <Redirect to={`/children/${id}/show-child`} /> : ''}
      </div>
    )
  }
}

export default withRouter(UpdateChild)
