
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')

  if (authorsResult.loading)  {
    return <div>loading...</div>
  }

  if (booksResult.loading)  {
    return <div>loading...</div>
  }



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={booksResult.data.allBooks}
        authors={authorsResult.data.allAuthors}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App