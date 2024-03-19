import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
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
import Footer from "../../Components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

const Assignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const { user } = UserAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchAssignments = async () => {
      const assignmentsRef = collection(db, `Users/${user.uid}/assignment/`);
      const q = query(assignmentsRef, orderBy("deadline"));
      const assignmentsSnapshot = await getDocs(q);
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

  const deadlineCheck = (d1) => {
    const currDate = new Date();

    if (currDate < d1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Nav />
      <div className="px-4 md:px-12 py-5 w-full">
        <p className="font-bold text-3xl md:text-5xl mx-3 my-5">
          Assignments
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deadline</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Max Marks</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment, index) => (
              <TableRow
                key={index}
              >
                <TableCell
                  className={`flex flex-row justify-between`}
                >
                  {assignment.deadline.toDate().getDate()}/
                  {assignment.deadline.toDate().getMonth()}/
                  {assignment.deadline.toDate().getFullYear()}
                  <div className={`flex-shrink-0 h-3 w-3 rounded-full ${deadlineCheck(assignment.deadline.toDate()) ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </TableCell>
                <TableCell>{assignment.assignment}</TableCell>
                <TableCell>{assignment.maxMarks}</TableCell>
                <TableCell>{assignment.submit ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Assignments;
