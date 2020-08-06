import React from 'react'


const Country = ({ country, setNewFilter }) => {
  return (
    <div>{country.name} <button onClick={() => setNewFilter(country.name)}>show</button></div>
  )
}

export default Country