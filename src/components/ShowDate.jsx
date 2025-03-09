import React from 'react'

const ShowDate = ( {date}) => {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',  
        year: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true  // This will give the 12-hour format with "am/pm"
    }) 

  return (<>
    <p>{formattedDate}</p>
    <p>{formattedTime}</p>
    </>
  )
}

export default ShowDate