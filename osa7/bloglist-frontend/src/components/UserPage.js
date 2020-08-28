import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const UserPage = () => {

  const id = useParams().id

  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>

    </div>
  )

}

export default UserPage