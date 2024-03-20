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
import DatePicker from "../../Components/DatePicker";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const Facassign = () => {
  const { user } = UserAuth();
  const db = getFirestore();
  const boxRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [courseFilter, setCourseFilter] = useState("BTECH"); // default value is BTECH
  const [assignment, setAssignment] = useState(""); // State to hold the assignment
  const [deadline, setDeadline] = useState(new Date());
  const [maxMarks, setMaxMarks] = useState("");

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

  const handleCheckboxChange = (value, userId) => {
    if (value) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSubmit = async () => {
    // Check if assignment name is provided
    if (!assignment.trim()) {
      console.error("Assignment name is required.");
      toast.error("Assignment name is required.");
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
          deadline: deadline,
          maxMarks: Number(maxMarks),
          submit: false,
        })
          .then(() => {
            toast.success("Assignment Added");
          })
          .catch((error) => {
            toast.error("Error adding assignment: ", error);
          });
      }
    }
    setSelectedUsers([]);
  };

  const handleCourseFilterChange = (value) => {
    setCourseFilter(value);
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
    console.log(filteredUsers);
    setUsers(filteredUsers);
  };

  return (
    <>
      <Nav />
      <div className="px-4 md:px-12 py-5 w-full">
        <p className="font-bold text-3xl md:text-5xl mx-3 my-5">Assignments</p>
        <Card className="grid grid-cols-3 grid-row-2">
          <div className="col-span-3">
            <CardHeader>
              <CardTitle>Create Assignment</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="assignment_name">Assignment Name</Label>
                <Input
                  type="text"
                  id="assignment_name"
                  value={assignment}
                  onChange={(e) => {
                    setAssignment(e.target.value);
                  }} // Assign Input change handler
                />
              </div>
              <div>
                <Label>Select Maximum Marks</Label>
                <Input
                  type="number"
                  onChange={(marks) => {
                    setMaxMarks(marks.target.value);
                  }}
                ></Input>
              </div>
              <div>
                <Label>Select Deadline</Label>
                <DatePicker
                  onChange={(date) => setDeadline(date)}
                  className="w-full"
                ></DatePicker>
              </div>
            </CardContent>
          </div>
          <div className="col-span-1">
            <CardHeader>
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Label htmlFor="courseFilter">Filter by Course:</Label>
                <Select
                  onValueChange={handleCourseFilterChange}
                  defaultValue={courseFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MBATECH">MBATECH</SelectItem>
                    <SelectItem value="BTECH">BTECH</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleFilterSubmit}>Filter</Button>
              </div>
            </CardContent>
          </div>
          <CardContent className="col-span-2">
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
                        <Checkbox
                          checked={selectedUsers.includes(userData.id)}
                          onCheckedChange={(value) =>
                            handleCheckboxChange(value, userData.id)
                          }
                        ></Checkbox>
                      </TableCell>
                      <TableCell>{userData.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="col-span-3">
            <Button onClick={handleSubmit} className="w-full">
              Create
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Facassign;
