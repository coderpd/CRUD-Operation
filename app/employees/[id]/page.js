
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="max-w-lg mx-auto mt-10 shadow-lg bg-[linear-gradient(pink,white)]">
    <CardHeader>
      <CardTitle className="text-xl font-bold text-gray-800 text-center">Update Employee</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>

        {/* Location Input */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
          />
        </div>

        {/* Salary Input */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary"
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="default" className="w-full">
          Update Employee
        </Button>
      </form>
    </CardContent>
  </Card>
  );
}

 