import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "@/Context/AuthContext";
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
import ModeToggle from "./ui/mode-toggle";

const Nav = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const navAssignments = () => {
    navigate("/assignments");
  };

  const navAccount = () => {
    navigate("/account");
  };

  return (
    <>
      <nav className="flex flex-row justify-between items-center w-full h-16 px-12 border-b">
        <div className="flex flex-row">
          <Button variant="link" onClick={navAccount}>
            Dashboard
          </Button>
          <Button variant="link" onClick={navAssignments}>
            Assignments
          </Button>
          <Button variant="link">Attendance</Button>
        </div>
        <div className="flex flex-row gap-5">
          <ModeToggle></ModeToggle>
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
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Nav;
