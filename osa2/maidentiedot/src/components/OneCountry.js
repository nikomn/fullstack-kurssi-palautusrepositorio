import React from 'react'
import Language from './Language'

const OneCountry = ( {countriesToShow} ) => {
    const altTxt = "Flag of the country " + countriesToShow[0].name
    return (
        <div>
            <h2>{countriesToShow[0].name}</h2>

            <div>capital {countriesToShow[0].capital}</div>
            <div>population {countriesToShow[0].population}</div>

            <h3>Languages</h3>

            <ul>
            {countriesToShow[0].languages.map((language, i) =>
            <Language key={i} language={language.name} />
            )}
            </ul>

            <img 
                src={countriesToShow[0].flag} 
                width="200" 
                alt={altTxt}
                />


        </div>
    )
}

export default OneCountry