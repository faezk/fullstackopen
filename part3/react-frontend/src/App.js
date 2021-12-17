
import React, { useEffect, useState } from 'react';
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'
import personsService from './services/persons'
import Notification from './component/Notification';


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewnumber ] = useState('')
  const [ filterTerm, setFilterterm ] = useState('')
  const [ showAll, setShowAll ] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessagetype] = useState(null)

   let personExist=null  

  useEffect(() => {
    personsService
    .getAll()
    .then(initialpersons => {
      setPersons(initialpersons)
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
	
  function Search(filterTerm) {
    const results = persons.filter(person => person.name.toLowerCase().split(" ").join("").indexOf(filterTerm.toLowerCase()) !== -1);
    return results;
  }

  const displayToShow = showAll
	? Search(filterTerm)
	: persons

  const deletPerson = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Do you really want to delete ${personName} ?`)) {
      personsService
        .remove(personId)

        setMessagetype('success')
        setErrorMessage(
          `${personName} was successfully deleted`
        )
       

        setPersons(persons.filter(n => n.id !== id))
       setTimeout(() => {
        setErrorMessage(null)
        setMessagetype(null)
      }, 5000)
      
    }
  }
  
  const changeNumber= id =>{ 
     const person = persons.find(n => n.id ===id)
    const changePerson = { ...person,number: newNumber }
    // console.log(changePerson)
    personsService
    .update(id, changePerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      setMessagetype('success')
      setErrorMessage(`${person.name} was successfully updated`)
      
    })
    .catch((error) => {
      setMessagetype('error')
      setErrorMessage(
        ` Information of ${person.name} has already been removed from server`     
      )
      console.log(error.response.data)
      setTimeout(() => {
        setErrorMessage(null)
        setMessagetype(null)
      }, 5000)

     
   
    })

   }
  
  const addPerson = (event) => {
        event.preventDefault()
        
        const personFilter = persons.filter((person) => person.name === newName)
        personExist=personFilter[0]
        
       if(personFilter.length!==0){      
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
         // console.log(returnedPerson);
          setPersons(persons.concat(returnedPerson))
          setMessagetype('success')
          setErrorMessage(`${newName} was successfully added`)
          
        })
       .catch(error => {
        setErrorMessage(
            `[ERROR] ${error.response.data.error}`
          )
          setMessagetype('error')
      
          console.log(error.response.data)
        })
         }
        setNewName('')
        setNewnumber('')
       }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}  messageType={messageType}/>
      <Filter value={filterTerm} onchange={handleChange}/> 
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newNameperson={newName} handleName={handleNameChange} newNumberperson={newNumber} handleNumber={handleNumberChange} />      
      <h3>Numbers</h3>
       <ul>
          {displayToShow.map((person) =>        
            <Persons  persons={person} handleDelete={deletPerson} key={person.id}/>
          )}
        </ul>
    </div>
  )
}

export default App

