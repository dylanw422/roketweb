// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { cookies } = req;
  const jwtCookie = cookies.get("jwt"); // Get the JWT from cookies

  if (!jwtCookie) {
    console.log("no cookie found");
    return NextResponse.redirect(new URL("/login", req.url)); // If no JWT is found, redirect to login page
  }

  if (jwtCookie) {
    const { payload } = await jwtVerify(jwtCookie.value, JWT_SECRET);
    console.log(payload);

    if (!payload.paid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to the dashboard and login pages
  runtime: "nodejs",
};
