import React from 'react'
import Country from './Country'


const ManyCountries = ( { countriesToShow, setNewFilter } ) => {
    //console.log(countriesToShow)
    return (
        <div>

        {countriesToShow.map((country, i) =>
        <Country 
            key={i} 
            country={country} 
            setNewFilter={setNewFilter}
            />
    )}


        </div>
    )
}

export default ManyCountries