import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)

  
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

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
      const p = persons.find(p => p.name === newName)

      if (newNumber === p.number) {
        //alert(`${newName} is already added to phonebook`)
        setNotificationMessage(
          `${newName} is already added to phonebook`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      } else if (newNumber !== p.number) {
          const result = window.confirm(`${newName} is already in database with different number. Do you want to update number information?`)
          if (result) {
            personService
              .update(p.id, personObject)
              .then(returnedPerson => {
                console.log('Number updated')
                setNotificationMessage(
                  `Number for ${newName} updated`
                )
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000)
                setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
              })
            setNewName('')
            setNewNumber('')
          }

      }


      
      
    } else {
      personService
        .create(personObject)
          .then(returnedPerson => {
            setNotificationMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.concat(returnedPerson))
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

  const removePerson = (id, name) => {
    const result = window.confirm(`Do you really want to remove ${name} from database?`)
    if (result) {
      personService
        .remove(id)
          .then(() => {
            console.log(`${name} removed from database`)
            setNotificationMessage(
              `${name} removed from database`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))

          }
            
          )
    }
    
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="info">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />

        <Filter value={newFilter} handleFilterChange={handleFilterChange}/>
        

      <h2>Add new</h2>

      <AddPerson addPerson={addPerson} newName={newName} 
                  handleNameChange={handleNameChange} newNumber={newNumber} 
                  handleNumberChange={handleNumberChange} />

      
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person, i) =>
          <Person 
            key={i} 
            person={person} 
            removePerson={() => removePerson(person.id, person.name)}
            />
        )}
      </ul>
      
    </div>
  )

}

export default App