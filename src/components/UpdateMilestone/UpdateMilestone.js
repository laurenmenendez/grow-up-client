import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { updateMilestone, showMilestone } from '../../api/milestone'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class UpdateMilestone extends Component {
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
    this.props.onUpdateMilestoneModalShow()
    /* get show request for this milestone to populate state with old info */
    const { user } = this.props
    const { id, milestoneId } = this.props.match.params
    showMilestone(user, id, milestoneId)
      .then(res => {
        this.setState({ milestone: res.data.milestone })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    const { id, milestoneId } = this.props.match.params

    updateMilestone(this.state, user, id, milestoneId)
      .then(res => {
        this.setState({ milestone: res.data.milestone })
      })
      .then(() =>
        msgAlert({
          heading: 'Update milestone success',
          message: messages.updateMilestoneSuccess,
          variant: 'success'
        }))
      .then(() => history.push(`/children/${id}/show-child`))
      .catch(error => {
        this.setState({ title: '', description: '' })
        msgAlert({
          heading: 'Update milestone failed with error: ' + error.message,
          message: messages.updateMilestoneFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { title, description } = this.state
    const { id } = this.props.match.params
    return (
      <div>
        <Modal show={this.props.updateMilestoneModal} onHide={this.props.onUpdateMilestoneModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Milestone</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-10 col-md-8 mx-auto mt-5">
                <h4>Enter only the information you&apos;d like to update on this milestone</h4>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
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
        {!this.props.updateMilestoneModal ? <Redirect to={`/children/${id}/show-child`} /> : ''}
      </div>
    )
  }
}

export default withRouter(UpdateMilestone)
