import React from 'react'
import { connect } from 'react-redux'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const Notification = (props) => {
  console.log('props: ', props)

  if ( !props.notification ) {
    return null
  }

  if (props.notification.message === null) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: props.notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return (
    <div className="container">
      <Alert variant="success">
        {props.notification.message}
      </Alert>
    </div>

  )



}

/* const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>
    {notification.message}
  </div>
}

export default Notification */

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification



