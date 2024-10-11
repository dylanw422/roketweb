// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // const { cookies } = req;
  //
  // const verifiedCookie = cookies.get("verified");
  //
  // if (!verifiedCookie && req.nextUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  //
  // if (verifiedCookie && req.nextUrl.pathname === "/login") {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
