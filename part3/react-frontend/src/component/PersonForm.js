
import React from 'react';

const PersonForm = ({onSubmit, newNameperson, handleName, newNumberperson, handleNumber}) =>

 <form onSubmit={onSubmit}>
        <div>
            name: <input type='text' value={newNameperson} onChange={handleName} />
        </div>
        <div>
            number: <input type='text' value={newNumberperson} onChange={handleNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

export default PersonForm