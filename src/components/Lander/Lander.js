import React from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

const Lander = () => (
  <Jumbotron>
    <h1>Welcome to GrowUp!</h1>
    <p>Sign up or sign in to get started.</p>
    <Button className="mr-2" size="lg" href='#sign-up'>Sign up</Button>
    <Button className="mr-2" size="lg" href='#sign-in'>Sign in</Button>
  </Jumbotron>
)

export default Lander
