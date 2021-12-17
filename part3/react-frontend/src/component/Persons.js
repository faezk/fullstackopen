import React from 'react';

const Persons = ({persons,handleDelete}) =>{ 
    return(
        
        <li className='personlist'> {"" + persons.name +" " + persons.number}
         <button  onClick = {() => handleDelete(persons.id)}>Delete</button> 
       </li>
    )}
    
    export default Persons