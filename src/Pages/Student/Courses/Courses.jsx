import React from "react";
import Nav from "../../../Components/Nav";
import Footer from "../../../Components/Footer";

const Courses = () => {
  //To be replaced after fetching data from firestore
  const courseData = [
    {
      title: "Btech AIDS",
      description:
        "Bachelor of Technology in Artificial Intelligence and Data Science",
    },

    {
      title: "Btech CE",
      description: "Bachelor of Technology in Computer Engineering",
    },

    {
      title: "BTech IT",
      description: "MBA Tech in Computer Engineering",
    },

    {
      title: "Btech AI",
      description:
        "Bachelor of Technology in Artificial Intelligence and Data Science",
    },

    {
      title: "MBAtech CE",
      description:
        "Masters of Business Administration & Bachelor of Technology in Computer Engineering",
    },

    {
      title: "MBAtech AIDS",
      description:
        "Masters of Business Administration & Bachelor of Technology in Artificial Intelligence and Data Science",
    },

    {
      title: "MBAtech AI",
      description:
        "Masters of Business Administration & Bachelor of Technology in Computer Engineering",
    },

    {
      title: "MBAtech IT",
      description:
        "Masters of Business Administration & Bachelor of Technology in Artificial Intelligence and Data Science",
    },

    {
      title: "Btech CE",
      description:
        "Masters of Business Administration & Bachelor of Technology in Computer Engineering",
    },
  ];

  return (
    <>
      <Nav />
      <div className="container px-12 mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Courses Offered</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {courseData.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
            ></CourseCard>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

const CourseCard = ({ title, description }) => {
  return (
    <div className="bg-muted rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
      <h2 className="text-foreground text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Courses;
