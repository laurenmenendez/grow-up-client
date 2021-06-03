import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { deleteMilestone } from '../../api/milestone'

class DeleteMilestone extends Component {
  constructor () {
    super()

    this.state = {
      delete: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    const { id, milestoneId } = this.props.match.params
    deleteMilestone(user, id, milestoneId)
      .then(() => {
        this.setState({ delete: true })
        msgAlert({
          heading: 'Milestone was successfully deleted!',
          message: messages.deleteMilestoneSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Delete milestone failed with error: ' + error.message,
          message: messages.deleteMilestoneFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { id } = this.props.match.params
    return (
      <div>
        {this.state.delete ? <Redirect to={`/children/${id}/show-child`} /> : ''}
      </div>
    )
  }
}

export default withRouter(DeleteMilestone)
