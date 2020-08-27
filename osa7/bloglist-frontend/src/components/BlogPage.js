import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { likeBlog } from '../reducers/blogReducer'
import { setReducerNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from 'react-router-dom'


const BlogPage = (props) => {
  const dispatch = useDispatch()
  const id = useParams().id

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(likeBlog(likedBlog))
    const notification = { message: `Added like to blog '${blogToLike.title}' by ${blogToLike.author}`, type: 'success', cue: 1 }
    dispatch(setReducerNotification(notification, 5))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
    }
    const notification = { message: `Removed blog '${blogToRemove.title}' by ${blogToRemove.author}`, type: 'success', cue: 1 }
    dispatch(setReducerNotification(notification, 5))

  }

  if (!blog) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        own={props.user.username===blog.user.username}
      />

    </div>
  )

}

export default BlogPage