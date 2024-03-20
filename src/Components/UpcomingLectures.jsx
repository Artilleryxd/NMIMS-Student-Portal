import React from "react";
import { useTheme } from "../Components/theme-provider";

const UpcomingLectures = () => {
  const { theme } = useTheme();

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
    <div
      className={`mt-8 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
    >
      <h2
        className={`${theme === "dark" ? "text-white" : "text-gray-800"} text-2xl font-semibold mb-4`}
      >
        Upcoming Lectures
      </h2>
      {upcomingLectures.map((lecture, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row items-start p-4 rounded-lg shadow-md mb-5 ${theme === "dark" ? "bg-gray-800" : "bg-white"} ${!lecture.attended && theme === "dark" ? "border " : ""}`}
        >
          <div className="flex-1">
            <p
              className={`${theme === "dark" ? "text-white" : "text-gray-800"} text-lg font-semibold`}
            >
              Date: {lecture.date}
            </p>
            <p
              className={`${theme === "dark" ? "text-white" : "text-gray-800"} text-lg`}
            >
              Time: {lecture.time}
            </p>
            <p
              className={`${theme === "dark" ? "text-white" : "text-gray-800"} text-lg`}
            >
              Duration: {lecture.duration}
            </p>
          </div>
          {!lecture.attended && (
            <div className="mt-2 p-2 bg-red-100 text-red-600 rounded lg:ml-4">
              <p>This lecture has not been attended yet.</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UpcomingLectures;
