"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Card, CardHeader,  CardTitle } from '@/components/ui/card'
import {Button} from '@/components/ui/button';
import {Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,} from '@/components/ui/table';   
  
  import { FaEdit } from "react-icons/fa";
  import { AiFillDelete } from "react-icons/ai";



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
    <Card className="flex flex-col hover:text--800 items-center w-[500px] ml-[400px] mt-10 hover:bg-[linear-gradient(skyblue,pink)] transform transition duration-300 ease-in-out hover:scale-110 " >
        <CardHeader className="text-3xl text-bold  font-serif">
        <h1>Employees Information</h1>
        </CardHeader>
      <CardTitle className="mb-10">
        <Button variant="default">
        <Link href="/employees/create" className="font-sans hover:text-blue-500  ">Add Employee</Link>
        </Button>
      
      </CardTitle>
      
      </Card>
      <Table className="mt-10 w-[500px] ml-[400px] ">
      <TableCaption className="mt-10" >A list of the Employee Information</TableCaption>
         <TableHeader>
          <TableRow >
            <TableHead >Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead >Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.location}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell className="flex gap-5">
                <Link href={`/employees/${employee.id}` }><FaEdit /></Link> 
                <button onClick={() => deleteEmployee(employee.id)}><AiFillDelete /></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>




    </div>
  );
}
