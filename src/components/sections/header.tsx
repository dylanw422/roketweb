"use client";

import Drawer from "@/components/drawer";
import { Icons } from "@/components/icons";
import Menu from "@/components/menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header({ isMac }: any) {
  const [addBorder, setAddBorder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        "relative sticky top-0 z-50 py-2 bg-background/60 backdrop-blur"
      }
    >
      <div className="flex justify-between items-center container">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <img src={"./Rocket Gradient.svg"} className="w-auto h-[40px]" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center ">
            <nav className="mr-5">
              <Menu />
            </nav>

            <div className="gap-2 flex">
              <button
                onClick={() => router.push("/login")}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full sm:w-auto text-background flex gap-2 px-8",
                )}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <Drawer />
        </div>
      </div>
      <hr
        className={cn(
          "absolute w-full bottom-0 transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-100" : "opacity-0",
        )}
      />
    </header>
  );
}
