"use client";
import { useState, useEffect } from "react";
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
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner8 } from "react-icons/im";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [queryEnabled, setQueryEnabled] = useState(false);
  const router = useRouter();

  const createCheckout = useQuery({
    queryKey: ["checkout"],
    queryFn: async () => {
      const res = await axios.post("/api/checkout", {
        priceId: "price_1Q5CKPErMDODl50He7NfE1Ca",
      });
      if (res.status === 200) {
        router.push(res.data.result.url);
      }
    },
    enabled: queryEnabled,
  });

  const handlePurchaseGenerate = () => {
    setQueryEnabled(true);
    createCheckout.refetch();
  };

  const handleSubmit = async () => {
    const res = await axios.post("/api/signup", {
      email: email,
      password: pw,
      firstName: firstName,
      lastName: lastName,
    });

    if (res.status === 200) {
      handlePurchaseGenerate();
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                onChange={(e) => setFirstName(e.target.value)}
                id="first-name"
                placeholder="Max"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                onChange={(e) => setLastName(e.target.value)}
                id="last-name"
                placeholder="Robinson"
                required
              />
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
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPw(e.target.value)}
              id="password"
              type="password"
            />
          </div>
          <Button
            onClick={() => handleSubmit()}
            disabled={email === "" || pw === ""}
            type="submit"
            className="w-full"
          >
            {createCheckout.isFetching ? (
              <ImSpinner8 className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
