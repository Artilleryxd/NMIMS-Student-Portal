import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import Footer from "../../../Components/Footer";

const Elibrary = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedCourse(null); // Reset selectedCourse and selectedYear when a new option is clicked
    setSelectedYear(null);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedYear(null); // Reset selectedYear when a new course is clicked
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const CourseCard = ({ title, description, onClick }) => {
    return (
      <div
        className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-700 cursor-pointer"
        onClick={onClick}
      >
        <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
    );
  };

  return (
    <>
      <Nav />
      <div className="container px-12 mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center">E-Library</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
          <div
            className="option text-lg font-semibold text-center bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => handleOptionClick("SRB")}
          >
            Student Resource Books (SRB)
          </div>
          <div
            className="option text-lg font-semibold text-center bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => handleOptionClick("TimeTable")}
          >
            Time Table
          </div>
          <div
            className="option text-lg font-semibold text-center bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => handleOptionClick("QuestionPapers")}
          >
            Question Papers
          </div>
          <div
            className="option text-lg font-semibold text-center bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => handleOptionClick("Syllabus")}
          >
            Syllabus
          </div>
        </div>

        {selectedOption === "SRB" && (
          <div className="sub-container bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#1c212d" }}>{selectedOption} PDF</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" style={{ backgroundColor: "#1c212d" }} onClick={() => window.open("https://elibrarydata.s3.ap-south-1.amazonaws.com/SRB+2023-24.pdf")}>
              SRB
            </button>
          </div>
        )}

        {selectedOption === "TimeTable" && (
          <div className="sub-container bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#1c212d" }}>{selectedOption}</h2>
            <div className="course-container grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <CourseCard
                title="Time Table BTech"
                description="Description for BTech Timetable."
                onClick={() => handleCourseClick("tt-BTech")}
              />
              <CourseCard
                title="Time Table MBATech"
                description="Description for MBATech Timetable."
                onClick={() => handleCourseClick("tt-MBATech")}
              />
            </div>
          </div>
        )}

        {selectedOption === "QuestionPapers" && (
          <div className="sub-container bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#1c212d" }}>{selectedOption}</h2>
            <div className="course-container grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <CourseCard
                title="Question Paper BTech"
                description="Description for BTech Question Papers."
                onClick={() => handleCourseClick("Qp-BTech")}
              />
              <CourseCard
                title="Question Paper MBATech"
                description="Description for MBATech Question Papers."
                onClick={() => handleCourseClick("Qp-MBATech")}
              />
            </div>
          </div>
        )}

        {selectedOption === "Syllabus" && (
          <div className="sub-container bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#1c212d" }}>{selectedOption}</h2>
            <div className="course-container grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <CourseCard
                title="Syllabus BTech"
                description="Description for BTech Syllabus."
                onClick={() => handleCourseClick("sb-BTech")}
              />
              <CourseCard
                title="Syllabus MBATech"
                description="Description for MBATech Syllabus."
                onClick={() => handleCourseClick("sb-MBATech")}
              />
            </div>
          </div>
        )}

        {selectedCourse && (
          <div className="sub-container bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="year-container grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div
                className="year text-lg font-semibold text-center bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={() => handleYearClick("Year1")}
              >
                Year 1
              </div>
              <div
                className="year text-lg font-semibold text-center bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={() => handleYearClick("Year2")}
              >
                Year 2
              </div>
            </div>
          </div>
        )}

        {selectedYear && (
          <div className="sub-container bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="file-container">
              {/* Display PDF buttons based on the selected year */}
              
              {selectedYear === "Year1" && (
                
                  <>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" style={{ backgroundColor: "#1c212d" }} onClick={() => window.open("https://elibrarydata.s3.ap-south-1.amazonaws.com/B_Tech__(All_Program_Except_CSBS__CSDS)__1st_Year__Sem-I__A_Y_2023-24_pD4YhFCRG4.pdf")}>
                      Year 1 Btech PDF
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" style={{ backgroundColor: "#1c212d" }} onClick={() => window.open("https://elibrarydata.s3.ap-south-1.amazonaws.com/MBA+tech+all+branches+sem+2.pdf")}>
                      Year 1 MBA Tech PDF
                    </button>
                  </>
                
              )}

              {selectedYear === "Year2" && (
                <>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" style={{ backgroundColor: "#1c212d" }} onClick={() => window.open("https://elibrarydata.s3.ap-south-1.amazonaws.com/B_Tech__(All_Program_Except_CSBS__CSDS)__1st_Year__Sem-I__A_Y_2023-24_pD4YhFCRG4.pdf")}>
                    Year 2 Btech PDF
                  </button>
                  
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" style={{ backgroundColor: "#1c212d" }} onClick={() => window.open("https://elibrarydata.s3.ap-south-1.amazonaws.com/MBA+tech+all+branches+sem+2.pdf")}>
                    Year 2 MBA Tech PDF
                  </button>
                  {/*more can add more buttons as needed*/}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Elibrary;
