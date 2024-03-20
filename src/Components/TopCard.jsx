import React from "react";
import { useTheme } from "../Components/theme-provider";

const TopCard = ({ title, value }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default TopCard;
