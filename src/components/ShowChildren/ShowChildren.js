import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showChildren } from '../../api/child'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import baby from './../../favicons/baby.png'
import big from './../../favicons/big.png'

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
    let jumboMsgJsx = ''
    if (this.state.children === null) {
      childrenJsx = (
        <p>Loading...</p>
      )
      jumboMsgJsx = (
        <p>Loading...</p>
      )
    } else if (this.state.children.length === 0) {
      jumboMsgJsx = (
        <h4>You don&apos;t have any children yet! Start adding by clicking the button below.</h4>
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
                    { child.age < 18 ? <img src={baby} alt="baby" /> : <img src={big} alt="big" /> }
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
      jumboMsgJsx = (
        <h4>What&apos;s new with the crew? If you&apos;ve got a new member of the family, add them by clicking the button below!</h4>
      )
    }

    return (
      <div className="show-children">
        <Jumbotron>
          <h1 style={{ color: '#FFC107' }}>Watch them grow!</h1>
          {jumboMsgJsx}
          <Button size="lg" href="#create-child">Add child</Button>
        </Jumbotron>
        {childrenJsx}
      </div>
    )
  }
}

export default withRouter(ShowChildren)
