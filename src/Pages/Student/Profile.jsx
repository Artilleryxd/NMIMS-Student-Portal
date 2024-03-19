import React , {useState , useEffect} from 'react';
import Nav from '../../Components/Faculty/Nav';
import { useTheme } from "../../Components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";

import { Button } from "../../Components/ui/button";

import Footer from "../../Components/Footer";

const Profile = () => {
  // State for profile rating
  const [rating, setRating] = useState(3); // Initial rating value

  // Function to handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto my-8 flex flex-col md:flex-row items-center gap-8">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="dob" className="block text-sm font-medium">
                    DOB
                  </Label>
                  <Input
                    type="text"
                    id="dob"
                    name="dob"
                    value={userDetails.dob}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="sapId" className="block text-sm font-medium">
                    Sap ID
                  </Label>
                  <Input
                    type="text"
                    id="sapId"
                    name="sapId"
                    value={userDetails.sapId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="collegeEmail"
                    className="block text-sm font-medium"
                  >
                    College Email
                  </Label>
                  <Input
                    type="email"
                    id="collegeEmail"
                    name="collegeEmail"
                    value={userDetails.collegeEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="year" className="block text-sm font-medium">
                    Year
                  </Label>
                  <Input
                    type="text"
                    id="year"
                    name="year"
                    value={userDetails.year}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="department"
                    className="block text-sm font-medium"
                  >
                    Department
                  </Label>
                  <Input
                    type="text"
                    id="department"
                    name="department"
                    value={userDetails.department}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Add other Input fields for user details similarly */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="idCardImage">Upload ID Card Photo</Label>
                  <Input
                    type="file"
                    id="idCardImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:text-card-foreground"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="w-1/2 flex flex-column gap-5">
          {idCardImage && (
            <Card>
              <CardHeader>
                <CardTitle>Uploaded ID Card</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={URL.createObjectURL(idCardImage)}
                  alt="Uploaded ID Card"
                  className="max-w-xs"
                />
                <Button type="destructive" onClick={handleDeleteImage}>
                  Delete Image
                </Button>
              </CardContent>
            </Card>
          )}
          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Student Details</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid w-full items-center gap-4">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
