import React from "react";
import { ModeToggle } from "./ui/mode-toggle";
import { School } from "lucide-react";
const Nav = () => {
  return (
    <>
      <div class="flex justify-between items-center space-x-4 m-4">
        <div class="flex-shrink-0 border rounded-sm p-2">
          <a href="/">
          <School />
          </a>
        </div>
        <ModeToggle />
      </div>
    </>
  );
};

export default Nav;
