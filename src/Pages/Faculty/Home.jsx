import React from "react";
import Nav from "../../Components/Faculty/Nav.jsx";
import AreaChartComponent from "../../Components/Faculty/AreaChartComponent.jsx";
import CardGrid from "../../Components/Faculty/Card.jsx";
import { UserAuth } from "../../Context/AuthContext.jsx";



const Home = () => {
  const { user, logout } = UserAuth();

  return (
    <div>
      <Nav />
      
      <div className="flex-row items-center justify-center mt-10 text-center">
      <a
            href="#"
            class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span class="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
              Faculty
            </span>{" "}
            <span class="text-sm font-medium"> Welcome ! {user && user.email}</span>
            <svg
              class="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Faculty Dashboard</h1>


       <div className=" w-dvh h-96 mt-10 mb-10">
        <AreaChartComponent/>
        </div>   

        <div className="flex items-center justify-center mt-10 mb-10">
        <CardGrid/>
        </div>
        </div>
    </div>
  );
};

export default Home;
