import React, { useState } from 'react'
//import blogService from '../services/blogs'
//const jwt = require('jsonwebtoken')
//import React from 'react'

const DeleteButton = ({ blog, user, deleteBlog }) => {
  const userData = JSON.stringify(blog.user)
  const userDataJSON = JSON.parse(userData)
  //const decodedToken = jwt.verify(user, process.env.SECRET)
  //const x = window.localStorage.getItem('user')
  //console.log(userDataJSON.username, ' vs ', user.username)

  /* console.log('Blogtitle: ', blog.title)
  console.log('User: ', user)
  console.log('Username on blog : ', userDataJSON.username)
 */
  if (user !== undefined && userDataJSON.username === user.username) {
    return (
      <div>
        <button onClick={() => deleteBlog(blog)}>Delete</button>
      </div>
    )
  } else {
    return ''
  }
}


const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  const addLikeToBlog = () => {
    //console.log('This line of code is run...')
    const userData = JSON.stringify(blog.user)

    const userDataJSON = JSON.parse(userData)

    //let updatedLikes = blog.likes + 1

    likeBlog({
      user: userDataJSON.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })

    //console.log(updatedBlog)

    //blogService.update(updatedBlog)
    //window.location.reload()



  }

  /* const likeBlog = () => {
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
 */


  /* const toggleShowInfo = () => {
    setShowAllInfo(!showAllInfo)
  } */

  //console.log(blog.title)

  const userData = JSON.stringify(blog.user)

  console.log(userData)
  var userDataJSON = {}

  if (userData !== undefined) {
    userDataJSON = JSON.parse(userData)
  }



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
          {/* <LikeButton /> */}
          <button
            onClick={addLikeToBlog}>
          like
          </button>
          <br />
          {userDataJSON.name} <br />
          <DeleteButton user={user} blog={blog} deleteBlog={deleteBlog} />
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
