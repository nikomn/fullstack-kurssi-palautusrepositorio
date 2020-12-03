import React from 'react'
import Author from './Author'

const Book = (props) => {
  
return (
  <tr key={props.title}>
  <td>{props.title}</td>
  <Author authors={props.authors} author={props.author} />
  <td>{props.published}</td>
  </tr>
)
}

export default Book