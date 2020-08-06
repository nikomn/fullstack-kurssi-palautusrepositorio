import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OneCountry from './components/OneCountry'
import ManyCountries from './components/ManyCountries'

const App = (props) => {

    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter ] = useState('')
    const [showAll, setShowAll] = useState(true)



    const Countries = (props) => {

        if (countriesToShow.length > 1 && countriesToShow.length < 11) {
            return (
                <div>
                    <ManyCountries countriesToShow={countriesToShow} setNewFilter={setNewFilter}/>
                </div>
            )

        }

        if (countriesToShow.length === 1) {
            return (
                <div>
                    <OneCountry countriesToShow={countriesToShow}/>
                </div>
            )
        } else {
            return (
                <div>Too many matches found, specify another fiter</div>
            )
        }


        
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

      

      const hook = () => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            //console.log(response.data)
            setCountries(response.data)
          })
      }
    
      useEffect(hook, [])


    const countriesToShow = showAll
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    
  return (
    <div>
        
        <div>
          find countries: 
            <input 
            value={newFilter} 
            onChange={handleFilterChange}
          />
        </div>

        <Countries />

     

    </div>
  )
}

export default App