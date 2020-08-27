import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import loginService from './services/login'
import storage from './utils/storage'

import { setReducerNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { setReducerUser } from './reducers/loginReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const userFromReducer = useSelector(state => state.user)
  //console.log('userFromReducer: ', userFromReducer)



  useEffect(() => {
    dispatch(initializeBlogs())
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

  if ( !userFromReducer ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
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
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {userFromReducer.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog />
      </Togglable>

      <BlogList user={userFromReducer} />


    </div>
  )
}

export default App
