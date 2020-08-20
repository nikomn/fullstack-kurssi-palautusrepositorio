import React, { useState } from 'react'
import blogService from '../services/blogs'
//const jwt = require('jsonwebtoken')
//import React from 'react'

const Blog = ({ blog, user }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  const likeBlog = () => {
    //console.log('This line of code is run...')
    const userData = JSON.stringify(blog.user)

    const userDataJSON = JSON.parse(userData)

    let updatedLikes = blog.likes + 1

    const updatedBlog = {
      user: userDataJSON.id,
      likes: updatedLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }

    console.log(updatedBlog)

    blogService.update(updatedBlog)
    window.location.reload()



  }

  const deleteBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      blogService.remove(blog)
      window.location.reload()
    }



  }


  const DeleteButton = ({ user }) => {
    const userData = JSON.stringify(blog.user)
    const userDataJSON = JSON.parse(userData)
    //const decodedToken = jwt.verify(user, process.env.SECRET)
    //const x = window.localStorage.getItem('user')
    //console.log(userDataJSON.username, ' vs ', user.username)
    if (userDataJSON.username === user.username) {
      return (
        <div>
          <button onClick={deleteBlog}>Delete</button>
        </div>
      )
    } else {
      return ''
    }
  }

  /* const toggleShowInfo = () => {
    setShowAllInfo(!showAllInfo)
  } */

  //console.log(blog.title)

  const userData = JSON.stringify(blog.user)

  const userDataJSON = JSON.parse(userData)

  //const userName = userDataJSON.name

  //const userData = JSON.parse(blog.user)

  //console.log('showAllInfo: ', showAllInfo)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  if (showAllInfo) {
    return (
      <div style={blogStyle} className='blog'>
        <div>
          {blog.title} {blog.author}
          <button
            onClick={() => setShowAllInfo(!showAllInfo)}>
            {showAllInfo ? 'hide info' : 'show info' }
          </button><br />
          {blog.url} <br />
        likes {blog.likes}
          <button
            onClick={likeBlog}>
          like
          </button>
          <br />
          {userDataJSON.name} <br />
          <DeleteButton user={user} />
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='blog'>
        <div>
          {blog.title} {blog.author}
          <button
            onClick={() => setShowAllInfo(!showAllInfo)}>
            {showAllInfo ? 'hide info' : 'show info' }
          </button>
        </div>
      </div>
    )
  }

}

export default Blog
