import React from 'react'

const AddPerson = ({ addPerson, newName, handleNameChange
                    , newNumber, handleNumberChange}) => {

  return (
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
        {/* <div>debug: {newName}</div> */}
      </form>
  )
}

export default AddPerson