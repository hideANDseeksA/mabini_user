import React from 'react'
import "../index.css"

const Schedule = ({header, content, time} ) => {
  return (
    <div className='flex flex-col gap-3 py-5'> 
      <p className='contentTitle'>
        {header}
      </p>
      <p className='text-center'>{content}</p>
      <p className='contentTitle'>{time}</p>
    </div>
  )
}

export default Schedule
