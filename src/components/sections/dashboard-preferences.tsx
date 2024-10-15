"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

export default function JobSearchForm({ prefs }: { prefs: any }) {
  const [email, setEmail] = useState(prefs.email);
  const [password, setPassword] = useState(prefs.password);
  const [jobSearch, setJobSearch] = useState(prefs.search);
  const [experience, setExperience] = useState(prefs.experience);
  const [salary, setSalary] = useState(prefs.salary);
  const [employmentType, setEmploymentType] = useState(prefs.type);
  const [locationType, setLocationType] = useState(prefs.location);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/preferences", {
      email,
      password,
      search: jobSearch,
      experience,
      salary,
      type: employmentType,
      location: locationType,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Job Search Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label className=" font-bold" htmlFor="username">
            LinkedIn Email
          </Label>
          <Input
            className="border-2 border-primary"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label className=" font-bold" htmlFor="password">
            LinkedIn Password
          </Label>
          <Input
            className="border-2 border-primary"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobSearch">Job Search</Label>
          <Input
            id="jobSearch"
            value={jobSearch}
            onChange={(e) => setJobSearch(e.target.value)}
            placeholder="e.g., Software Engineer"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Experience</Label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Salary Requirements</Label>
          <Select value={salary} onValueChange={setSalary}>
            <SelectTrigger>
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50k">$0 - $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k+">$100,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type</Label>
          <Select value={employmentType} onValueChange={setEmploymentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fullTime">Full-time</SelectItem>
              <SelectItem value="partTime">Part-time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="locationType">Location Type</Label>
          <Select value={locationType} onValueChange={setLocationType}>
            <SelectTrigger>
              <SelectValue placeholder="Select location type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="inPerson">In-person</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      <div className="my-4 mb-24 text-sm text-red-600">
        <strong>Important Security Note:</strong> We do not and will never save
        your data. Your LinkedIn email and password is only saved on your
        machine and is neccessary for our app to login to your account and apply
        to jobs on your behalf. By pressing &quot;Submit&quot;, you agree to
        these terms.
      </div>
    </div>
  );
}
