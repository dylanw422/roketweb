"use client";
import { Home, Zap, User, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Dock() {
  const router = useRouter();
  const currentPath = usePathname();

  const NavIcons = [
    {
      icon: Home,
      route: "/dashboard",
    },
    {
      icon: Zap,
      route: "/dashboard/ai",
    },
  ];

  const SettingsIcons = [
    {
      icon: User,
      route: "/dashboard/preferences",
    },
    {
      icon: Settings,
      route: "/dashboard/settings",
    },
  ];

  return (
    <main className="flex space-x-6 border p-4 rounded-xl backdrop-blur">
      {NavIcons.map((icon, index) => {
        return (
          <button
            onClick={() => router.push(icon.route)}
            className={`hover:cursor-pointer hover:scale-125 transition duration-300 p-1 ${currentPath === icon.route ? "text-red-400" : null}`}
            key={index}
          >
            <icon.icon />
          </button>
        );
      })}
      <div className="border"></div>
      {SettingsIcons.map((icon, index) => {
        return (
          <button
            onClick={() => router.push(icon.route)}
            className={`hover:cursor-pointer hover:scale-125 transition duration-300 p-1 ${currentPath === icon.route ? "text-red-400" : null}`}
            key={index}
          >
            <icon.icon />
          </button>
        );
      })}
    </main>
  );
}
