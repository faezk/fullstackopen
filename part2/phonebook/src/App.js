
import React, { useEffect, useState } from 'react';
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'
import personsService from './services/persons'
import personService from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewnumber ] = useState('')
  const [ filterTerm, setFilterterm ] = useState('')
  const [ showAll, setShowAll ] = useState(false)
  const [message, setMessage] = useState(null)
  let personExist=null

  useEffect(() => {
    personsService
    .getAll()
    .then(initialNotes => {
      setPersons(initialNotes)
    })
  }, [])



  const handleNameChange=(event)=>{
      setNewName(event.target.value)   
  }

  const handleNumberChange=(event)=>{
    setNewnumber(event.target.value)
  }

  const handleChange = (event) => {
    setFilterterm(event.target.value);
    setShowAll(true)  

  }

		
 const handleDelete = (id) => {
  const filteredPerson = persons.filter(person => person.id === id)
  const personName = filteredPerson[0].name
  const personId = filteredPerson[0].id
  if (window.confirm(`Do you really want to delete ${personName} ?`)) {
    personService
      .remove(personId)
      .catch(error => {
        setMessage('fail')
        console.log('fail')
      })
    // console.log(`${personName} successfully deleted`)
    setMessage(`${personName} was successfully deleted`)
 
    setTimeout(() => {
      personsService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
    }, 1000)
  }
}

  function Search(filterTerm) {
    const results = persons.filter(person => person.name.toLowerCase().split(" ").join("").indexOf(filterTerm.toLowerCase()) !== -1);
    return results;
  }


  const displayToShow = showAll
	? Search(filterTerm)
	: persons

  const changeNumber= id =>{ 
     const person = persons.find(n => n.id ===id)
    const changePerson = { ...person,number: newNumber }
    // console.log(changePerson)
    personService
    .update(id, changePerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    })
   }
  
  const addPerson = (event) => {
        event.preventDefault()
        
        const personFilter = persons.filter((person) => person.name === newName)
        personExist=personFilter[0]
  
      if(personExist !== null){      
        if (window.confirm(`${personExist.name}  is already added to phonebook, replace the old number with a new one ?`)) {
          changeNumber(personExist.id)
        }
      } 
       
        else 
        {
        const nameObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }
        personsService
        .create(nameObject)
        .then(returnedPerson => {
          console.log(returnedPerson);
          setPersons(persons.concat(returnedPerson))
        })
        }
        setNewName('')
        setNewnumber('')
       }

  return (
    <div>
           {/* <Notification message={message} /> */}
      <h2>Phonebook</h2>
      <Filter value={filterTerm} onchange={handleChange}/> 
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newNameperson={newName} handleName={handleNameChange} newNumberperson={newNumber} handleNumber={handleNumberChange} />      
      <h3>Numbers</h3>
       <ul>
          {displayToShow.map((person) =>        
            <Persons  persons={person} handleDelete={handleDelete} key={person.id}/>
          )}
        </ul>
    </div>
  )
}

export default App

