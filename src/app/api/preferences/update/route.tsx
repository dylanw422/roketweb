import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password, search, experience, salary, type, location } =
    await req.json();

  const payload = {
    email,
    password,
    search,
    experience,
    salary,
    type,
    location,
  };

  const JWT_SECRET = process.env.JWT_SECRET!;

  const prefToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "5d" });
  cookies().set({
    name: "prefToken",
    value: prefToken,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 5, // 5 days
    path: "/",
  });

  return Response.json({ message: "Preferences saved." }, { status: 200 });
}
