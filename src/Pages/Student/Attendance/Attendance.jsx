import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Attendance = () => {
  // Attendance data for demonstration
  const initialAttendanceData = [
    { subject: "CVT", date: "2024-02-01", status: "Present" },
    { subject: "TCS", date: "2024-02-02", status: "Absent" },
    { subject: "MPMC", date: "2024-02-03", status: "Present" },
    { subject: "DBMS", date: "2024-02-04", status: "Present" },
    { subject: "DAA", date: "2024-02-04", status: "Absent" },
    { subject: "COA", date: "2024-02-04", status: "Present" },
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Attendance</h1>
        <div className="mb-8 flex justify-center">
          <DatePicker
            className="text-black border border-gray-300 rounded px-4 py-2"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date"
          />
        </div>
        <table className="w-full">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Subject
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-900 divide-y divide-gray-200 ">
            {attendanceData.map((item, index) => (
              <tr key={index} className="text-white">
                <td className="px-6 py-4">{item.subject}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full ${item.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Attendance;
