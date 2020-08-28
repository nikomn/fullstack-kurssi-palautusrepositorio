import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)


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