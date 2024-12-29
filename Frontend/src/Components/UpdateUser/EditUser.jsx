import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../AddUser/AddUser.css";
import axios from "axios";
import toast from "react-hot-toast";

const EditUser = () => {
  const initialValue = {
    fname: "",
    lname: "",
    email: "",
  };
  const [user, setUser] = useState(initialValue);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  useEffect(() => {
    const GetOneUser = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/getone/${id}`
      );
      setUser(response.data);
    };
    GetOneUser();
  }, [id]);
  const UpdateUserData = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        console.log(response.date);
        toast.success(response?.data?.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(user);
  return (
    <div className="addUser">
      <Link to="/" className="backButton">
        Back
      </Link>
      <h3>Update User</h3>
      <form className="addUserFrom" onSubmit={UpdateUserData}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={user.fname}
            onChange={handleInputChange}
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
            value={user.lname}
            onChange={handleInputChange}
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
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            autoComplete="off"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
