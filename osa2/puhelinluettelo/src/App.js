import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')


  const addName = (event) => {

    event.preventDefault()
    const nameObject = {
      name: newName
    }

    
    //console.log(persons)
    //console.log(nameObject.name)
    
    //persons.map(person => console.log(person.name))
    const names = persons.map(person => person.name)
    //console.log(names)
    console.log(names.includes(newName))

    if (names.includes(nameObject.name)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }


    
  
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
            <input 
            value={newName} 
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) =>
          <Person key={i} person={person} />
        )}
      </ul>
      {/* <ul>
        <li>
        {persons.map(person => 
          person.name
        )}
        </li>
      </ul> */}
      
    </div>
  )

}

export default App