import React from "react";
import { Routes } from "react-router-dom";
import Signin from "./Pages/Student/Signin";
import { Route } from "react-router-dom";
import Signup from "./Pages/Student/Signup";
import Account from "./Pages/Student/Account";
import { AuthContextProvider } from "./Context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Faculty/Home";
import ProtectedRoutesByType from "./Components/ProtectedRoutesByType";
import { ThemeProvider } from "../src/Components/theme-provider";
import Attendance from "./Pages/Student/Attendance/Attendance";
import Courses from "./Pages/Student/Courses/Courses";
import Elibrary from "./Pages/Student/Elibrary/Elibrary";
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
            <Route
              path="/fac/home"
              element={
                <ProtectedRoutesByType>
                  <Home />
                </ProtectedRoutesByType>
              }
            />
            <Route path="/attendance" element={<Attendance />} />

            <Route path="/courses" element={<Courses />} />

            <Route path="/elibrary" element={<Elibrary />} />
          </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
