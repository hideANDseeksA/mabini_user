import React from 'react'
import { ChevronLeft } from '@mui/icons-material'
import CustomButton from '../Components/CustomButton'
import Instruction from '../Components/Instruction'
import { NotificationsActiveOutlined, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'


import AllHistory from '../Components/AllHistory'



const History = () => {

 

  return (
    <>
      <div className='w-full py-5'>
        <div className="flex space-x-2 py-5 justify-start">
          <CustomButton to="/dashboard" icon={ChevronLeft}>
            Back
          </CustomButton>
        </div>
        <div className="w-full gap-5 flex flex-col md:flex-row">

          <div className="md:w-[73%] w-full shadow-lg border-gray-200 border rounded-lg hover:border-gray-700 hover:border">
            <p className='font-semibold text-3xl p-5'>REQUEST HISTORY</p>
            <div className="flex justify-center px-5">
              <hr className="w-full border-t-2 border-black" />
            </div>
            <p className='p-5 font-semibold'>You can set pick-up scheduled and view all the document request transactions you made on this section</p>
          <div className='p-5 space-y-5'>

            <AllHistory/>

           
          </div>
          </div>


          {/* Instruction section */}
          <div className='md:w-[27%] w-full hidden md:flex  shadow-lg border-gray-200 border rounded-lg px-5 py-3  flex-col relative'>
            <div className='flex justify-end w-full'>
              <NotificationsActiveOutlined fontSize="large" />
            </div>

            <div className="relative inline-block w-full px-5 py-3 rounded-lg bg-blue-200 mt-5">
              {/* Background shadow layer */}
              <div className="absolute top-1 left-1 w-full h-full bg-blue-300 rounded-lg -z-10"></div>

              {/* Main content */}
              <p className="text-blue-600 font-semibold text-sm md:text-base text-center">
                <span className="text-3xl md:text-5xl font-bold">4</span> EASY STEPS TO <br /> CREATE A REQUEST
              </p>
            </div>

            <Instruction
              steps="Step #1"
              content='Click the "Request Now" button'
              picture="/images/step1.svg"
            />
            <Instruction
              steps="Step #2"
              content='Fill out the request form'
              picture="/images/step2.svg"
            />
            <Instruction
              steps="Step #3"
              content='Choose your preferred payment method'
              picture="/images/step3.svg"
            />
            <Instruction
              steps="Step #4"
              content='Set appointment date and wait for the registrar’s confirmation through email.'
              picture="/images/step4.svg"
            />
          </div>


        </div>

      </div>
    </>

  )
}

export default History
