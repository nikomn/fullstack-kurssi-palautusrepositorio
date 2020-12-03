import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS_IN_GENRE, ALL_BOOKS } from '../queries'
import Book from './Book'



const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  
  const booksInGenreResult = useQuery(ALL_BOOKS_IN_GENRE,{
    variables: { genre }
  })

  
  

  

  if (!props.show) {
    return null
  }

  if (booksInGenreResult.loading)  {
    return <div>loading...</div>
  }

  const bookList = genre === 'all genres' ? booksResult.data.allBooks : booksInGenreResult.data.allBooks

  

  

  

  //const genres = [props.books.filter(b => b.genres.map(g => g))]
  //const genres = props.books.map(b => b.genres.map(g => g))
  /* props.books.forEach(book => 
    book.genres.forEach(genre => genres.push(genre))
    ); */
  
  //const booksInGenre = {genre} !== "all genres" ? props.books : props.books.filter(b => b.genres.includes({genre})) 
  


  return (
    <div>
      <h2>books</h2>

      in genre <b>{genre}</b>

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
          {bookList.map(b =>
              <Book title={b.title} author={b.author} published={b.published} authors={props.authors}/>
          )}
          
        </tbody>
      </table>
      <div>
          <button onClick={() => setGenre('refactoring')}>refactoring</button>
          <button onClick={() => setGenre('agile')}>agile</button>
          <button onClick={() => setGenre('pattern')}>patterns</button>
          <button onClick={() => setGenre('design')}>design</button>
          <button onClick={() => setGenre('crime')}>crime</button>
          <button onClick={() => setGenre('classic')}>classic</button>
          <button onClick={() => setGenre('all genres')}>all genres</button>
        </div>
    </div>
  )
}

export default Books