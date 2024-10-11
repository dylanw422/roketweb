import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();
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
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      cookies().set({
        name: "jwt",
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 days
        path: "/",
      });

      if (user.paid) {
        return Response.json(
          { message: "Logged in.", user: user },
          { status: 200 },
        );
      }

      if (!user.paid) {
        return Response.json(
          { message: "You have not purchased a license." },
          {
            status: 402,
          },
        );
      }
    } else if (!isPasswordValid) {
      return Response.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }
  }

  // IF ACCOUNT DOES NOT EXIST
  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const uuidCookie = cookies().get("uuid");

  // INSERT USER INTO DATABASE
  try {
    let updatedUser;
    const uuid = crypto.randomUUID();
    if (uuidCookie) {
      // USER PAID BEFORE MAKING ACCOUNT
      const userSearch = await sql(`SELECT * FROM users WHERE uuid = $1`, [
        uuidCookie.value,
      ]);

      const user = userSearch[0];
      if (user) {
        updatedUser = await sql(
          `UPDATE users SET email = $1, password = $2, first_name = $3, last_name = $4 WHERE uuid = $5 RETURNING *`,
          [email, hashedPassword, firstName, lastName, uuidCookie.value],
        );
      }
    } else {
      // USER HAS NOT PAID
      updatedUser = await sql(
        `INSERT INTO users (email, password, first_name, last_name, paid, uuid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [email, hashedPassword, firstName, lastName, false, uuid],
      );

      cookies().set({
        name: "uuid",
        value: uuid,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365, // 365 days
        path: "/",
      });
    }

    return Response.json(
      { message: "User created.", user: updatedUser },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return Response.json("Could not create user.", { status: 500 });
  }
}
