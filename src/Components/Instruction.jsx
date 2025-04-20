import React from 'react'

const Instruction = ({steps, content, picture}) => {
  return (
    <div className="relative flex justify-between items-center w-full gap-4 px-5 py-3 rounded-lg shadow-lg bg-blue-200 mt-5 ">
      <div className='w-[70%]' >
        <p className='font-bold text-lg'>{steps}</p>

        <p className='text-base pl-3 '>{content}</p>
      </div>
      <div className='w-[30%] h-full flex items-center justify-center'>
        <img src={picture} alt="instruction" />
      </div>
    </div>
  )
}

export default Instruction
