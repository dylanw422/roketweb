import Dock from "@/components/ui/dock";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

async function getPaidData() {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

  const jwtCookie = cookies().get("jwt");

  if (jwtCookie) {
    const { payload } = await jwtVerify(jwtCookie.value, JWT_SECRET);
    if (!payload.paid) {
      return { signedIn: true, paid: false };
    } else {
      return { signedIn: true, paid: true };
    }
  } else {
    return { signedIn: false };
  }
}

export default async function Layout({ children }: DashboardLayoutProps) {
  const paidData = await getPaidData();

  return (
    <>
      {paidData.paid ? (
        <main className="h-screen">
          {children}
          <div className="fixed z-50 bottom-10 right-[50%] translate-x-[50%]">
            <Dock />
          </div>
        </main>
      ) : (
        <main className="flex flex-col items-center justify-center h-screen">
          <div>
            <h1>
              Please {paidData.signedIn ? "purchase a license" : "sign in"} to
              access this page.{" "}
              {paidData.signedIn ? (
                <Link className="underline" href="/#pricing">
                  Purchase
                </Link>
              ) : (
                <Link className="underline" href="/login">
                  Login
                </Link>
              )}
            </h1>
          </div>
        </main>
      )}
    </>
  );
}
