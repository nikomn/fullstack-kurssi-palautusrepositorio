import React, { useState } from 'react'
//import React from 'react'

const Blog = ({ blog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  /* const toggleShowInfo = () => {
    setShowAllInfo(!showAllInfo)
  } */

  //console.log(blog.title)

  const userData = JSON.stringify(blog.user)

  const userDataJSON = JSON.parse(userData)

  //const userName = userDataJSON.name

  //const userData = JSON.parse(blog.user) 

  //console.log('showAllInfo: ', showAllInfo)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  

  if (showAllInfo) {
    return (
      <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button 
          onClick={() => setShowAllInfo(!showAllInfo)}>
          {showAllInfo ? 'hide info' : 'show info' }
        </button><br />
        {blog.url} <br />
        likes {blog.likes} <button>like</button> <br />
        {userDataJSON.name}
      </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button 
          onClick={() => setShowAllInfo(!showAllInfo)}>
          {showAllInfo ? 'hide info' : 'show info' }
        </button>
      </div>
      </div>
      )
  }
  
}

export default Blog
