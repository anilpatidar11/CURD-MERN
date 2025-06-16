import axios from "axios";
import React, { useEffect, useState } from "react";

const User = () => {
  const [formData, setformData] = useState({
    name: "",
    age: "",
    address: "",
  });
  const [data, setData] = useState([]);
  

  const [isEdit, setIsEdit] = useState(false); //1
  const [editId, setEditId] = useState(null); //2

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/user/update/${editId}`, formData);//3
        alert("User Updated Successfully");
        setIsEdit(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/user/add", formData);
        alert("Data Added Successfully");
      }

      setformData({ name: "", age: "", address: "" });
      getData(); // refresh data
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/get");
      setData(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/delete/${id}`);
      alert("User Deleted Successfully");
      getData(); // refresh data
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setformData({
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br /> <br />
        <input
          name="age"
          placeholder="age"
          value={formData.age}
          onChange={handleChange}
        />
        <br /> <br />
        <input
          name="address"
          placeholder="address"
          value={formData.address}
          onChange={handleChange}
        />
        <br /> <br />
        <button type="submit">{isEdit ? "Update" : "Submit"}</button>
      </form>

      <div>
        <table border="1">
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
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
