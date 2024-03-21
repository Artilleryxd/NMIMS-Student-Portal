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
      <div className="container mx-auto my-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {userDetails ? (
              <ul>
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
              </ul>
            ) : (
              <p>Loading user details...</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
