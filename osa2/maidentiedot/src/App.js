import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = (props) => {

    const [countries, setCountries] = useState([])
    const [countriesFound, setCountriesFound] = useState([])
    const [newFilter, setNewFilter ] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [foundOne, setFoundOne] = useState(false)
    const [foundMany, setFoundMany] = useState(false)
    const [foundTooMany, setfoundTooMany] = useState(true)

    const Language = (props) => {
        return (
            <li>{props.language}</li>
        )
    }

    const OneCountry = (props) => {
        return (
            <div>One found
                <h2>{countriesToShow[0].name}</h2>

                <div>capital {countriesToShow[0].capital}</div>
                <div>population {countriesToShow[0].population}</div>

                <h3>Languages</h3>

                <ul>
                {countriesToShow[0].languages.map((language, i) =>
                <Language key={i} language={language.name} />
                )}
                </ul>

                <img src={countriesToShow[0].flag} width="200" />


            </div>
        )
    }

    const ManyCountries = (props) => {
        console.log(countriesToShow)
        return (
            <div>Many Found

            {countriesToShow.map((country, i) =>
            <Country key={i} country={country} />
        )}


            </div>
        )
    }

    const Countries = (props) => {
        console.log(props)
        console.log(foundTooMany)
        console.log(countriesToShow)


        if (countriesToShow.length > 1 && countriesToShow.length < 11) {
            return (
                <div>
                    <ManyCountries countriesToShow={countriesToShow}/>
                </div>
            )

        }

        if (countriesToShow.length === 1) {
            return (
                <div>
                    <OneCountry />
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

      const handleSearchFilterChange = (event) => {
        //console.log(event.target.value)
        setNewFilter(event.target.value)
        if (!newFilter === "") {
            setfoundTooMany(true)
        } else {
            if (countriesToShow.length > 10) {
                setfoundTooMany(true)
            } else if (countriesToShow.length === 1) {
                setfoundTooMany(false)
                setFoundOne(true)
            } else {
                setfoundTooMany(false)
                setFoundMany(true)

            }
        }
      }

      const hook = () => {
        console.log('effect')
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
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


        {/* {countriesToShow.map((country, i) =>
          <Country key={i} country={country} />
        )} */}

     

    </div>
  )
}

export default App