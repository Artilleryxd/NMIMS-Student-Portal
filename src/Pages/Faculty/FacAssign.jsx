import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
} from "firebase/firestore";
import { UserAuth } from "../../Context/AuthContext";
import { useRef } from "react";
import Nav from "../../Components/Faculty/Nav";
import { Checkbox } from "../../Components/ui/checkbox";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import Footer from "../../Components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

const Facassign = () => {
  const { user } = UserAuth();
  const db = getFirestore();
  const boxRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [courseFilter, setCourseFilter] = useState("BTECH"); // default value is BTECH
  const [assignment, setAssignment] = useState(""); // State to hold the assignment name

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, orderBy("course"));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, [db]);

  const handleCheckboxChange = (event, userId) => {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSubmit = async () => {
    // Check if assignment name is provided
    if (!assignment.trim()) {
      console.error("Assignment name is required.");
      return;
    }

    // Loop through selected users and add assignment
    for (const userId of selectedUsers) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        const uid = user.id; // Assuming uid is stored in 'id' field

        // Create a document reference with the correct path
        const assignmentRef = collection(db, `Users/${uid}/assignment`);

        // Add a document with the assignment data
        await addDoc(assignmentRef, {
          assignment: assignment, // Use 'assignment' variable as a field
          submit: false,
        })
          .then(() => {
            console.log("Assignment added with path: Users/${uid}/assignment");
          })
          .catch((error) => {
            console.error("Error adding assignment: ", error);
          });
      }
    }
    setSelectedUsers([]);
  };

  const handleCourseFilterChange = (event) => {
    setCourseFilter(event.target.value);
  };

  const handleFilterSubmit = async () => {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, orderBy("course"));
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredUsers = usersData.filter(
      (userData) =>
        userData.type === "student" && userData.course === courseFilter
    );
    setUsers(filteredUsers);
  };

  return (
    <>
      <Nav />
      <div className="px-4 md:px-12 py-5 w-full">
        <p className="font-bold text-3xl md:text-5xl mx-3 my-5">Assignments</p>
        <Card>
          <CardHeader>
            <CardTitle>Create Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="assignment_name">Assignment Name</Label>
            <Input
              type="text"
              id="assignment_name"
              value={assignment}
              onChange={(e) => {
                setAssignment(e.target.value);
              }} // Assign Input change handler
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="courseFilter">Filter by Course:</Label>
            <Input
              type="text"
              id="courseFilter"
              value={courseFilter}
              onChange={handleCourseFilterChange}
            />
            <Button onClick={handleFilterSubmit}>Submit Filter</Button>
          </CardContent>
        </Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Checkbox</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((userData, index) => (
                <TableRow key={userData.id}>
                  <TableCell className="w-full flex justify-center">
                    <Input
                      type="checkbox"
                      checked={selectedUsers.includes(userData.id)}
                      onChange={(event) =>
                        handleCheckboxChange(event, userData.id)
                      }
                      className="w-5"
                    />
                  </TableCell>
                  <TableCell>{userData.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Facassign;
