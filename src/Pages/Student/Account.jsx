import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "@/Context/AuthContext";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Nav from "@/Components/Nav";
import Footer from "@/Components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { Button } from "@/Components/ui/button";

const Account = () => {
  const navigate = useNavigate();

  const navAssignments = () => {
    navigate("/assignments");
  };

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
  ];

  const data = [
    {
      name: "Submitted",
      assignments: 10,
    },
    {
      name: "Submitted Late",
      assignments: 1,
    },
    {
      name: "Pending",
      assignments: 5,
    },
    {
      name: "Past Due",
      assignments: 2,
    },
  ];

  const attendance = [
    {
      subName: "DBMS",
      attended: 12,
      notAttended: 5,
    },
    {
      subName: "OOPJ",
      attended: 12,
      notAttended: 2,
    },
    {
      subName: "CVT",
      attended: 20,
      notAttended: 5,
    },
    {
      subName: "COA",
      attended: 20,
      notAttended: 3,
    },
  ];

  return (
    <>
      <Nav></Nav>
      <div className="px-12 py-5 w-full">
        <p className="font-bold text-5xl mx-3 my-5">Welcome, {userName}</p>
        <div className="grid grid-rows-4 md:grid-rows-2 grid-cols-none md:grid-cols-3 gap-5 md:gap-7">
          <Card className="md:col-span-1 row-span-1">
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
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={navAssignments}>
                View All
              </Button>
            </CardFooter>
          </Card>
          <Card className="md:col-span-2 row-span-1">
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <ResponsiveContainer width="90%" height={230}>
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#ffffff" }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--background))" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                    isAnimationActive={false}
                  />
                  <Bar dataKey="assignments" fill="hsl(var(--primary))" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 row-span-1">
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
            </CardHeader>
            <ResponsiveContainer width="90%" height={230}>
              <BarChart
                data={attendance}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  type="number"
                  tick={{ fill: "hsl(var(--foreground))" }}
                />
                <YAxis
                  type="category"
                  dataKey="subName"
                  tick={{ fill: "hsl(var(--foreground))" }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background)) " }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar
                  dataKey="attended"
                  stackId="a"
                  fill="hsl(var(--primary))"
                />
                <Bar
                  dataKey="notAttended"
                  stackId="a"
                  fill="hsl(var(--muted))"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Your QR</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Account;