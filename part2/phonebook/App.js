
import React, { useEffect, useState } from 'react';
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewnumber ] = useState('')
  const [ filterTerm, setFilterterm ] = useState('')
  const [filterResults, setFilterresults] = useState(persons);
  
  useEffect(() => {
    axios
      .get('http://localhost:3002/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  // console.log('render', persons.length, 'persons')


  const handleNameChange=(event)=>{
      setNewName(event.target.value)   
  }

  const handleNumberChange=(event)=>{
    setNewnumber(event.target.value)
  }

  const handleChange = (event) => {
    setFilterterm(event.target.value);

    const results = persons.filter(person =>
      person.name.toLowerCase().includes(filterTerm)
    );
    return setFilterresults(results);
  }
  
  
  const addPerson = (event) => {
        event.preventDefault()
        
        if (persons.some((person) => person.name === newName)) {
          alert(newName + " is already added to phonebook");
        
        } 
        else 
        {
        const nameObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }
        axios
         .post("http://localhost:3002/persons", nameObject)
         .then(response => {
          setPersons(persons.concat(response.data))
        })
        }
        setNewName('')
        setNewnumber('')
       }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterTerm} onchange={handleChange}/> 
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newNameperson={newName} handleName={handleNameChange} newNumberperson={newNumber} handleNumber={handleNumberChange} />      
      <h3>Numbers</h3>
      <Persons persons={persons} filterTerm={filterTerm} filterResults={filterResults} />
    </div>
  )
}

export default App

