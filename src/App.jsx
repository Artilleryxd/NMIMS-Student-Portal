import React from "react";
import { Routes } from "react-router-dom";
import Signin from "./Pages/Student/Signin";
import { Route } from "react-router-dom";
import Signup from "./Pages/Student/Signup";
import Account from "./Pages/Student/Account";
import Assignments from "./Pages/Student/Assigments";
import { AuthContextProvider } from "./Context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Faculty/Home";
import ProtectedRoutesByType from "./Components/ProtectedRoutesByType";
import { ThemeProvider } from "../src/Components/theme-provider";
import Attendance from "./Pages/Student/Attendance/Attendance";
import Courses from "./Pages/Student/Courses/Courses";
import Elibrary from "./Pages/Student/Elibrary/Elibrary";
import Profile from "./Pages/Student/Profile";
// faculty imports
import Facelib from "./Pages/Faculty/Facelib";
import Facassign from "./Pages/Faculty/FacAssign";
import Facattendance from "./Pages/Faculty/FacAttendance";
import Faccontact from "./Pages/Faculty/FacContact";
import FacProfile from "./Pages/Faculty/FacProfile";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />

            <Route path="/attendance" element={<Attendance />} />

            <Route path="/courses" element={<Courses />} />

            <Route path="/elibrary" element={<Elibrary />} />

            <Route path="/assignments" element={<Assignments />} />

            <Route path="/profile" element={<Profile />} />

            {/* faculty routes */}
            <Route
              path="/fac/home"
              element={
                <ProtectedRoutesByType>
                  <Home />
                </ProtectedRoutesByType>
              }
            />
            <Route
              path="/fac/e-library"
              element={
                <ProtectedRoutesByType>
                  <Facelib />
                </ProtectedRoutesByType>
              }
            />
            <Route
              path="/fac/attendance"
              element={
                <ProtectedRoutesByType>
                  <Facattendance />
                </ProtectedRoutesByType>
              }
            />
            <Route
              path="/fac/assignments"
              element={
                <ProtectedRoutesByType>
                  <Facassign />
                </ProtectedRoutesByType>
              }
            />
            <Route
              path="/fac/profile"
              element={
                <ProtectedRoutesByType>
                  <FacProfile />
                </ProtectedRoutesByType>
              }
            />
            <Route
              path="/fac/contact-us"
              element={
                <ProtectedRoutesByType>
                  <Faccontact />
                </ProtectedRoutesByType>
              }
            />
          </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
