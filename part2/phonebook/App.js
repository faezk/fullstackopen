
import React, { useState } from 'react';
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewnumber ] = useState('')
  const [ filterTerm, setFilterterm ] = useState('')
  const [filterResults, setFilterresults] = useState(persons);
  
  // React.useEffect(() => {
  //   const results = persons.filter(person =>
  //     person.name.toLowerCase().includes(filterTerm)
  //   );
  //   setFilterresults(results);
  // }, [filterTerm]);
 

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
 
        setPersons(persons.concat(nameObject))
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

