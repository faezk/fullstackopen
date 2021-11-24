import React from 'react';

const nation=({result , weather , handleCountryChange})=>{
  
// console.log(result)
  const handleClick= (data) =>{
     alert(data)
 }
   if(result.length === 0){
     return <p>There is no counrty</p>
    }

   else{
        if (result.length > 10){
        return <p>Too many matches, specify another filter</p>
        }

        else if(result.length <=10 && result.length > 1){
          return(
          <ul> 
            {result.map(country =><li key={country.name}>{country.name} <button onClick ={() => handleClick( country.capital)} >Show</button> </li>)}
           
          </ul>
          )}

        else if (result.length === 1){
          //console.log(result);
          handleCountryChange(result[0].capital)
          return (
            <div>
              <h1>{result[0].name}</h1>
              <p>Capital: {result[0].capital}</p>
              <p>Population: {result[0].population}</p>
              <h2>Languages</h2>
                <ul>
                  {result[0].languages.map(language => <li key = {language.name}>{language.name}</li>)}
                </ul>
              
              <img src = {result[0].flag} width = "140px" height = "100px" alt = "flag"  />

              <div>
                <h2>Weather in {result.capital}</h2>
                <p><b>temperature: </b> {weather['current'].temperature} Celcius</p>
                <img src={weather['current'].weather_icons[0]} alt='weather' />
                <p><b>wind: </b> {weather['current'].wind_speed} kph direction {weather['current'].wind_dir}</p>
              </div>
            </div>
          )
          }		
  
      }
    }

    export default nation;