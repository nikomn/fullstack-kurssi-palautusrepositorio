import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      name: newName,
      number : newNumber
    }
    
    const names = persons.map(person => person.name)
    // console.log(names.includes(newName))

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      })
      
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
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

        <Filter value={newFilter} handleFilterChange={handleFilterChange}/>
        

      <h2>Add new</h2>

      <AddPerson addPerson={addPerson} newName={newName} 
                  handleNameChange={handleNameChange} newNumber={newNumber} 
                  handleNumberChange={handleNumberChange} />

      
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person, i) =>
          <Person key={i} person={person} />
        )}
      </ul>
      
    </div>
  )

}

export default App