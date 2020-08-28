import React, { useState } from 'react'
//import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/commentReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { setReducerNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

import { useParams } from 'react-router-dom'


const NewComment = () => {

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