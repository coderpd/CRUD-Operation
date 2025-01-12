"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateEmployee() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/employees", { name, location, salary });
    router.push("/employees");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" required />
      <button type="submit">Add Employee</button>
    </form>
  );
}
