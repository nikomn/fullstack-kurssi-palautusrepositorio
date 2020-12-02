import React from 'react'
import Author from './Author'


const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = []

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <Author authors={props.authors} author={b.author} />
              <td>{b.published}</td>
            </tr>
          )}
          
        </tbody>
      </table>
    </div>
  )
}

export default Books