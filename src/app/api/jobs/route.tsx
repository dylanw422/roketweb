import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";
import { jwtVerify } from "jose";

export async function GET() {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
  const jwtCookie = cookies().get("jwt");
  let jobs = [] as any[];

  if (jwtCookie) {
    const { payload } = await jwtVerify(jwtCookie.value, JWT_SECRET);
    const uuid = payload.uuid;

    const sql = neon(process.env.DATABASE_URL!);
    jobs = await sql(
      `SELECT * FROM jobs WHERE user_id = $1 ORDER BY id DESC LIMIT 200`,
      [uuid],
    );
  }

  return Response.json(jobs, { status: 200 });
}
