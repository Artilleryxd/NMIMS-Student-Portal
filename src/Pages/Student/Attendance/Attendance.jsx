import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "../../../Components/theme-provider";

const Attendance = () => {
  const { theme } = useTheme();

  // Attendance data for demonstration
  const initialAttendanceData = [
    { subject: "CVT", lectures: 10, present: 8, absent: 2 },
    { subject: "TCS", lectures: 12, present: 9, absent: 3 },
    { subject: "MPMC", lectures: 10, present: 7, absent: 3 },
    { subject: "DBMS", lectures: 10, present: 9, absent: 1 },
    { subject: "DAA", lectures: 10, present: 6, absent: 4 },
    // Add more data as needed
  ];

  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Filter attendance data based on selected date
    const filteredData = initialAttendanceData.filter(
      (item) => item.date === date.toISOString().slice(0, 10)
    );
    setAttendanceData(filteredData);
  };

  return (
    <>
      <Nav />
      <div
        className={`container mx-auto px-4 py-8 rounded ${
          theme === "dark" ? "dark:text-white dark:bg-gray-900" : ""
        }`}
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Your Attendance</h1>
        <div className="mb-8 flex flex-col md:flex-row justify-center items-center md:space-x-4">
          <DatePicker
            className="text-black border border-gray-300 rounded mx-2 my-2 md:my-0 px-4 py-2 w-full md:w-auto"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Start Date"
          />

          <DatePicker
            className="text-black border border-gray-300 rounded mx-2 my-2 md:my-0 px-4 py-2 w-full md:w-auto"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="End Date"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendanceData.map((item, index) => (
            <div
              key={index}
              className={`${
                theme === "dark" ? "dark:bg-gray-800" : "bg-white"
              } rounded-lg overflow-hidden shadow-md`}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">{item.subject}</h2>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">No. of Lectures</p>
                    <p className="font-bold text-lg">{item.lectures}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Present</p>
                    <p className="font-bold text-lg">{item.present}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="font-bold text-lg">{item.absent}</p>
                  </div>
                </div>
                <div className="flex justify-center relative">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="5"
                      strokeDasharray={`${(item.present / item.lectures) * 282}, 282`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <span
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                      theme === "dark" ? "text-white" : "text-black"
                    } font-bold text-lg`}
                  >
                    {((item.present / item.lectures) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Attendance;
