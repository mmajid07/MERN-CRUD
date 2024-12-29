import React, { useEffect, useState } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const User = () => {
  const [users, setUsers] = useState("");
  const GetUsers = async () => {
    const response = await axios.get("http://localhost:8000/api/getall");
    setUsers(response?.data);
  };
  useEffect(() => {
    GetUsers();
  }, []);
  const DeleteData = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success(response?.data?.msg || "User Deleted Successfully", {
          position: "top-right",
        });
        setUsers((preUsers) => preUsers.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="user-table">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Sr. NO</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {user.fname} {user.lname}
                  </td>
                  <td>{user.email}</td>
                  <td className="actionbuttons">
                    <button onClick={() => DeleteData(user._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/update/${user._id}`}>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
