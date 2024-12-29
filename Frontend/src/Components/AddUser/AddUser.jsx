import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddUser.css";
import toast from "react-hot-toast";

const AddUser = () => {
  const initialValue = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialValue);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const SubmitData = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8000/api/create`, user)
      .then((response) => {
        console.log(response);
        setUser(initialValue);
        navigate("/");
        toast.success(response?.data?.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="addUser">
      <Link to="/" className="backButton">
        Back
      </Link>
      <h3>Add New User</h3>
      <form className="addUserFrom" onSubmit={SubmitData}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            onChange={inputHandler}
            placeholder="First Name"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            onChange={inputHandler}
            placeholder="Last Name"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={inputHandler}
            placeholder="Email"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={inputHandler}
            placeholder="Password"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
