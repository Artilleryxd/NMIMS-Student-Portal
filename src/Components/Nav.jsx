import React, { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Components/theme-provider";
import ModeToggle from "./ui/mode-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import Profile from "../Pages/Student/Profile";

const Nav = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
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

  const navButtons = [
    {
      text: "Home",
      link: "/account",
    },
    {
      text: "Attendance",
      link: "/attendance",
    },
    {
      text: "Courses",
      link: "/courses",
    },
    {
      text: "Assignments",
      link: "/assignments",
    },
    {
      text: "E-Library",
      link: "/elibrary",
    },
  ];

  return (
    <nav className="flex flex-row justify-between items-center w-full h-16 px-12 border-b">
      <div className="text-2xl whitespace-nowrap">NMIMS Portal</div>
      <div className="flex flex-row">
        <div className="hidden md:block">
          {navButtons.map((element, index) => (
            <Button
              key={index}
              variant="link"
              onClick={() => navigate(element.link)}
            >
              {element.text}
            </Button>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/Profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Welcome</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navButtons.map((element, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => navigate(element.link)}
                  >
                    {element.text}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
