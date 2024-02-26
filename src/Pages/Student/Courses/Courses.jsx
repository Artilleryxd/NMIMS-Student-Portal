import React from "react";
import Nav from "../../../Components/Nav";
import Footer from "../../../Components/Footer";

const Courses = () => {
  return (
    <>
      <Nav />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Courses Offered</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CourseCard
            title="Btech AIDS"
            description="Bachelor of Technology in Artificial Intelligence and Data Science"
          />
          <CourseCard
            title="Btech CE"
            description="Bachelor of Technology in Computer Engineering"
          />
          <CourseCard
            title="BTech IT"
            description="MBA Tech in Computer Engineering"
          />

          <CourseCard
            title="Btech AI"
            description="Bachelor of Technology in Artificial Intelligence and Data Science"
          />
          <CourseCard
            title="MBAtech CE"
            description="Masters of Business Administration & Bachelor of Technology in Computer Engineering"
          />

          <CourseCard
            title="MBAtech AIDS"
            description="Masters of Business Administration & Bachelor of Technology in Artificial Intelligence and Data Science"
          />
          <CourseCard
            title="MBAtech AI"
            description="Masters of Business Administration & Bachelor of Technology in Computer Engineering"
          />

          <CourseCard
            title="MBAtech IT"
            description="Masters of Business Administration & Bachelor of Technology in Artificial Intelligence and Data Science"
          />
          <CourseCard
            title="Btech CE"
            description="Masters of Business Administration & Bachelor of Technology in Computer Engineering"
          />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

const CourseCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
      <h2 className="text-black text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default Courses;
