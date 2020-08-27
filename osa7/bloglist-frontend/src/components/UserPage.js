import React from 'react'
import { useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
  } from 'react-router-dom'
import Blog from './Blog'

const UserPage = () => {
  //const id = useParams().id
  //console.log('useParams: ', useParams().id)
  const id = useParams().id
  
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  //const user = users.map(user => user.id === id)
  //console.log('uuseri: ', user.name)
  //const userdata = JSON.stringify(user)
  //const userdataJSON = JSON.parse(user)
  //console.log('userdata: ', userdata)
  //const username = user.username

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