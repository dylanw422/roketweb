import DashboardHome from "@/components/sections/dashboard-home";
import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function getJobsData() {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
  const jwtCookie = cookies().get("jwt");
  const prefCookie = cookies().get("prefToken");
  let jobs = [] as any[];
  let prefs = {};

  if (jwtCookie) {
    const { payload } = await jwtVerify(jwtCookie.value, JWT_SECRET);
    const uuid = payload.uuid;

    const sql = neon(process.env.DATABASE_URL!);
    jobs = await sql(`SELECT * FROM jobs WHERE user_id = $1`, [uuid]);

    if (prefCookie) {
      const { payload } = await jwtVerify(prefCookie.value, JWT_SECRET);
      prefs = payload;
    }
  }

  return { jobs, prefs };
}

export default async function Dashboard() {
  const jobs = await getJobsData();

  return (
    <main>
      <DashboardHome jobs={jobs.jobs} prefs={jobs.prefs} />
    </main>
  );
}
