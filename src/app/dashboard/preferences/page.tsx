import JobSearchForm from "@/components/sections/dashboard-preferences";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function getPrefsData() {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
  const prefCookie = cookies().get("prefToken");
  let prefs = {};

  if (prefCookie) {
    const { payload } = await jwtVerify(prefCookie.value, JWT_SECRET);
    prefs = payload;
  }

  return prefs;
}

export default async function Preferences() {
  const prefs = await getPrefsData();

  return (
    <main>
      <JobSearchForm prefs={prefs} />
    </main>
  );
}
