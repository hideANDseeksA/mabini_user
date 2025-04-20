import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserProfile from './Components/UserProfile'
import Dasboard from './Pages/Dasboard'
import Request from './Pages/Request'
import Hero from './Components/Hero'
import SignInPage from './Pages/auth/SignInPage'
import SignUpPage from './Pages/auth/SignUpPage'
import ResetPassword from './Pages/auth/ResetPassword'
import OtpVerification from './Pages/auth/OtpVerification'
import Reciept from './Pages/Reciept'
import History from './Pages/History'
import Header from './Components/Header'


const App = () => {
  return (
    <>
      <Router>
     
      
        <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/otp" element={<OtpVerification />} />
          <Route path="/dashboard" element={<> <Header/> <UserProfile /> <Hero/><Dasboard /></>} />
          <Route path="/request" element={<> <Header/> <UserProfile /><Hero/><Request /></>} />
          <Route path="/reciept" element={<> <Header/> <UserProfile /><Hero/><Reciept /></>} />
          <Route path="/history" element={<> <Header/> <UserProfile /><Hero/><History /></>} />
        </Routes>
      </Router>
    </>
  )
}

export default App