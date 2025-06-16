import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AddUser = () => {
  const [formData, setformData] = useState({
    name: "",
    age: "",
    address: "",
  });

  const [data, setData] = useState([]); //all data yhi hai

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/user/add", formData);

      alert("Data Added Succesfully");
      setformData({ name: "", age: "", address: "" });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(formData);

  const getData = async () => {
    try {
      const alldata = await axios.get("http://localhost:5000/user/get");
      //console.log(alldata.data.users)

      setData(alldata.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

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
        <button type="submit">Submit</button>
      </form>

      <div>
        <table>
          {data.map((item) => (
            <tr>
              <td> {item.name}</td>
              <td> {item.age}</td>
              <td> {item.address}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AddUser;
