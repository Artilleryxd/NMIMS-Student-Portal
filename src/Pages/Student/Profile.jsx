import React, { useState, useEffect } from "react";
import Nav from "../../Components/Faculty/Nav";
import Footer from "../../Components/Footer";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { UserAuth } from "../../Context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../Components/ui/card";

const Profile = () => {
  const { user } = UserAuth();
  const [userDetails, setUserDetails] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDocRef = doc(db, `Users/${user.uid}/ID_card/Card`);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserDetails(userDocSnapshot.data());
        } else {
          console.log("User details not found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [db, user.uid]);

  return (
    
    <div>
      <Nav />
      <div>
      <div className="flex justify-start">
        <div className="p-2 m-1 grid gap-4 w-fit h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVc22FgIapuN5SmPjiN6uI3Vfj1uNO1ShdSg&usqp=CAU"
                className="rounded-full"
              />
              <p className="mt-2 text-xl text-white text-center">Test User</p>
            </CardContent>
          </Card>
        </div>
        <div className="p-2 m-1 grid gap-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
            </CardHeader>
            <CardContent>

            <hr className="my-2 " />
            {userDetails ? (
              <ul className="">
                <li>
                  <strong>Name:</strong> {userDetails.Name}
                </li>
                <li>
                  <strong>DOB:</strong> {userDetails.DOB}
                </li>
                <li>
                  <strong>SAP ID:</strong> {userDetails.SAP_ID}
                </li>
                <li>
                  <strong>Email:</strong> {userDetails.Email}
                </li>
                <li>
                  <strong>College Email:</strong> {userDetails.ClgEmail}
                </li>
                <li>
                  <strong>Year:</strong> {userDetails.Year}
                </li>
                <li>
                  <strong>Department:</strong> {userDetails.Department}
                </li>
                <li>
                  <strong>Course:</strong> {userDetails.Course}
                </li>
              </ul>
            ) : (
              <p>Loading user details...</p>
            )}
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
