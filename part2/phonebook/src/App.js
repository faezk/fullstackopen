
import React, { useState } from 'react'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , id:1}
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNoteChange=(event)=>{
      setNewName(event.target.value)
  }

  const addName = (event) => {
        event.preventDefault()
        
        if (persons.some((person) => person.name === newName)) {
          alert(newName + " is already added to phonebook");
        
        } 
        else 
        {
        const nameObject = {
          name: newName,
          id: persons.length + 1,
        }
 
        setPersons(persons.concat(nameObject))
        }
        setNewName('')
       }
  return (
    <div>
      <h2>Phonebook</h2> 
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =><li key={person.id}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App

