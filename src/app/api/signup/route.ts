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
  try {
    const uuid = crypto.randomUUID();
    const uuidCookie = cookies().get("uuid"); // USER PAID BEFORE MAKING ACCOUNT

    if (uuidCookie) {
      // USER PAID BEFORE MAKING ACCOUNT
      const userSearch = await sql(`SELECT * FROM users WHERE uuid = $1`, [
        uuidCookie.value,
      ]);

      const user = userSearch[0];
      if (user) {
        await sql(
          `UPDATE users SET email = $1, password = $2, first_name = $3, last_name = $4 WHERE uuid = $5 RETURNING *`,
          [email, hashedPassword, firstName, lastName, uuidCookie.value],
        );
      }
    }

    // USER HAS NOT PAID
    const updatedUser = await sql(
      `INSERT INTO users (email, password, first_name, last_name, paid, uuid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [email, hashedPassword, firstName, lastName, false, uuid],
    );

    cookies().set({
      name: "uuid",
      value: uuid,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });

    return Response.json(
      { message: "User created.", user: updatedUser },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return Response.json("Could not create user.", { status: 500 });
  }
}
