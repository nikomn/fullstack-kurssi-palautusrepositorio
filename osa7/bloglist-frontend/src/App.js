import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import NewComment from './components/NewComment'

import loginService from './services/login'
import storage from './utils/storage'

import { setReducerNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeComments } from './reducers/commentReducer'
import BlogList from './components/BlogList'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import { setReducerUser } from './reducers/loginReducer'
import UserList from './components/Users'

import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const userFromReducer = useSelector(state => state.user)
  //console.log('userFromReducer: ', userFromReducer)



  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeComments())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setReducerUser(user))
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(setReducerUser(user))
      const notification = { message: `${user.name} welcome back!`, type: 'success', cue: 1 }
      dispatch(setReducerNotification(notification, 5))
      storage.saveUser(user)
    } catch(exception) {
      const notification = { message: 'wrong username/password', type: 'error', cue: 1 }
      dispatch(setReducerNotification(notification, 5))
    }

  }


  const handleLogout = () => {
    dispatch(setReducerUser(null))
    storage.logoutUser()
  }

  const padding = {
    padding: 5
  }

  if ( !userFromReducer ) {
    return (
      <div class="container">

        <h2>login to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>

        {/* <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form> */}
      </div>
    )
  }
  // 7.16: navigointi Tee sovellukseen navigaatiomenu
  // Toteutettu vaiheessa 7.13
  return (
    <div class="container">
      <Router>

      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

        <Switch>
          <Route path="/users/:id">
            <h2>blogs</h2>

            <Notification />

            <p>
              {userFromReducer.name} logged in <button onClick={handleLogout}>logout</button>
            </p>
            <UserPage />
          </Route>
          <Route path="/blogs/:id">
            <h2>blogs</h2>

            <Notification />

            <p>
              {userFromReducer.name} logged in <button onClick={handleLogout}>logout</button>
            </p>
            <BlogPage user={userFromReducer} />
            <NewComment />
          </Route>

          <Route path="/users">
            <h2>blogs</h2>

            <Notification />

            <p>
              {userFromReducer.name} logged in <button onClick={handleLogout}>logout</button>
            </p>
            <UserList />
          </Route>
          <Route path="/">

            <h2>blogs</h2>

            <Notification />

            <p>
              {userFromReducer.name} logged in <button onClick={handleLogout}>logout</button>
            </p>

            <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
              <NewBlog />
            </Togglable>

            <BlogList user={userFromReducer} />
          </Route>
        </Switch>
      </Router>


    </div>
  )
}

export default App
