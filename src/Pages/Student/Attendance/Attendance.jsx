import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { UserAuth } from "@/Context/AuthContext";
import Nav from "../../../Components/Nav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Button } from "../../../Components/ui/button";
import CircularProgress from "@mui/material/CircularProgress";
import TopCard from "../../../Components/TopCard";
import UpcomingLectures from "../../../Components/UpcomingLectures";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../../Components/theme-provider";

const Attendance = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [progress, setProgress] = useState(0);
  const { user } = UserAuth();
  const db = getFirestore();
  const { theme } = useTheme(); // Accessing the current theme using useTheme hook

  useEffect(() => {
    const fetchAttendance = async () => {
      const attendanceRef = collection(db, `Users/${user.uid}/attendance`);
      const attendanceSnapshot = await getDocs(attendanceRef);
      const attendanceData = attendanceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendanceData(attendanceData);

      const totalAttendance = attendanceData.length;
      const totalLecturesAttended = attendanceData.filter(
        (entry) => entry.present
      ).length;
      const calculatedProgress =
        (totalLecturesAttended / totalAttendance) * 100;
      setProgress(calculatedProgress);
    };

    fetchAttendance();
  }, [db, user.uid]);

  // Sample data for the BarChart (Replace with your actual attendance summary data)
  const attendanceSummaryData = [
    {
      subject: "COA",
      count: attendanceData.filter((entry) => entry.subject === "COA").length,
    },
    {
      subject: "MPMC",
      count: attendanceData.filter((entry) => entry.subject === "MPMC").length,
    },
    {
      subject: "DBMS",
      count: attendanceData.filter((entry) => entry.subject === "DBMS").length,
    },
  ];

  // Example data for upcoming lectures
  const upcomingLectures = [
    {
      date: "2024-03-22",
      time: "10:00 AM",
      duration: "1 hour",
      attended: false,
    },
    {
      date: "2024-03-25",
      time: "2:00 PM",
      duration: "2 hours",
      attended: true,
    },
    // Add more lecture objects as needed
  ];

  return (
    <div className={`theme-${theme}`}>
      <Nav />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Circular Progress Bar */}
          <div className="relative w-48 h-48">
            <CircularProgress
              variant="determinate"
              value={progress}
              size={200}
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 1,
                color: progress >= 50 ? "#10B981" : "#EF4444",
              }}
            />
            <div className="absolute flex items-center justify-center w-48 h-48 text-4xl font-bold">
              {progress.toFixed(2)}%
            </div>
          </div>
          {/* Attendance Summary Graph */}
          <div className="w-full mt-8">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#000000" }}>
                  Attendance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={attendanceSummaryData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tick={{ fill: theme === "light" ? "#000000" : "#ffffff" }} // Adjust text color based on theme
                    />
                    <YAxis
                      dataKey="subject"
                      type="category"
                      tick={{ fill: theme === "light" ? "#000000" : "#ffffff" }} // Adjust text color based on theme
                    />
                    <Tooltip
                      cursor={false}
                      contentStyle={{
                        backgroundColor:
                          theme === "light" ? "#ffffff" : "#000000", // Adjust tooltip background color based on theme
                        color: theme === "light" ? "#000000" : "#ffffff", // Adjust tooltip text color based on theme
                      }}
                    />
                    <Bar dataKey="count" fill="#65b88f" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          {/* Top Cards */}
          <div className="flex flex-wrap justify-center mt-8 gap-4">
            <TopCard title="Total Attendance" value={attendanceData.length} />
            <TopCard
              title="Total Lectures Attended"
              value={attendanceData.filter((entry) => entry.present).length}
            />
            <TopCard
              title="Total Attendance Skipped"
              value={attendanceData.filter((entry) => !entry.present).length}
            />
            <TopCard title="Overall Progress" value={progress} />
          </div>
          {/* Upcoming Lectures Container */}
          <UpcomingLectures />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
