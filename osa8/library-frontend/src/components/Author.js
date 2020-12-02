import React from 'react'

const Author = (props) => {
  const bookAuthor = props.authors.find(a => a.id === props.author)
  
return <div>{bookAuthor.name}</div>
}

export default Author