import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { UserAuth } from "@/Context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import Nav from "../../Components/Nav";

const Assignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const { user } = UserAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchAssignments = async () => {
      const assignmentsRef = collection(db, `Users/${user.uid}/assignment/`);
      const assignmentsSnapshot = await getDocs(assignmentsRef);
      const assignmentsData = [];
      assignmentsSnapshot.forEach((doc) => {
        assignmentsData.push({ id: doc.id, ...doc.data() });
      });
      setAssignments(assignmentsData);
      console.log(assignmentsData);
    };

    fetchAssignments();
  }, [db, user.uid]);

  const navAssignments = () => {
    navigate("/assignments");
  };

  return (
    <>
    <Nav/>
    <Card>

      <CardHeader>
        <CardTitle>New Assignments</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-200 pb-2"
          >
            <div>
              <p className="text-lg font-semibold">{assignment.assignment}</p>
              <p className="text-sm text-gray-500">
                Submitted: {assignment.submit ? "Yes" : "No"}
              </p>
            </div>
            {/* fixed the class and variable name */}
            <div className={`flex-shrink-0 h-3 w-3 rounded-full ${assignment.submit ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={navAssignments}>View All</Button>
      </CardFooter>
    </Card>
    </>
  );
};

export default Assignments;
