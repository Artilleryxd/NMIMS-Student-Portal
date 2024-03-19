import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, orderBy, query, addDoc } from "firebase/firestore";
import { UserAuth } from '../../Context/AuthContext';
import { useRef } from 'react';

const Facassign = () => {
  const { user } = UserAuth();
  const db = getFirestore();
  const boxRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [courseFilter, setCourseFilter] = useState('BTECH'); // default value is BTECH
  const [assignment, setAssignment] = useState(''); // State to hold the assignment name

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'Users');
      const q = query(usersRef, orderBy('course'));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, [db]);

  const handleCheckboxChange = (event, userId) => {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
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
      const user = users.find(u => u.id === userId);
      if (user) {
        const uid = user.id; // Assuming uid is stored in 'id' field

        // Create a document reference with the correct path
        const assignmentRef = collection(db, `Users/${uid}/assignment`);

        // Add a document with the assignment data
        await addDoc(assignmentRef, {
          assignment: assignment, // Use 'assignment' variable as a field
          submit: false
        }).then(() => {
          console.log("Assignment added with path: Users/${uid}/assignment");
        }).catch((error) => {
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
    const usersRef = collection(db, 'Users');
    const q = query(usersRef, orderBy('course'));
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const filteredUsers = usersData.filter(userData => userData.type === 'student' && userData.course === courseFilter);
    setUsers(filteredUsers);
  };
  
  return (
    <div style={{ backgroundColor: '#1f1f1f', color: '#ffffff', padding: '20px', marginTop: '10rem' }}>
      <h2 style={{ color: '#ffffff' }}>Choose the Course You want to assign the assignment</h2>
      <div>
        <label htmlFor="courseFilter" style={{ color: '#ffffff' }}>Filter by Course:</label>
        <input
          type="text"
          id="courseFilter"
          value={courseFilter}
          onChange={handleCourseFilterChange}
          style={{ backgroundColor: '#333333', color: '#ffffff', border: '1px solid #cccccc', padding: '5px', borderRadius: '5px', marginRight: '10px' }}
        />
        <button onClick={handleFilterSubmit} style={{ backgroundColor: '#555555', color: '#ffffff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Submit Filter</button>
        <br />
        <label htmlFor="assignment_name" style={{ color: '#ffffff' }}>Assignment Name</label>
        <input
          type="text"
          id="assignment_name"
          value={assignment}
          onChange={(e) => { setAssignment(e.target.value) }} // Assign input change handler
          style={{ backgroundColor: '#333333', color: '#ffffff', border: '1px solid #cccccc', padding: '5px', borderRadius: '5px', marginRight: '10px', margin: "1rem" }}
        />
  
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#333333', color: '#ffffff', padding: '10px', border: '1px solid #ffffff' }}>Checkbox</th>
            <th style={{ backgroundColor: '#333333', color: '#ffffff', padding: '10px', border: '1px solid #ffffff' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users
            .map((userData, index) => (
              <tr key={userData.id} style={{ backgroundColor: index % 2 === 0 ? '#444444' : '#333333' }}>
                <td style={{ padding: '10px', border: '1px solid #ffffff' }}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(userData.id)}
                    onChange={(event) => handleCheckboxChange(event, userData.id)}
                  />
                </td>
                <td style={{ padding: '10px', border: '1px solid #ffffff' }}>{userData.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} style={{ backgroundColor: '#555555', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' }}>Submit</button>
    </div>
  );
}

export default Facassign;
