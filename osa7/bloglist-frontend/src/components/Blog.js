import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Comment = ({ content }) => {
  return (
    <li>{content}</li>
  )
}

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  //const dispatch = useDispatch()
  //console.log('blog: ', blog)
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const comments = useSelector(state => state.comments)
  //console.log('blogs_at_BLOG: ', blogs)
  //console.log('comments_at_BLOG: ', comments)
  const blogFromState = blogs.find(b => b.id === id)
  const commentsFromState = comments.filter(c => c.blog === id)
  //console.log('comments_from_State', commentsFromState)
  //console.log('blog from STATE: ', blogFromState)
  //console.log('RENDERING COMPONENT BLOG!')
  //const comments = useSelector(state => state.comments)
  //const blogComments = blog.comments.filter(c => c.blog === blog.id)
  /* console.log('id...', id)
  const comments = useSelector(state => state.comments)
  console.log('comments', comments) */
  //const blogs = useSelector(state => state.comments)
  //const blogComments = comments.filter(c => c.blog === blog.id)
  //console.log('blogComments: ', blogComments)
  /* const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === blog.id) */
  //const comments = useSelector(state => state.comments)
  //const blogComments = blogs.find(c => c.blog === blog.id)


  return (
    <div>
      <div>
        <div>{blogFromState.url}</div>
        <div>likes {blogFromState.likes}
          <button onClick={() => handleLike(blog.id)}>like</button></div>
        <div>added by {blogFromState.user.name}
          {own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}</div>
      </div>
      <h2>Comments</h2>
      <ul>
        {commentsFromState.map(comment =>
          <Comment key={comment.id} content={comment.content} />
        )}
      </ul>
    </div>
  )


  /* const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  ) */
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog