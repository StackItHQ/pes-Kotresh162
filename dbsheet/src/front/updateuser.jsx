import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {
   const { id } = useParams();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [age, setAge] = useState('');
   const navigate = useNavigate();

   // Fetch user data only when component mounts or when 'id' changes
   useEffect(() => {
      axios.get('http://localhost:3001/getUser/' + id)
         .then(result => {
            console.log(result);
            setName(result.data.name);
            setEmail(result.data.email);
            setAge(result.data.age);
         })
         .catch(err => console.log(err));
   }, [id]); // Adding id as dependency ensures this runs once or when id changes

   // Update user details
   const update = (e) => {
      e.preventDefault();
      axios.put("http://localhost:3001/updateUser/" + id, { name, email, age })
         .then(result => {
            console.log(result);
            navigate('/');
         })
         .catch(error => console.log(error));
   };

   return (
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
         <div className="w-50 bg-white rounded p-3">
            <form onSubmit={update}>
               <h2>Update User</h2>
               <div className="mb-2">
                  <label htmlFor="">Name</label>
                  <input
                     type="text"
                     placeholder="Enter name"
                     className="form-control"
                     value={name}
                     onChange={(e) => setName(e.target.value)} // This allows you to edit the name
                  />
               </div>
               <div className="mb-2">
                  <label htmlFor="">Email</label>
                  <input
                     type="email"
                     placeholder="Enter email"
                     className="form-control"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} // This allows you to edit the email
                  />
               </div>
               <div className="mb-2">
                  <label htmlFor="">Age</label>
                  <input
                     type="text"
                     placeholder="Enter age"
                     className="form-control"
                     value={age}
                     onChange={(e) => setAge(e.target.value)} // This allows you to edit the age
                  />
               </div>
               <button className="btn btn-success">Update</button>
            </form>
         </div>
      </div>
   );
}

export default UpdateUser;
