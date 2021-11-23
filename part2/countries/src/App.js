
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Nation from './component/nation'
import Filter from './component/Filter'


const App = () => {
  const [countries, setcountry] = useState([])
  const [ filterTerm, setFilterterm ] = useState('')
  const [filterResults, setFilterresults] = useState([]);
  const [ weather, setWeather ] = useState('')
  const [capital,setCapital]= useState('Tehran');
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
       axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setcountry(response.data)
      })
    }, [])


  useEffect(() => {
    const results = countries.filter(country =>
      country.name.toLowerCase().includes(filterTerm)
    );  
    setFilterresults(results);
  }, [countries,filterTerm]);


  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
          setWeather(response.data)
         // console.log(weather)
      })
    }, [api_key,capital])

    const handleCountryChange = (capital) => {
      setCapital(capital)
    //  console.log(capital);
    
    }

    const handleChange = (event) => {
     setFilterterm(event.target.value);
   }


  return (
    <div>
    
      <Filter value={filterTerm} 
              onchange={handleChange}/> 

      <Nation  result={filterResults} 
                weather={weather}
                handleCountryChange={handleCountryChange}/>     
    </div>

  )
}

export default App

