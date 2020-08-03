import React from 'react'
import Country from './Country'

const ManyCountries = ( {countriesToShow} ) => {
    //console.log(countriesToShow)
    return (
        <div>

        {countriesToShow.map((country, i) =>
        <Country key={i} country={country} />
    )}


        </div>
    )
}

export default ManyCountries