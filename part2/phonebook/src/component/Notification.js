import React from 'react';

const Notification = ({ message, messageType}) => {
  //console.log(message)  
  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default Notification