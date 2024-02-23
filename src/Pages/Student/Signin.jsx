import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLayoutEffect, useRef } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import {Input } from '../../Components/ui/input'
import {Label } from '../../Components/ui/label'
import{  Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle} from '../../Components/ui/card'

import { Button } from '../../Components/ui/button'
import Nav from '../../Components/Nav';


const Signin = () => {
  const { signIn, user } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const boxRef = useRef(null);
  const db = getFirestore();

  const linkUidToFirestore = async (uid) => {
    const userRef = doc(db, "Users", uid);
    await setDoc(userRef, { uid, email }, { merge: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      if (user) {
        await linkUidToFirestore(user.uid);
      }
      toast.success("Logged in Sucessfully");
      navigate("/account");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    < >
    <div className="z-20">
    <Nav />
    </div>
    

    <div className='h-lvh flex items-center justify-center'>

       <Card className="w-[350px] z-20">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
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
          
          <p className='text-xs justify-center mt-8'>Don't Have an account yet? <span className=' text-blue-600'><a href="/signup">Sign Up </a></span></p>
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
  );
};

export default Signin;
