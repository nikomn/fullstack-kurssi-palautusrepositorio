import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_BOOKS, ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'


const BirthYearForm = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ editAuthor ] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [  {query: ALL_BOOKS}, {query: ALL_AUTHORS} ],
      })

    const submit = async (event) => {
        event.preventDefault()
        
        console.log('update author...')
        const bornInt = parseInt(born)
        editAuthor({
          variables: { name, bornInt }
        })
    
        setName('')
        setBorn('')
      }

  return (
    <div>
        <h3>Set Birth Year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
  
}

export default BirthYearForm