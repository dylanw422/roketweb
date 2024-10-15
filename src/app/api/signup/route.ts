import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();
  const sql = neon(process.env.DATABASE_URL!);

  if (!email || !password) {
    return Response.json("Invalid email or password.", { status: 400 });
  }

  // IF ACCOUNT EXISTS
  const users = await sql(`SELECT * FROM users WHERE email = $1`, [email]);
  if (users.length > 0) {
    return Response.json({ message: "User already exists." }, { status: 400 });
  }

  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // INSERT USER INTO DATABASE
  const uuid = crypto.randomUUID();
  try {
    await sql(
      `INSERT INTO users (first_name, last_name, email, paid, password, uuid) VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstName, lastName, email, false, hashedPassword, uuid],
    );

    cookies().set({
      name: "uuid",
      value: uuid,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return Response.json("User created.", { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json("Could not create user.", { status: 500 });
  }
}
