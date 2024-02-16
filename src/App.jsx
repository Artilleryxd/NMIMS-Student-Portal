import React from "react"
import { Routes } from "react-router-dom"
import Signin from "./Components/Signin"
import { Route } from "react-router-dom"
import Signup from "./Components/Signup"
import Account from "./Components/Account"
function App() {

  return (
    <>
    <div className=" text-center text-3xl font-bold">
    Authentication Page
    </div>
    <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/account" element={<Account />} />


    </Routes>
    </>
  )
}

export default App
