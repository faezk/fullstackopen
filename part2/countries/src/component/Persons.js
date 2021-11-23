import React from 'react';

const Persons = ({persons,filterTerm,filterResults}) =>{ 
    return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {filterTerm ? filterResults.map(person =><li key={person.id}>{"" + person.name +" " + person.number} </li>)
                    : persons.map(person =><li key={person.id}>{"" + person.name +" " + person.number} </li>)}
      </ul>
    </div>
    )}
    
    export default Persons