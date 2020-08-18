import React from 'react'

const NewBlogForm = ({
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
}

export default NewBlogForm