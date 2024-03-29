import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import ShowChildren from './components/ShowChildren/ShowChildren'
import CreateChild from './components/CreateChild/CreateChild'
import UpdateChild from './components/UpdateChild/UpdateChild'
import DeleteChild from './components/DeleteChild/DeleteChild'
import ShowChild from './components/ShowChild/ShowChild'
import UpdateMilestone from './components/UpdateMilestone/UpdateMilestone'
import CreateMilestone from './components/CreateMilestone/CreateMilestone'
import DeleteMilestone from './components/DeleteMilestone/DeleteMilestone'
import Lander from './components/Lander/Lander'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // modal states stored here and passed down as props to components
      user: null,
      msgAlerts: [],
      signUpModal: true,
      signInModal: true,
      changePasswordModal: true,
      createChildModal: true,
      updateChildModal: true,
      updateMilestoneModal: true,
      createMilestoneModal: true
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  // modal functions stored here, they change the state of each modal to enable opening/closing them. Passed down to components as props
  onSignUpModalShow = () => {
    this.setState({ signUpModal: true })
  }

  onSignUpModalClose = () => (
    this.setState({ signUpModal: false })
  )

  onSignInModalShow = () => {
    this.setState({ signInModal: true })
  }

  onSignInModalClose = () => {
    this.setState({ signInModal: false })
  }

  onChangePasswordModalShow = () => {
    this.setState({ changePasswordModal: true })
  }

  onChangePasswordModalClose = () => {
    this.setState({ changePasswordModal: false })
  }

  onCreateChildModalShow = () => {
    this.setState({ createChildModal: true })
  }

  onCreateChildModalClose = () => {
    this.setState({ createChildModal: false })
  }

  onUpdateChildModalShow = () => {
    this.setState({ updateChildModal: true })
  }

  onUpdateChildModalClose = () => {
    this.setState({ updateChildModal: false })
  }

  onUpdateMilestoneModalShow = () => {
    this.setState({ updateMilestoneModal: true })
  }

  onUpdateMilestoneModalClose = () => {
    this.setState({ updateMilestoneModal: false })
  }

  onCreateMilestoneModalShow = () => {
    this.setState({ createMilestoneModal: true })
  }

  onCreateMilestoneModalClose = () => {
    this.setState({ createMilestoneModal: false })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <div className="main">
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Lander onSignUpModalShow={this.onSignUpModalShow} onSignInModalShow={this.onSignInModalShow}/>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} onSignUpModalShow={this.onSignUpModalShow} onSignUpModalClose={this.onSignUpModalClose} signUpModal={this.state.signUpModal}/>
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} onSignInModalShow={this.onSignInModalShow} onSignInModalClose={this.onSignInModalClose} signInModal={this.state.signInModal}/>
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} onChangePasswordModalShow={this.onChangePasswordModalShow} onChangePasswordModalClose={this.onChangePasswordModalClose} changePasswordModal={this.state.changePasswordModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/children' render={() => (
            <ShowChildren msgAlert={this.msgAlert} user={user} onCreateChildModalShow={this.onCreateChildModalShow}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/create-child' render={() => (
            <CreateChild msgAlert={this.msgAlert} user={user} onCreateChildModalShow={this.onCreateChildModalShow} onCreateChildModalClose={this.onCreateChildModalClose} createChildModal={this.state.createChildModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/children/:id/update-child' render={() => (
            <UpdateChild msgAlert={this.msgAlert} user={user} onUpdateChildModalShow={this.onUpdateChildModalShow} onUpdateChildModalClose={this.onUpdateChildModalClose} updateChildModal={this.state.updateChildModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/children/:id/delete-child' render={() => (
            <DeleteChild msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/children/:id/show-child' render={() => (
            <ShowChild msgAlert={this.msgAlert} user={user} onUpdateChildModalShow={this.onUpdateChildModalShow} onUpdateMilestoneModalShow={this.onUpdateMilestoneModalShow} onCreateMilestoneModalShow={this.onCreateMilestoneModalShow}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/children/:id/milestones/:milestoneId' render={() => (
            <UpdateMilestone msgAlert={this.msgAlert} user={user} onUpdateMilestoneModalShow={this.onUpdateMilestoneModalShow} onUpdateMilestoneModalClose={this.onUpdateMilestoneModalClose} updateMilestoneModal={this.state.updateMilestoneModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/children/:id/milestones/' render={() => (
            <CreateMilestone msgAlert={this.msgAlert} user={user} onCreateMilestoneModalShow={this.onCreateMilestoneModalShow} onCreateMilestoneModalClose={this.onCreateMilestoneModalClose} createMilestoneModal={this.state.createMilestoneModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/children/:id/milestones/:milestoneId/delete-milestone' render={() => (
            <DeleteMilestone msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </div>
    )
  }
}

export default App
