"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card,CardHeader,CardTitle} from '@/components/ui/card'


 
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
    <Card className="w-[500px] ml-[370px] mt-[100px] h-[300px] bg-[linear-gradient(lightgreen,white)] ">
      <CardTitle className="text-center text-2xl pt-5 text-black ">Insert the data</CardTitle>
    <form onSubmit={handleSubmit} className="space-y-4 w-[400px] p-8 ml-[50px]">
    <div>
      <Input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter the Name"
        required
        className="w-full text-black  focus:placeholder-blue-800"
      />
    </div>
    <div>
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
        className="w-full focus:placeholder-blue-800"
      />
    </div>
    <div>
      <Input
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        required
        className="w-full focus:placeholder-blue-800"
      />
    </div>
    <Button type="submit" className="w-full py-2  text-white rounded hover:bg-blue-800">
      Add
    </Button>
  </form>
  </Card>

  );
}
