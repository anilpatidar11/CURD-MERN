import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";

const User = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
  });

const url = "https://curd-mern-r6jv.onrender.com"
  
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`${url}/user/update/${editId}`, formData);
        alert("User Updated Successfully");
        setIsEdit(false);
        setEditId(null);
      } else {
        await axios.post(`${url}/user/add`, formData);
        alert("User Added Successfully");
      }

      setFormData({ name: "", age: "", address: "" });
      getData();
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/user/get`);
      setData(response.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/user/delete/${id}`);
      alert("User Deleted Successfully");
      getData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      age: item.age,
      address: item.address,
    });
    setIsEdit(true);
    setEditId(item._id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      
            <h1 style={{"textAlign":"center"}}>User Management</h1>
      <h2>{isEdit ? "Update User" : "Add User"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEdit ? "Update" : "Submit"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td className="actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
