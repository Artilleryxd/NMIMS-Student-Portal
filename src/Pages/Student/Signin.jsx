import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";
import { setDoc, getFirestore, doc } from "firebase/firestore";
import toast from "react-hot-toast";

import { Input } from '../../Components/ui/input';
import { Label } from '../../Components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { ModeToggle } from "../../Components/ui/mode-toggle";
import { School } from "lucide-react";

const Signin = () => {
  const { signIn, user } = UserAuth();
  const [placeholder, setPlaceholder] = useState({
    email: "",
    password: ""
  });
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
      // TODO: Redirect faculty to faculty page and student to student page
      navigate("/account");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
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

      <div className='flex items-center justify-center min-h-screen'>
        <Card className="w-[350px] z-20">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Welcome to NMIMS University </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" >Email Address</Label>
                  <Input id="email" placeholder={placeholder.email} onBlur={() => setPlaceholder({ email: "", password: "" })} onClick={() => setPlaceholder({ email: "user@nmims.in", password: "" })} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Password">Password</Label>
                  <Input type="password" id="password" placeholder={placeholder.password} onBlur={() => setPlaceholder({ email: "", password: "" })} onClick={() => setPlaceholder({ password: "••••••••" })} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-between space-x-4 ">
                <Button variant="ghost" class=" text-xs ml-2 " onSubmit={() => { }}>Forgot Password ? </Button>
                <Button className="mt-4">Login</Button>
              </div>
              <p className='text-xs justify-center mt-8'>Don't Have an account yet? <span className=' text-blue-600'><a href="/signup">Sign Up </a></span></p>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signin;
