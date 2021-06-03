import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showChild } from '../../api/child'
import { showMilestones } from '../../api/milestone'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

class ShowChild extends Component {
  constructor () {
    super()

    this.state = {
      child: {
        name: '',
        age: ''
      },
      milestones: ''
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    const { id } = this.props.match.params
    showChild(user, id)
      .then(res => {
        this.setState({ child: res.data.child })
        msgAlert({
          heading: 'Show child success',
          message: messages.showChildSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        this.setState({ id: '', name: '', age: '' })
        msgAlert({
          heading: 'Show child failed with error: ' + error.message,
          message: messages.showChildFailure,
          variant: 'danger'
        })
      })
    /* show all milestones request */
    showMilestones(user, id)
      .then(res => {
        this.setState({ milestones: res.data.milestones })
        msgAlert({
          heading: 'Show all milestones success',
          message: messages.showMilestoneSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        this.setState({ milestones: '' })
        msgAlert({
          heading: 'Show milestones failed with error: ' + error.message,
          message: messages.showMilestonesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, id, age } = this.state.child
    let milestonesJsx = ''
    if (this.state.milestones.length === 0) {
      milestonesJsx = (
        <p>{name} has no milestones yet! Start adding by clicking the button above.</p>
      )
    } else {
      milestonesJsx = (
        <div className="show-milestones">
          {this.state.milestones.map(milestone => (
            <div key={milestone.id} className="mt-5 mr-5">
              <div className="mt-5">
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{milestone.title}</Card.Title>
                    <Card.Text>
                      {milestone.description}
                    </Card.Text>
                    <Button size="sm" className="mr-2" href={`#children/${id}/milestones/${milestone.id}`}>Edit</Button>
                    <Button size="sm" className="mr-2" href={`#children/${id}/milestones/${milestone.id}/delete-milestone`}>Delete</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <Fragment>
        <Jumbotron>
          <h1>{`All about ${name}`}</h1>
          <p>{`Age ${age}`}</p>
          <Button className="mr-2" size="sm" href={`#children/${id}/milestones/`}>Add milestone</Button>
          <Button className="mr-2" size="sm" href={`#children/${id}/update-child`}>{`Edit ${name}`}</Button>
          <Button className="mr-2" size="sm" href={`#children/${id}/delete-child`}>{`Delete ${name}`}</Button>
        </Jumbotron>
        <h3>Milestones</h3>
        {milestonesJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowChild)
