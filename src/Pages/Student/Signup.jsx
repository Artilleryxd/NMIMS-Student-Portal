import React from 'react'
import { useState } from 'react'
import { UserAuth } from '../../Context/AuthContext'
import toast from 'react-hot-toast'
import { Link , useNavigate } from 'react-router-dom';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import {Input } from '../../Components/ui/input'
import {Label } from '../../Components/ui/label'
import  {  Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle} from '../../Components/ui/card'
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
      } from '../../Components/ui/select'
      import { Button } from '../../Components/ui/button'
        import { ModeToggle } from '../../Components/ui/mode-toggle'
import Nav from '../../Components/Nav';
import bgvideo from '../../../public/videos/background.mp4'

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
    <Nav />
    </div>
    

    <div className='h-lvh flex items-center justify-center'>

       <Card className="w-[350px] z-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
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
          <Button className=" my-4">Login</Button>

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