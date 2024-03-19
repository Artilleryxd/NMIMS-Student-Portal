import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";
import {
  setDoc,
  getFirestore,
  doc,
  collection,
  getDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
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

const Signin = () => {
  const { signIn, user } = UserAuth();
  const [placeholder, setPlaceholder] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [course, setCourse] = useState("");
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const db = getFirestore();

  const linkUidToFirestore = async (uid, email, course) => {
    const val = doc(db, "Users", uid);
    await setDoc(
      val,
      { uid, email, type: "student", course: course },
      { merge: true }
    );
    const attendanceCollection = collection(val, "attendance");
    await setDoc(doc(attendanceCollection, "day1"), {
      present: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      if (user) {
        const userType = await getUserType(user.uid);
        if (userType === "fac") {
          navigate("/fac/home");
        } else if (userType === "student") {
          await linkUidToFirestore(user.uid, email, course);
          toast.success("Logged in Successfully");
          navigate("/account");
        } else {
          throw new Error("Invalid user type.");
        }
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const getUserType = async (uid) => {
    try {
      const userDocRef = doc(db, "Users", uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return userData.type;
      } else {
        throw new Error("User document does not exist.");
      }
    } catch (error) {
      throw new Error("Error fetching user type: " + error.message);
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
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        className="min-w-full min-h-full fixed z-0 object-cover opacity-50"
      >
        <source src="videos/signup-bg-1.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <div className="z-20 absolute top-0 left-0 right-0">
        <div className="flex justify-between items-center space-x-4 m-4">
          <div className="flex-shrink-0 border rounded-sm p-2">
            <a href="/">
              <School />
            </a>
          </div>
          <ModeToggle />
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[350px] z-20 opacity-80">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Welcome to NMIMS University </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
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
                <div className="flex justify-between space-x-4 mt-4">
                  <Button
                    variant="ghost"
                    className="text-xs ml-2"
                    onSubmit={() => {}}
                  >
                    Forgot Password ?
                  </Button>
                  <Button>Login</Button>
                </div>
              </div>
              <p className="text-xs justify-center mt-8">
                Don't Have an account yet?{" "}
                <span className="text-blue-600">
                  <a href="/signup">Sign Up </a>
                </span>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signin;
