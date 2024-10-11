// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { cookies } = req;
  const jwtCookie = cookies.get("jwt"); // Get the JWT from cookies
  const uuidCookie = cookies.get("uuid");

  if (!jwtCookie && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url)); // If no JWT is found, redirect to login page
  }

  if (uuidCookie && req.nextUrl.pathname === "/signup") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (jwtCookie) {
    const { payload } = await jwtVerify(jwtCookie.value, JWT_SECRET);
    console.log(payload);

    if (!payload.paid && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (payload.paid && req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/sign-up"],
};
