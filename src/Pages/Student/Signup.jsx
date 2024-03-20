import React, { useState, useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getFirestore, collection } from "firebase/firestore";
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
import { useTheme } from "../../Components/theme-provider"; // Import useTheme hook

const Signup = () => {
  const { createUser } = UserAuth();
  const [placeholder, setPlaceholder] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [course, setCourse] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();
  const { theme } = useTheme(); // Access the current theme

  const courses = ["BTECH", "MBATECH", "BTI", "MCA"];

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
    const assignmentCollection = collection(val, "assignment");
    await setDoc(doc(assignmentCollection, "assign1"), {
      present: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await createUser(email, password);
      if (response.user) {
        await linkUidToFirestore(response.user.uid, email, course);
        navigate("/account");
      }
      toast.success("Account Created Successfully");
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

      <div className="h-screen flex items-center justify-center">
        <Card className="w-[350px] z-20 opacity-80">
          <CardHeader>
            <CardTitle className={`${theme === "dark" ? "text-white" : ""}`}>
              Sign Up
            </CardTitle>
            <CardDescription
              className={`${theme === "dark" ? "text-white" : ""}`}
            >
              Welcome to NMIMS University{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="email"
                    className={`${theme === "dark" ? "text-white" : ""}`}
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    placeholder={placeholder.email}
                    onBlur={() => setPlaceholder({ email: "", password: "" })}
                    onClick={() =>
                      setPlaceholder({
                        email: "user@nmims.in",
                        password: "",
                      })
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    className={`rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring bg-transparent focus:ring-indigo-200 focus:ring-opacity-50 bg-opacity-50 text-black ${theme === "dark" ? "text-white" : ""}`}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="Password"
                    className={`${theme === "dark" ? "text-white" : ""}`}
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder={placeholder.password}
                    onBlur={() => setPlaceholder({ email: "", password: "" })}
                    onClick={() => setPlaceholder({ password: "••••••••" })}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring bg-transparent focus:ring-indigo-200 focus:ring-opacity-50 bg-opacity-50 text-black ${theme === "dark" ? "text-white" : ""}`}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="course"
                    className={`${theme === "dark" ? "text-white" : ""}`}
                  >
                    Course
                  </Label>
                  <select
                    id="course"
                    onChange={(e) => setCourse(e.target.value)}
                    value={course}
                    className={`rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring bg-transparent focus:ring-indigo-200 focus:ring-opacity-50 bg-opacity-50 text-black ${theme === "dark" ? "text-white" : ""}`}
                    style={{ height: "2.5rem" }}
                  >
                    <option value="">Select Course</option>
                    {courses.map((course, index) => (
                      <option
                        key={index}
                        value={course}
                        className={`${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
                      >
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between space-x-4 mt-4">
                  <Button
                    variant="ghost"
                    className="text-xs ml-2"
                    onSubmit={() => {}}
                  >
                    Forgot Password?
                  </Button>
                  <Button>Sign Up</Button>
                </div>
              </div>
              <p className="text-xs justify-center mt-8">
                Already have an account?{" "}
                <span className="text-blue-600">
                  <a href="/">Sign In</a>
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
