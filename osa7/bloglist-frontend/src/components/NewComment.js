import React, { useState } from 'react'
//import { useDispatch } from 'react-redux'
import { createComment, initializeComments } from '../reducers/commentReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { setReducerNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory, Redirect
} from 'react-router-dom'

//import { setNotification } from '../reducers/notificationReducer'

const NewComment = (props) => {
  //const comments = useSelector(state => state.comments)
  //const history = useHistory()
  /* const id = useParams().id
  console.log('id...', id)
  const comments = useSelector(state => state.comments)
  const blogComments = comments.filter(c => c.blog === id)
  console.log('blogComments', blogComments) */


  const dispatch = useDispatch()
  const id = useParams().id

  const [content, setContent] = useState('')

  const addComment = async (event) => {
    event.preventDefault()
    setContent('')
    dispatch(createComment({ content: content, blog: id }))
    dispatch(initializeBlogs())
    const notification = { message: `added comment '${content}'`, type: 'success', cue: 1 }
    dispatch(setReducerNotification(notification, 5))
    //history.push(`/blogs/${props.blog.id}`)
  }

  return (
    <div>
      <h2>create new comment</h2>
      <form onSubmit={addComment}>
        <div>
          <input
            id='content'
            name='content'
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )

}


export default NewComment