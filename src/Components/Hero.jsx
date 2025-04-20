import React from 'react'

const Hero = () => {
  return (
    <div className='h-auto w-full'>
      <div className='flex justify-between'>
        <div className='w-[65%] flex flex-col gap-5 md:gap-10'>
          <p className='font-semibold text-[30px] md:text-[35px]'>Streamlining Your Academic Documentation, Anytime, Anywhere</p>
          <p className='text-lg'><em>"Quickly request essential documents with just a few clicks."</em></p>
        </div>
        <div className='h-auto w-40 md:w-56 flex justify-center items-center'>
          <img
            className='w-full md:w-[100%] lg:w-[150%] h-auto'
            src="./images/document.gif"
            alt="image"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
