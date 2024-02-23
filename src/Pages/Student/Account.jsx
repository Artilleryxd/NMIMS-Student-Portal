import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "@/Context/AuthContext";
import Nav from "@/Components/Nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { cn } from "@/lib/utils"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";

import { Button } from "@/Components/ui/button"

const Account = () => {
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
  }

  //Test Content, to be replaced by Data from Firestore
  const userName = "Test User";
  const newAssignments = [
    {
      title: "OOPJ Lab 7",
      description: "Due on 29/02/24",
    },
    {
      title: "DBMS Lab 8",
      description: "Due on 1/03/24",
    },
    {
      title: "WP Assignment 2",
      description: "Due on 3/03/24",
    },
  ]

  return (
    <>
      <Nav></Nav>
      <div className="px-12 py-10">
        <p className="font-bold text-5xl mx-3 my-10">Welcome, {userName}</p>
        <div className="grid grid-cols-3 gap-10">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>New Assignments</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {newAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {assignment.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.description}
                    </p>
                  </div>
                </div>
              ) )}
            </div>
          </CardContent>
          <CardFooter>
          <Button className="w-full" onClick={navAssignments}>View All</Button>
          </CardFooter>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>New Assignments</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {newAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {assignment.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.description}
                    </p>
                  </div>
                </div>
              ) )}
            </div>
          </CardContent>
          <CardFooter>
          <Button className="w-full" onClick={navAssignments}>View All</Button>
          </CardFooter>
        </Card>
        </div>
      </div>
    </>
  );
};

export default Account;