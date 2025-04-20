import React from 'react'
import CustomButton from '../Components/CustomButton'
import '../index.css'
import Schedule from '../Components/Schedule'
import { History, ChevronRight, NotificationsActiveOutlined } from "@mui/icons-material"
import Instruction from '../Components/Instruction'

const Dashboard = () => {
  return (
    <>


      <div className='w-full h-auto py-5'>
        <div className='flex space-x-2 flex-grow py-5 justify-start'>
          <CustomButton to="/request" icon={ChevronRight}>Request Now</CustomButton>
          <CustomButton to="/history" icon={History}>Request History</CustomButton>
        </div>

        {/* CONTENT */}
        <div className='w-full gap-5 flex flex-col md:flex-row'>
          {/* Announcement section */}
       <div className='md:w-[50%] w-full shadow-lg rounded-lg hover:border-gray-700 hover:border'>
  <div className='subheader'>
    <p>Announcements</p>
  </div>
  <div className='flex justify-between px-5 items-center p-5'>
    <img
      className='w-10 sm:w-12 md:w-16 lg:w-20'
      src="/images/mcLogo.svg"
      alt="mclogo"
    />
    <p className='contentTitle'>
      Announcement from the School's Registrar
    </p>
    <img
      className='w-10 sm:w-12 md:w-16 lg:w-20'
      src="/images/centennialLogo.svg"
      alt="centennialLogo"
    />
  </div>
  <div className='px-5 pb-5 text-sm space-y-4'>
    <p>📣 <strong>Important Notice for All Students</strong></p>
    <p>We would like to inform all students that the document request process for Certificates of Enrollment (COE), Transcripts of Records (TOR), and other official records is now fully online!</p>
    
    <div className="space-y-2">
      <p><strong>Key Information:</strong></p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li><strong>New Requests:</strong> Log into the Online Documentation Portal to submit your requests.</li>
        <li><strong>Processing Times:</strong> Please allow 3-5 business days for document processing.</li>
        <li><strong>Pick-Up and Delivery Options:</strong> Select either in-person pickup or digital delivery when submitting your request.</li>
      </ul>
    </div>

    <div className="space-y-2">
      <p><strong>Upcoming Deadlines:</strong></p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li><strong>Graduating Students:</strong> Ensure all document requests are submitted by <em>[specific deadline date]</em> to avoid delays in graduation processing.</li>
      </ul>
    </div>

    <p>For assistance or inquiries, please contact the Registrar’s Office at <em>[Registrar's email/phone number]</em> or visit us during office hours.</p>
    <p>Thank you for your cooperation in keeping our academic documentation process smooth and efficient!</p>
  </div>
</div>


          {/* Transactions section */}
          <div className='md:w-[23%] w-full hidden md:block  shadow-lg border-gray-200 border rounded-lg'>
            <div className='subheader'>
              <p>Transaction Days</p>
            </div>
            <div className='flex flex-col gap-5'>
              <Schedule
                header="Morning Schedule"
                content="Monday - Friday"
                time="8:00 AM - 12:00 PM"
              />
              <Schedule
                header="Lunch Break"
                time="12:00 PM - 1:00 PM"
              />
              <Schedule
                header="Afternoon Schedule"
                content="Monday - Friday"
                time="1:00 PM - 5:00 PM"
              />
              <Schedule
                header="Weekends Schedule"
                content="Saturday"
                time="8:00 AM - 12:00 PM"
              />
            </div>
          </div>

          {/* Instruction section */}
          <div className='md:w-[27%] w-full hidden md:block shadow-lg border-gray-200 border rounded-lg px-5 py-3  flex-col items-center justify-end relative'>
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

export default Dashboard