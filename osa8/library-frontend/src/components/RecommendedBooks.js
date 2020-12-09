import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS_IN_GENRE, FAVOURITE } from '../queries'
import Book from './Book'



const RecommendedBooks = (props) => {
  const [token, setToken] = useState(props.token)
  const [genre, setGenre] = useState(props.genre)
  const authorsResult = useQuery(ALL_AUTHORS)
  const userResult = useQuery(FAVOURITE)
  
  const booksInGenreResult = useQuery(ALL_BOOKS_IN_GENRE,{
    variables: { genre },
    pollInterval: 2000
  })

  
  

  

  if (!props.show) {
    return null
  }

  if (booksInGenreResult.loading)  {
    return <div>loading...</div>
  }

  if (userResult.loading)  {
    return <div>loading...</div>
  }

  if (userResult.data === null)  {
    return <div>no data...</div>
  }

  //setGenre(userResult.data.favouriteGenre)

  //const g = userResult.data.me.favouriteGenre



  return (
    <div>
      <h2>books</h2>

      books in your favourite genre <b>{props.genre}</b>

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
          {booksInGenreResult.data.allBooks.map(b =>
              <Book title={b.title} author={b.author} published={b.published} authors={props.authors}/>
          )}
          
          
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks