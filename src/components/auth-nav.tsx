"use client";

import { useAuthContext } from "@/app/context/auth-context";
import { User } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Notification, Setting } from "iconsax-react";

const AuthNav = () => {
  const authData = useAuthContext();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white">
      <div className="leading-tight">
        <span className="text-sm">Welcome back</span>
        <h2 className="text-xl font-semibold">{authData!.name}</h2>
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
          name={<span className="text-sm font-semibold">{authData!.name}</span>}
          description={authData!.email}
          avatarProps={{
            src: authData!.profileImage,
          }}
        />
      </div>
    </div>
  );
};

export default AuthNav;
