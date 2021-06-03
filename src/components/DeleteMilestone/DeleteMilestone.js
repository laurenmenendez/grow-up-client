import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { deleteChild } from '../../api/child'

class DeleteChild extends Component {
  constructor () {
    super()

    this.state = {
      delete: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    const { id } = this.props.match.params
    deleteChild(user, id)
      .then(() => {
        this.setState({ delete: true })
        msgAlert({
          heading: 'Child was successfully deleted!',
          message: messages.deleteChildSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Delete child failed with error: ' + error.message,
          message: messages.deleteChildFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div>
        {this.state.delete ? <Redirect to="/children" /> : ''}
      </div>
    )
  }
}

export default withRouter(DeleteChild)
