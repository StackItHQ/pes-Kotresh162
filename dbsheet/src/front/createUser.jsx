import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function CreateUser(){
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [age,setAge] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        
        axios.post("https://databasetogsheet-2.onrender.com/createUser", { name, email, age })
            .then(result => {
                console.log(result);
                alert("User created successfully!"); // Success message
                navigate('/');
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data.message); // Show error popup if user already exists
                } else {
                    console.log(error);
                    alert("An error occurred while creating the user."); // General error message
                }
            });
    };
    

    return(
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center" >
    <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Submit}>
            <h2>Add User</h2>
            <div className="mb-2">
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Enter name" className="form-control" onChange={(e) => setName(e.target.value)}/></div>
                <div className="mb-2">
                <label htmlFor="">Email</label>
                <input type="email" placeholder="Enter email" className="form-control" onChange={(e) => setEmail(e.target.value)}/></div>
                <div className="mb-2">
                <label htmlFor="">age</label>
                <input type="text" placeholder="Enter age" className="form-control" onChange={(e) => setAge(e.target.value)}/></div>
                <button className="btn btn-success">submit</button>
                
                </form>
                </div>        
   </div> )
}
export default CreateUser;