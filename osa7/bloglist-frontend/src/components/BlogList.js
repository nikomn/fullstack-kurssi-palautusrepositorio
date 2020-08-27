import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { likeBlog } from '../reducers/blogReducer'
import { setReducerNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogList = (props) => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    /* await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b)) */
    dispatch(likeBlog(likedBlog))
    const notification = { message: `Added like to blog '${blogToLike.title}' by ${blogToLike.author}`, type: 'success', cue: 1 }
    dispatch(setReducerNotification(notification, 5))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      /* await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id)) */
      dispatch(removeBlog(id))
    }
    const notification = { message: `Removed blog '${blogToRemove.title}' by ${blogToRemove.author}`, type: 'success', cue: 1 }
    dispatch(setReducerNotification(notification, 5))
  }

  /* const like = (blog) => {
    console.log('like', blog.id)
    dispatch(likeBlog(blog.id))
    dispatch(setReducerNotification(`you liked '${blog.title}'`, 5))
  } */

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        own={props.user.username===blog.user.username}
      />
      )}
    </div>
  )

}

export default BlogList