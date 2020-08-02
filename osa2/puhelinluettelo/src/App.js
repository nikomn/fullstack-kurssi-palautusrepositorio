import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [showAll, setShowAll] = useState(true)

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


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
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
    if (!newFilter === "") {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter names: 
            <input 
            value={newFilter} 
            onChange={handleFilterChange}
          />
        </div>

      <h2>Add new</h2>
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
        {personsToShow.map((person, i) =>
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