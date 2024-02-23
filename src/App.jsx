import React from "react"
import { Routes } from "react-router-dom"
import Signin from "./Pages/Student/Signin"
import { Route } from "react-router-dom"
import Signup from "./Pages/Student/Signup"
import Account from "./Pages/Student/Account"
import Assignments from "./Pages/Student/Assigments"
import { AuthContextProvider } from "./Context/AuthContext"
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Components/ProtectedRoute'
function App() {

  return (
    <>
      
    <Toaster />
    <AuthContextProvider>
    <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
    <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />


    </Routes>
    </AuthContextProvider>
    </>
  )
}

export default App
