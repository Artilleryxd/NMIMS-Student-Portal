import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../Context/AuthContext'
import { useState } from 'react'
import toast from 'react-hot-toast'
const Signin = () => {
    const {signIn} = UserAuth();
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')
    const navigate = useNavigate()
    const handelsubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signIn(email, password);
            toast.success("Logged in Sucessfully");
            navigate('/account');
        }
        catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }

  return (
    <>
    
    </>
  )
}

export default Signin