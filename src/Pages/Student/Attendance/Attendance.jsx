import React, { useState } from "react";
import Nav from "../../../Components/Nav";

const Attendance = () => {
  // Mock attendance data for demonstration
  const [attendanceData, setAttendanceData] = useState([
    { subject: "Mathematics", date: "2024-02-01", status: "Present" },
    { subject: "Science", date: "2024-02-02", status: "Absent" },
    { subject: "History", date: "2024-02-03", status: "Present" },
    { subject: "English", date: "2024-02-04", status: "Present" },
    // Add more data as needed
  ]);

  return (
    <>
      <Nav />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Attendance</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.subject}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
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
