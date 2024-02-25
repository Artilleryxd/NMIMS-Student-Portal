import React, { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useTheme } from "../Components/theme-provider";

const Nav = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { theme } = useTheme(); // Get the current theme

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <nav className="">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <a
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <span
                  className={`text-2xl font-semibold whitespace-nowrap ${theme === "dark" ? "text-rose-700 dark:text-rose-700" : "text-gray-700"}`}
                >
                  NMIMS Portal
                </span>
              </a>
            </div>
            <div
              className="hidden md:flex md:w-auto md:items-center md:space-x-8 rtl:space-x-reverse"
              id="navbar-user"
            >
              <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                <li>
                  <a
                    href="/account"
                    className={`py-2 px-3 border-b-2 border-transparent ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/attendance"
                    className={`py-2 px-3 border-b-2 border-transparent ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                  >
                    Attendance
                  </a>
                </li>
                <li>
                  <a
                    href="/courses"
                    className={`py-2 px-3 border-b-2 border-transparent ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="/Elibrary"
                    className={`py-2 px-3 border-b-2 border-transparent ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                  >
                    E Library
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className={`py-2 px-3 border-b-2 border-transparent cursor-pointer ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                onClick={toggleUserDropdown}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`z-50 ${isUserDropdownOpen ? "block" : "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow ${theme === "dark" ? "dark:bg-rose-700 dark:divide-rose-600" : ""}`}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm">Welcome</span>
          <span className="block text-sm">{user && user.email}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" className="block px-4 py-2 text-sm">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm">
              Attendance
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm">
              E Library
            </a>
          </li>
          <li>
            <a onClick={handleLogout} className="block px-4 py-2 text-sm">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
