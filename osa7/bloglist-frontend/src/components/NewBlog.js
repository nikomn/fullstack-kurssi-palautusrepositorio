import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setReducerNotification } from '../reducers/notificationReducer'

//import { setNotification } from '../reducers/notificationReducer'

const NewBlog = (props) => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    /* const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value */
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(createBlog({ title: title, author: author, url: url }))
    const notification = { message: `added blog '${title}' by ${author}`, type: 'success', cue: 1 }
    dispatch(setReducerNotification(notification, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          author
          <input
            id='author'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title
          <input
            id='title'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )

}


export default NewBlog