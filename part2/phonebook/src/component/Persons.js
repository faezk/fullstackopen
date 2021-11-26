import React from 'react';

const Persons = ({persons,handleDelete}) =>{ 
    return(
        
        <li> {"" + persons.name +" " + persons.number}
         <button  onClick = {() => handleDelete(persons.id)}>Delete</button> 
        {/* <button 
            type="button" 
            value={persons.id}
            key={persons.id}
            onClick={handleDelete}>
            delete
          </button> */}
          </li>
    )}
    
    export default Persons