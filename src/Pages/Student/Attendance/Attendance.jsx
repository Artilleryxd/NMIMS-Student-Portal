import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { UserAuth } from "@/Context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import Nav from "../../../Components/Nav";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Attendance = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const { user } = UserAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchAttendance = async () => {
      const attendanceRef = collection(db, `Users/${user.uid}/attendance`);
      const attendanceSnapshot = await getDocs(attendanceRef);
      const attendanceData = attendanceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendanceData(attendanceData);
    };

    fetchAttendance();
  }, [db, user.uid]);

  // Sample data for the BarChart (Replace with your actual attendance summary data)

  const attendanceSummaryData = [
    {
      subject: "COA",
      count: attendanceData.filter((entry) => {
        return entry.subject == "COA";
      }).length,
    },
    {
      subject: "MPMC",
      count: attendanceData.filter((entry) => {
        return entry.subject == "MPMC";
      }).length,
    },
    {
      subject: "DBMS",
      count: attendanceData.filter((entry) => {
        return entry.subject == "DBMS";
      }).length,
    },
  ];

  return (
    <>
      <Nav />
      <div className="px-4 md:px-12 py-5 w-full flex flex-col gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={attendanceSummaryData} // Use your actual attendance summary data here
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tick={{ fill: "hsl(var(--foreground))" }}
                />
                <YAxis
                  dataKey="subject"
                  type="category"
                  tick={{ fill: "hsl(var(--foreground))" }}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background)) ",
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="count" fill="#65b88f" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {attendanceData.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-200 pb-2"
              >
                <div>
                  <p className="text-lg font-semibold">
                    Date: {entry.attendance}
                  </p>
                  <p className="text-sm text-gray-500">
                    Present: {entry.present ? "Yes" : "No"}
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 h-3 w-3 rounded-full ${entry.present ? "bg-green-500" : "bg-red-500"}`}
                ></div>
              </div>
            ))}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Attendance;
