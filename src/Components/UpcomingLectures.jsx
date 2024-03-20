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
      className={`mt-8 ${theme === "dark" ? "text-white" : "text-gray-800"} px-6 mb-6`}
    >
      <h2
        className={`${theme === "dark" ? "text-white" : "text-gray-800"} text-2xl font-semibold mb-4 text-center`}
      >
        Upcoming Lectures
      </h2>
    <div className="flex m-3 flex-col">
      {upcomingLectures.map((lecture, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center p-4 rounded-lg shadow-md mb-5 mx-3 w-fit ${theme === "dark" ? "bg-gray-800" : "bg-white"} ${!lecture.attended && theme === "dark" ? "border " : ""}`}
        >
          <div className={`${theme === "light" ? "bg-blue-300" : "bg-blue-800"} rounded p-2 my-2 xs:w-full xs:text-center md:w-fit md:text-left`}>
            <div className="flex-1  ">
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
          </div>
            <div>
                <div className={`mx-3 ${theme === "dark" ? "text-white" : "text-gray-800"} my-1`}>
                  <h1 className="text-xl">Probability & Statistis</h1>
                  <span>C-307</span>
                </div>
              <div className="mt-2 p-2 bg-red-100 text-red-600 rounded lg:ml-4 flex my-1">
                <p>This lecture has not been attended yet.</p>
              </div>
            </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default UpcomingLectures;
