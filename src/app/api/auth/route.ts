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
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

      cookies().set({
        name: "jwt",
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1, // 1 days
        path: "/",
      });

      return Response.json(
        { message: "Logged in.", user: user, token: token },
        { status: 200 },
      );
    } else if (!isPasswordValid) {
      return Response.json("Invalid email or password.", { status: 400 });
    } else if (!user.paid) {
      return Response.json("You have not purchased a license.", {
        status: 400,
      });
    }
  }

  // IF ACCOUNT DOES NOT EXIST
  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const uuid = cookies().get("uuid");

  // INSERT USER INTO DATABASE
  try {
    let updatedUser;
    if (uuid) {
      const userSearch = await sql(`SELECT * FROM users WHERE uuid = $1`, [
        uuid.value,
      ]);

      const user = userSearch[0];
      if (user) {
        updatedUser = await sql(
          `UPDATE users SET email = $1, password = $2 WHERE uuid = $3 RETURNING *`,
          [email, hashedPassword, uuid.value],
        );
      }
    } else {
      updatedUser = await sql(
        `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
        [email, hashedPassword],
      );

      cookies().set({
        name: "uuid",
        value: crypto.randomUUID(),
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
