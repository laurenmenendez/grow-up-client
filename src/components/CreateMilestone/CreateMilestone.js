import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { createMilestone } from '../../api/milestone'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class CreateMilestone extends Component {
  constructor () {
    super()

    this.state = {
      milestone: {
        title: '',
        description: ''
      }
    }
  }

  componentDidMount () {
    this.props.onCreateMilestoneModalShow()
  }

handleChange = event => this.setState({
  [event.target.name]: event.target.value
})

handleSubmit = (event) => {
  event.preventDefault()
  const { msgAlert, history, user } = this.props
  const { id } = this.props.match.params
  createMilestone(this.state, user, id)
    .then(res => {
      this.setState({ milestone: res.data.milestone })
    })
    .then(() =>
      msgAlert({
        heading: 'Create milestone success',
        message: messages.createMilestoneSuccess,
        variant: 'success'
      }))
    .then(() => history.push(`/children/${id}/show-child`))
    .catch(error => {
      this.setState({ title: '', description: '' })
      msgAlert({
        heading: 'Create milestone failed with error: ' + error.message,
        message: messages.createMilestoneFailure,
        variant: 'danger'
      })
    })
}
render () {
  const { title, description } = this.state
  const { id } = this.props.match.params
  return (
    <div>
      <Modal show={this.props.createMilestoneModal} onHide={this.props.onCreateMilestoneModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Milestone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-10 col-md-8 mx-auto mt-5">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Enter title"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    name="description"
                    value={description}
                    type="textarea"
                    placeholder="Enter description"
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
      {!this.props.createMilestoneModal ? <Redirect to={`/children/${id}/show-child`} /> : ''}
    </div>
  )
}
}

export default withRouter(CreateMilestone)
