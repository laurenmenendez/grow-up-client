import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showChild } from '../../api/child'
import { showMilestones } from '../../api/milestone'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Badge from 'react-bootstrap/Badge'

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
    // show all milestones request so that we can access the array later to map through it and generate the cards
    showMilestones(user, id)
      .then(res => {
        this.setState({ milestones: res.data.milestones })
      })
      .catch(error => {
        this.setState({ milestones: '' })
        msgAlert({
          heading: 'Show milestones failed with error: ' + error.message,
          message: messages.showMilestonesFailure,
          variant: 'danger'
        })
      })
    // sets modal states back to true so that modals can be opened again after closing out and being redirected back to this page
    this.props.onUpdateChildModalShow()
    this.props.onCreateMilestoneModalShow()
    this.props.onUpdateMilestoneModalShow()
  }

  render () {
    // below sets content below jumbotron based on whether child has any milestones or not
    const { name, id, age } = this.state.child
    let milestonesJsx = ''
    if (this.state.milestones.length === 0) {
      milestonesJsx = (
        <h4>{name} has no milestones yet! Start adding by clicking the button above.</h4>
      )
    } else {
      // maps through milestones and generates cards for each
      milestonesJsx = (
        <div className="show-milestones">
          {this.state.milestones.map(milestone => (
            <div key={milestone.id}>
              <div>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{milestone.title}</Card.Title>
                    <Card.Text>
                      {milestone.description}
                    </Card.Text>
                    <div className="btn-milestone">
                      <Button size="sm" className="mr-2" href={`#children/${id}/milestones/${milestone.id}`}>Edit</Button>
                      <Button size="sm" className="mr-2" href={`#children/${id}/milestones/${milestone.id}/delete-milestone`}>Delete</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="show-children">
        <Jumbotron>
          <h1>{`All about ${name}`}</h1>
          <h4>{`Age ${age}`}</h4>
          <div className="btn-auth">
            <Button size="lg" className="mr-2" href={`#children/${id}/milestones/`}>Add milestone</Button>
            <Button size="lg" className="mr-2" href={`#children/${id}/update-child`}>{`Edit ${name}`}</Button>
            <Button size="lg" className="mr-2" href={`#children/${id}/delete-child`}>{`Delete ${name}`}</Button>
          </div>
        </Jumbotron>
        {/* if there are no milestones, will not display "milestones" badge heading */}
        { this.state.milestones.length === 0 ? '' : <h3>
          <Badge variant="secondary">
            Milestones
          </Badge>
        </h3> }
        {milestonesJsx}
      </div>
    )
  }
}

export default withRouter(ShowChild)
