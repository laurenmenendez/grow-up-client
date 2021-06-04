import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showChildren } from '../../api/child'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

class ShowChildren extends Component {
  constructor () {
    super()

    this.state = {
      children: null,
      owner: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    showChildren(user)
      .then(res => {
        this.setState({ children: res.data.children })
        console.log(this.state.children)
      })
      .catch(error => {
        this.setState({ children: null })
        msgAlert({
          heading: 'Show all children failed with error: ' + error.message,
          message: messages.showChildrenFailure,
          variant: 'danger'
        })
      })
    this.props.onCreateChildModalShow()
  }

  render () {
    let childrenJsx = ''
    if (this.state.children === null) {
      childrenJsx = (
        <p>Loading...</p>
      )
    } else if (this.state.children.length === 0) {
      childrenJsx = (
        <p>You don&apos;t have any children yet!</p>
      )
    } else {
      childrenJsx = (
        <div className="show-children-cards">
          {this.state.children.map(child => (
            <div key={child.id}>
              <Card style={{ width: '18rem' }} >
                <Card.Body>
                  <Card.Title>
                    {child.name}
                  </Card.Title>
                  <Card.Text>
                    {child.age} years old.
                  </Card.Text>
                  <Button size="sm" href={`#children/${child.id}/show-child`}>View Details</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="show-children">
        <Jumbotron>
          <h1>Watch them grow!</h1>
          <h4>Keep all of your children up to date. If you&apos;ve got a new member of the family, add them by clicking the button below!</h4>
          <Button size="lg" href="#create-child">Add child</Button>
        </Jumbotron>
        {childrenJsx}
      </div>
    )
  }
}

export default withRouter(ShowChildren)
