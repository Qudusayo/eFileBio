"use client";

import { User } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Notification, Setting } from "iconsax-react";
import { useSession } from "next-auth/react";

const AuthNav = () => {
  const { data: session } = useSession();

  console.log(session);

  if (!session) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white">
      <div className="leading-tight">
        <span className="text-sm">Welcome back</span>
        <h2 className="text-xl font-semibold">{session.user?.name}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          isIconOnly
          color="default"
          aria-label="Like"
          className="bg-[#F5F5F5]"
        >
          <Notification size="20" color="#525252" variant="Bold" />
        </Button>
        <Button
          isIconOnly
          color="default"
          aria-label="Like"
          className="bg-[#F5F5F5]"
        >
          <Setting size="20" color="#525252" variant="Bold" />
        </Button>
        <User
          name={
            <span className="text-sm font-semibold">{session.user?.name}</span>
          }
          description={session.user?.email}
          avatarProps={{
            src: session.user?.image ?? undefined,
          }}
        />
      </div>
    </div>
  );
};

export default AuthNav;
