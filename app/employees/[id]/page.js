
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditEmployee() {
  const params = useParams(); 
  const { id } = params; 
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios.get(`/api/employees/${id}`).then((response) => {
      const { name, location, salary } = response.data;
      setName(name);
      setLocation(location);
      setSalary(salary);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/employees/${id}`, { name, location, salary });
    router.push("/employees");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
      <input
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        required
      />
      <button type="submit">Update Employee</button>
    </form>
  );
}

