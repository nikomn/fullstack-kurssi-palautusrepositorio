import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [userId, setUserId] = useState(null)

  /* const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('') */
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  //const [newBlogFormVisible, setNewBlogFormVisible] = useState(false)

  //const noteFormRef = React.createRef()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlog = blogs.sort(function (a, b) {
        return b.likes - a.likes
      })
      setBlogs( sortedBlog )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeBlog = (blogObject) => {
    //console.log('This line of code is run...')
    const userData = JSON.stringify(blogObject.user)

    const userDataJSON = JSON.parse(userData)

    let updatedLikes = blogObject.likes + 1

    const updatedBlog = {
      user: userDataJSON.id,
      likes: updatedLikes,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      id: blogObject.id
    }

    console.log(updatedBlog)

    blogService.update(updatedBlog)
    /* blogService.getAll().then(blogs => {
      const sortedBlog = blogs.sort(function (a, b) {
        return b.likes - a.likes
      })
      setBlogs( sortedBlog )
    }) */
    window.location.reload()

    //setBlogs(blogs.concat(response))

  }

  const deleteBlog = (blogObject) => {
    const confirm = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    if (confirm) {
      blogService.remove(blogObject)
      window.location.reload()
    }
  }

  /* const LikeButton = ({ blog, likeBlog }) => {
    return (
      <div>
        <button
          onClick={likeBlog}
          blog=
        >
          like
        </button>
      </div>
    )
  } */

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username, password,
    })
    //console.log('User: ', user)

    if (user === null) {
      const eMsg = 'login error! wrong username or password'
      setErrorMessage(
        `${eMsg}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(
        `Login success for user ${user.name}`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }


  }

  const handleLogout = () => {
    window.localStorage.clear()
    setNotificationMessage(
      'Loging out...'
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 500)
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(response => {
        setNotificationMessage(
          `Added new blog ${blogObject.title} by ${blogObject.author}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setBlogs(blogs.concat(response))
      })
  }



  const newBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlogForm createBlog={addBlog} user={user} />
    </Togglable>
  )

  /* const newBlogForm = () => {
    const hideWhenVisible = { display: newBlogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: newBlogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogFormVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            handleBlogTitleChange={({ target }) => setNewBlogTitle(target.value)}
            handleBlogAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            handleBlogUrlChange={({ target }) => setNewBlogUrl(target.value)}
            addBlog={addBlog}
          />
          <button onClick={() => setNewBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  } */

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="info">
        {message}
      </div>
    )
  }

  const Error = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <p>{user.name} logged in <button id='logout-button' onClick={handleLogout}>logout</button></p>
      <div>{newBlogForm()}</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )

  /* return (


    <div>
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        <h2>blogs</h2>
        {blogs.map(blog =>
         <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }

    </div>
  ) */
}

export default App