"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("/api/employees").then((response) => setEmployees(response.data));
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`/api/employees/${id}`).then(() => {
      setEmployees(employees.filter((employee) => employee.id !== id));
    });
  };

  return (
    <div>
      <h1>Employees</h1>
      <Link href="/employees/create">Add Employee</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.location}</td>
              <td>{employee.salary}</td>
              <td>
                <Link href={`/employees/${employee.id}`}>Edit</Link>
                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
