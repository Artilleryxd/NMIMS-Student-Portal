import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getFirestore, collection , addDoc} from "firebase/firestore";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

import { Button } from "../../Components/ui/button";
import ModeToggle from "../../Components/ui/mode-toggle";
import { School } from "lucide-react";
const Signup = () => {
    const { SignIn } = UserAuth();
    const[placeholder, setPlaceholder] = useState({
      email : "",
      password : ""
    });
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')
    const [course , setCourse] = useState('')
    const navigate = useNavigate()
    const { createUser } = UserAuth();
//onSubmit={handelsubmit} use this in form functions
// onChange={(e) =>setEmail(e.target.value)} use this in input functions 
    const db  = getFirestore();
    const linkUidToFirestore = async (uid, email, course) => {
      const val = doc(db, 'Users', uid);
      await setDoc(val, { uid, email, type:'student' ,course:course }, { merge: true });
      const attendanceCollection = collection(val, 'attendance');
      await setDoc(doc(attendanceCollection, 'day1'), {
        present: true,
      });
    };
    
    
    
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await createUser(email, password);
      if (response.user) {
        await linkUidToFirestore(response.user.uid, email ,course);
        navigate("/account");
      }
      toast.success("Account Created Sucesfully");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
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

      <div className="h-lvh flex items-center justify-center">
        <Card className="w-[350px] z-20">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Welcome to NMIMS University </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email Adress</Label>
                  <Input
                    id="email"
                    placeholder={placeholder.email}
                    onBlur={() => setPlaceholder({ email: "", password: "" })}
                    onClick={() =>
                      setPlaceholder({ email: "user@nmims.in", password: "" })
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder={placeholder.password}
                    onBlur={() => setPlaceholder({ email: "", password: "" })}
                    onClick={() => setPlaceholder({ password: "••••••••" })}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="course">Course</Label>
              <Input type="course" id="password"  placeholder="uppercase"  onChange={(e) =>setCourse(e.target.value)}/>

            </div>
              </div>
              <div className="flex justify-between space-x-4 ">
                {/* //TODO : Add Forgot Password Functionality */}
                <Button
                  variant="ghost"
                  class=" text-xs ml-2 "
                  onSubmit={() => {}}
                >
                  Forgot Password ?{" "}
                </Button>

                <Button className="mt-4">Sign Up</Button>
              </div>

              <p className="text-xs justify-center mt-8">
                Already have an account?
                <span className=" text-blue-600">
                  <a href="/"> Sign In</a>
                </span>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;
