import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
  const jwtCookie = cookies().get("jwt");
  const prefCookie = cookies().get("prefToken");
  let prefs = {};

  if (jwtCookie) {
    const { payload } = await jwtVerify(jwtCookie.value, JWT_SECRET);
    const uuid = payload.uuid;

    if (prefCookie) {
      const { payload } = await jwtVerify(prefCookie.value, JWT_SECRET);
      prefs = { prefs: payload, uuid };
    }
  }

  return Response.json(prefs, { status: 200 });
}
