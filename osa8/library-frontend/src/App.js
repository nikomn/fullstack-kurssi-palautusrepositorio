
import React, { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_IN_GENRE, BOOK_ADDED } from './queries'


const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}





const App = () => {
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  //const booksInGenreResult = useQuery(ALL_BOOKS_IN_GENRE)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      //`${addedPerson.name} added`
      window.alert(`New book ${subscriptionData.data.bookAdded.title} added!`);
    }
  })

  

  /* if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  } */

  if (authorsResult.loading)  {
    return <div>loading...</div>
  }

  if (booksResult.loading)  {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
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
  
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setGenre={setGenre}
          setError={notify}
          setPage={setPage}
        />
  
      </div>
    )

  } 
  

  if (token) {
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>log out</button>
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
        userGenre={genre}
      />

      <RecommendedBooks 
        show={page === 'recommend'}
        token={token}
        authors={authorsResult.data.allAuthors}
        genre={genre}
      />

    </div>
  )
  }
}

export default App