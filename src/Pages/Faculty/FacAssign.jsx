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
import Nav from "../../Components/Faculty/Nav";
import { Input } from "../../Components/ui/input";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import Footer from "../../Components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/Components/ui/table";

const Facassign = () => {
  const { user } = UserAuth();
  const db = getFirestore();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [courseFilter, setCourseFilter] = useState("BTECH");
  const [assignment, setAssignment] = useState("");

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
    if (!assignment.trim()) {
      console.error("Assignment name is required.");
      return;
    }

    for (const userId of selectedUsers) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        const uid = user.id;
        const assignmentRef = collection(db, `Users/${uid}/assignment`);

        await addDoc(assignmentRef, { assignment: assignment, submit: false })
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Create Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Enter Assignment Name"
                value={assignment}
                onChange={(e) => {
                  setAssignment(e.target.value);
                }}
                className="mb-4"
              />
              <Button onClick={handleSubmit} className="w-full">
                Create Assignment
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Filter by Course"
                value={courseFilter}
                onChange={handleCourseFilterChange}
                className="mb-4"
              />
              <Button onClick={handleFilterSubmit} className="w-full">
                Apply Filter
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                <TableCell className="w-1/12">Checkbox</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userData) => (
                <TableRow key={userData.id}>
                  <TableCell className="align-middle">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(userData.id)}
                      onChange={(event) =>
                        handleCheckboxChange(event, userData.id)
                      }
                    />
                  </TableCell>
                  <TableCell className="align-middle">
                    {userData.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button onClick={handleSubmit} className="mt-4 w-full">
          Assign
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default Facassign;
