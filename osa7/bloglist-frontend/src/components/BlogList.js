import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const BlogList = (props) => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
         <tbody>
          {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link  to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>  
            </td>
            <td>
              {blog.user.username}
            </td>
          </tr>
      )}     
         </tbody>
      </Table>
      
    </div>
  )

}

export default BlogList