import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, orderBy, query } from "firebase/firestore";
import { UserAuth } from '../../Context/AuthContext';
import { useRef } from 'react';

const Facassign = () => {
  const { user } = UserAuth();
  const db = getFirestore();
  const boxRef = useRef(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'Users');
      const q = query(usersRef, orderBy('course'));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      console.log(usersData)
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Usernames Enrolled in MBATECH Course</h2>
      <div>
        {users
          .filter(userData => userData.type === 'student' )
          .map((userData, index) => (
            <p key={index}>{userData.email}</p> // Assuming there's a 'username' property for each user
          ))}
      </div>
    </div>
  );
}

export default Facassign;
