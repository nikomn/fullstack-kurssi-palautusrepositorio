import React from 'react'



const Filter = ({ newFilter, handleFilterChange }) => {

  return (
    <div>
    filter names: 
      <input 
      value={newFilter} 
      onChange={handleFilterChange}
      />
  </div>
  )
}

export default Filter