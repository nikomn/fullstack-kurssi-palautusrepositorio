import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '123-456789'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      name: newName,
      number : newNumber
    }

    
    //console.log(persons)
    //console.log(nameObject.name)
    
    //persons.map(person => console.log(person.name))
    const names = persons.map(person => person.name)
    //console.log(names)
    console.log(names.includes(newName))

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }


    
  
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
            <input 
            value={newName} 
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: 
            <input 
            value={newNumber} 
            onChange={handleNumberChange}
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