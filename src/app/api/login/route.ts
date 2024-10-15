import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const sql = neon(process.env.DATABASE_URL!);

  if (!email || !password) {
    return Response.json("Invalid email or password.", { status: 400 });
  }

  // IF ACCOUNT EXISTS
  const users = await sql(`SELECT * FROM users WHERE email = $1`, [email]);
  if (users.length > 0) {
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    const payload = {
      email: user.email,
      paid: user.paid,
      uuid: user.uuid,
    };

    if (isPasswordValid) {
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

      cookies().set({
        name: "jwt",
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      return Response.json(
        { message: "Logged in.", user: user },
        { status: 200 },
      );
    } else if (!isPasswordValid) {
      return Response.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }
  }

  // IF ACCOUNT DOES NOT EXIST
  return Response.json("Invalid email or password.", { status: 400 });
}
