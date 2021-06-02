import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showChildren } from '../../api/child'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'

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
        <div>
          {this.state.children.map(child => (
            <div key={child.id}>
              <div className="mx-auto mt-5">
                <Card>
                  <Card.Body>
                    <Card.Title>{child.name}</Card.Title>
                    <Card.Text>
                      {child.age} years old.
                    </Card.Text>
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
        <h5>Children</h5>
        {childrenJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowChildren)
