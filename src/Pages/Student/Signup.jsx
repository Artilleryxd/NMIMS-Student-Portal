import React from 'react'
import { useState } from 'react'
import { UserAuth } from '../../Context/AuthContext'
import toast from 'react-hot-toast'
import {   useNavigate } from 'react-router-dom';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import {Input } from '../../Components/ui/input'
import {Label } from '../../Components/ui/label'
import  {  Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle} from '../../Components/ui/card'

import { Button } from '../../Components/ui/button'
import { ModeToggle } from '../../Components/ui/mode-toggle'
import { School} from "lucide-react";
const Signup = () => {
    const { SignIn } = UserAuth();
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')
    const navigate = useNavigate()
    const { createUser } = UserAuth();
//onSubmit={handelsubmit} use this in form functions
// onChange={(e) =>setEmail(e.target.value)} use this in input functions 
    const db  = getFirestore();
    const linkUidToFirestore = async (uid, email) => {
        const userRef = doc(db, 'Users', uid);
        await setDoc(userRef, { uid, email, type:'student' }, { merge: true });
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
           const response =  await createUser(email, password);
            if (response.user){
                await linkUidToFirestore(response.user.uid, email);      
                navigate('/account');

            }
            toast.success("Account Created Sucesfully");

        }
        catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }

  return (
    < >
<div className="z-20">
    <div class="flex justify-between items-center space-x-4 m-4">
        <div class="flex-shrink-0 border rounded-sm p-2">
          <a href="/">
          <School />
          </a>
        </div>
        <ModeToggle />
      </div>   
       </div>
    

    <div className='h-lvh flex items-center justify-center'>

       <Card className="w-[350px] z-20">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Welcome to NMIMS University </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" >Email Adress</Label>
              <Input id="email" placeholder="user@nmims.in" onChange={(e) =>setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Password">Password</Label>
              <Input type="password" id="password"  placeholder="••••••••"  onChange={(e) =>setPassword(e.target.value)}/>

            </div>
          </div>
          <div className="flex justify-between space-x-4 ">
            {/* //TODO : Add Forgot Password Functionality */}
          <Button variant="ghost" class=" text-xs ml-2 " onSubmit={()=>{}}>Forgot Password ? </Button>

          <Button className="mt-4">Login</Button>
          </div>
          
          <p className='text-xs justify-center mt-8'>Have an account yet? <span className=' text-blue-600'><a href="/">Sign In</a></span></p>
        </form>
      </CardContent>
      
    </Card>
   <video
    autoPlay
    loop
    muted
    class="absolute z-10 w-auto min-w-full min-h-full max-w-none"
  >
    <source
      src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
      </div>
      </>
  )
}

export default Signup