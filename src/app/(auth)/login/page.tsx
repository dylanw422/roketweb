"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await axios.post("/api/login", {
      email: email,
      password: pw,
    });

    if (res.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email that you used at checkout to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              onChange={(e) => setPw(e.target.value)}
              id="password"
              type="password"
              required
            />
          </div>
          <Button
            onClick={() => handleSubmit()}
            disabled={email == "" || pw == ""}
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Forgot your password?{" "}
          <Link href="/#pricing" className="underline">
            Reset password
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
