import React, { Component, Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { withRouter } from 'react-router-dom'

class Lander extends Component {
  constructor () {
    super()

    this.state = {
    }
  }

  componentDidMount () {
    this.props.onSignInModalShow()
    this.props.onSignUpModalShow()
  }

  render () {
    return (
      <Fragment>
        <Jumbotron>
          <h1 className="lander-heading">Welcome to GrowUp!</h1>
          <h4>The best place to record your child&apos;s special moments - privately.</h4>
          <div className='btn-auth'>
            <Button className="mr-2" size="lg" href='#sign-up'>Sign up</Button>
            <Button className="mr-2" size="lg" href='#sign-in'>Sign in</Button>
          </div>
        </Jumbotron>
      </Fragment>
    )
  }
}

export default withRouter(Lander)
