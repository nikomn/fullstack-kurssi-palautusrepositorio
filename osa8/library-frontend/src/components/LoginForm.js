import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN, FAVOURITE } from '../queries'

const LoginForm = ({ setError, setToken, setGenre, setPage, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  console.log("genre")

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const favouriteGenre = useQuery(FAVOURITE)

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      const genre = favouriteGenre.data.me.favoriteGenre
      
      setGenre(genre)
      localStorage.setItem('booklist-user-token', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm