import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import { IconContext } from 'react-icons'
// import { BsPeople } from 'react-icons/bs'
import favicon from './../../favicons/favicon.ico'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#children">Home</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href={ user ? '#children' : '#' }>
      <img src={favicon} alt="favicon" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* { alwaysOptions } */}
        { user ? authenticatedOptions : '' }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
