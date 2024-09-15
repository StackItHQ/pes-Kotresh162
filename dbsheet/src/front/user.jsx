import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function User(){
    const [users,setUsers] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001')
        .then(result => setUsers(result.data))
        .catch(err=> console.log(err))
    })
    const deletUser = (id) =>{
        axios.delete('http://localhost:3001/deletUser/'+id)
        .then(resu => {console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    return(
   <div className="d-flex vh-100 bg-primary justify-content-center align-items-center" >
    <div className="w-50 bg-white rounded p-3">
        <Link to='/create' className="btn btn-success">Add +  </Link>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((users) => {
                        return(
                            <tr>
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{users.age}</td>
                                <td>
                                <Link to={`/update/${users._id}`} className="btn btn-primary">Update</Link>
                                    <button className="btn btn-danger" onClick={(e) => deletUser(users._id)}>Delete</button>
                                    </td>
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
    </div>
   </div> 
    )
}
export default User;