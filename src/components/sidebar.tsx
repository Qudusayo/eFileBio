"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Category, Setting, LogoutCurve, User } from "iconsax-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-black h-screen border-r border-gray-300 flex flex-col justify-between p-6">
      <div>
        <div className="w-full m-auto pb-5">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-lg block mx-auto"
          />
        </div>
        <ul>
          <li>
            <Navlink
              title="Dashboard"
              href="/dashboard"
              icon={Category}
              active={pathname.startsWith("/dashboard")}
            />
          </li>
          <li>
            <Navlink
              title="Settings"
              href="/settings"
              icon={Setting}
              active={pathname === "/settings"}
            />
          </li>
          <li>
            <Navlink
              title="Profile"
              href="/profile"
              icon={User}
              active={pathname === "/profile"}
            />
          </li>
        </ul>
      </div>
      <Button
        variant="light"
        className="justify-start text-red-600"
        onClick={() => signOut({ callbackUrl: "/" })}
        size="lg"
      >
        <LogoutCurve size={24} className="text-red-600" variant="Outline" />
        <span>Logout</span>
      </Button>
    </div>
  );
};

function Navlink({
  href,
  title,
  active,
  icon: IconComponent,
}: {
  href: string;
  title: string;
  active: boolean;
  icon: typeof LogoutCurve;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-2 p-3 w-full m-auto mt-4 rounded-xl transition-all duration-200 ease-in-out",
        active ? "bg-[#464647]" : "hover:bg-[#46464740] border-transparent",
      ].join(" ")}
    >
      <IconComponent
        size={24}
        color="#FFFFFF"
        variant={active ? "Bulk" : "Outline"}
      />
      <span className="text-white">{title}</span>
    </Link>
  );
}

export default Sidebar;
