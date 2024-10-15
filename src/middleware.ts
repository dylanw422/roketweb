// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { neon } from "@neondatabase/serverless";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { cookies } = req;
  const sql = neon(process.env.DATABASE_URL!);
  const jwtCookie = cookies.get("jwt"); // Get the JWT from cookies
  const uuidCookie = cookies.get("uuid");
  const prefCookie = cookies.get("prefToken");

  if (uuidCookie && req.nextUrl.pathname === "/signup") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (jwtCookie && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (jwtCookie && req.nextUrl.pathname.startsWith("/dashboard")) {
    const { payload } = await jwtVerify(jwtCookie.value, JWT_SECRET);

    // Query the database for the user
    const userSearch = await sql(`SELECT * FROM users WHERE uuid = $1`, [
      payload.uuid,
    ]);

    const user = userSearch[0];
    if (user) {
      payload.paid = user.paid;

      const newJwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(JWT_SECRET);

      const response = NextResponse.next();
      response.cookies.set("jwt", newJwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      response.cookies.set("uuid", String(payload.uuid), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      if (prefCookie) {
        const { payload: prefPayload } = await jwtVerify(
          prefCookie.value,
          JWT_SECRET,
        );
        const prefToken = await new SignJWT(prefPayload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("5d")
          .sign(JWT_SECRET);

        response.cookies.set("prefToken", prefToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 5, // 5 days
        });
      }

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/"],
};
