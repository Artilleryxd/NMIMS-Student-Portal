import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    dob: "",
    sapId: "",
    email: "",
    collegeEmail: "",
    year: "",
    department: "",
  });
  const [idCardImage, setIdCardImage] = useState(null);

  // Load user details from local storage on component mount
  useEffect(() => {
    const userDetailsFromStorage =
      JSON.parse(localStorage.getItem("userDetails")) || {};
    setUserDetails(userDetailsFromStorage);
    const imageData = localStorage.getItem("idCardImage");
    if (imageData) {
      const blob = new Blob([imageData], { type: "image/*" });
      setIdCardImage(blob);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setIdCardImage(file);
  };

  const handleDeleteImage = () => {
    setIdCardImage(null);
    localStorage.removeItem("idCardImage");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user details and image data to local storage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    if (idCardImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        localStorage.setItem("idCardImage", e.target.result);
      };
      reader.readAsDataURL(idCardImage);
    }
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto mt-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:mr-8 mb-8 md:mb-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-4">Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Add other input fields for user details similarly */}
              <div className="mb-4">
                <label
                  htmlFor="idCardImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload ID Card Photo
                </label>
                <input
                  type="file"
                  id="idCardImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-2"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="md:w-1/2 md:ml-8">
          {idCardImage && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Uploaded ID Card</h3>
              <img
                src={URL.createObjectURL(idCardImage)}
                alt="Uploaded ID Card"
                className="max-w-xs"
              />
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDeleteImage}
              >
                Delete Image
              </button>
            </div>
          )}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Student Details</h3>
              <ul>
                <li>
                  <strong>Name:</strong> {userDetails.name}
                </li>
                <li>
                  <strong>DOB:</strong> {userDetails.dob}
                </li>
                <li>
                  <strong>Sap ID:</strong> {userDetails.sapId}
                </li>
                <li>
                  <strong>Email:</strong> {userDetails.email}
                </li>
                <li>
                  <strong>College Email:</strong> {userDetails.collegeEmail}
                </li>
                <li>
                  <strong>Year:</strong> {userDetails.year}
                </li>
                <li>
                  <strong>Department:</strong> {userDetails.department}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
