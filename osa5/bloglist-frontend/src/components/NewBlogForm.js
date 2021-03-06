import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import React, {useState} from 'react'
//import React from 'react'


const NewBlogForm = ({ createBlog, user }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  /* const blogFormRef = React.createRef()
  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false)
   */
  /* const hideWhenVisible = { display: newBlogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogFormVisible ? '' : 'none' } */

  //const blogFormRef = React.createRef()
  //const blogFormRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()
    //blogFormRef.current.toggleVisibility()
    //console.log('New...by... ', user)
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  /* handleBlogTitleChange={({ target }) => setNewBlogTitle(target.value)}
  handleBlogAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
  handleBlogUrlChange={({ target }) => setNewBlogUrl(target.value)}
 */
  return (
    <div className="formDiv">
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
        title
          <input
            id='title'
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            id='author'
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            id='url'
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )



}

/* const NewBlogForm = ({
   addBlog,
   handleBlogTitleChange,
   handleBlogAuthorChange,
   handleBlogUrlChange,
   newBlogTitle,
   newBlogAuthor,
   newBlogUrl
  }) => {
  return (
    <div>
    <h2>Create new blog</h2>
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
      </div>
      <div>
        author
        <input
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
      </div>
      <div>
        url
        <input
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </div>
  )
} */



NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm